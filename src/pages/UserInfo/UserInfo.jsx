import "./UserInfo.scss"
import defaultAvatar from "../../assets/icons/defaultIcon.svg"
import imageBorder from "../../assets/icons/imageBorder.svg"
import { PatternFormat } from 'react-number-format';
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useLazyGetUserQuery } from "../../services/firebaseApi";
import { useUpdateUserMutation } from "../../services/firebaseApi";

export default function UserInfo() {
        const [updateUser] = useUpdateUserMutation();
        const [userData, setUserData] = useState(null);
        const [newName, setNewName] = useState("");
        const [profileChange, setProfileChange] = useState(false);
        const [newAddress, setNewAddress] = useState({
            city: "",
            street: "",
            house: "",
            apartment: ""
        });
        const [addressChange, setAddressChange] = useState(false);

        const [cardAdd, setCardAdd] = useState(false);
        const [cardNumber, setCardNumber] = useState("");

        const user = getAuth().currentUser;

        const [triggerGetUser] = useLazyGetUserQuery();

        const [loading, setLoading] = useState(false);

        const fetchUserData = async () => {
                if (!user) return;
                try {
                  const { data } = await triggerGetUser(user?.uid);
                  if (data) setUserData(data);
                } catch (err) {
                  console.error("Failed to load user data", err);
                }
              };
            
        useEffect(() => {
            fetchUserData();
        }, []);

        const handleFileChange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "unsigned_avatar");
    
            try {
                const res = await fetch("https://api.cloudinary.com/v1_1/drgjiis7d/image/upload", {
                method: "POST",
                body: formData,
                });
        
                const data = await res.json();
                setUserData(prev => ({ ...prev, avatar: data.secure_url }));

                await updateUser({
                uid: auth.currentUser.uid,
                updates: { avatar: data.secure_url },
                });

                } catch (err) {
                    console.error("Upload failed", err);
                } finally {
                    setLoading(false);
                }
        };

        const changeUser = async () => {
            const updates = {};
            if (newName.login.trim() !== "") updates.login = newName.login;
            if (newName.name?.trim() !== "") updates.name = newName.name;
            if (newName.surname?.trim() !== "") updates.surname = newName.surname;
            if (newName.age?.trim() !== "") updates.age = newName.age;

            try {
                await updateUser({
                uid: user.uid,
                updates
                });
                setProfileChange(false);
                setUserData(prev => ({ ...prev, ...updates }));

            } catch (err) {
                console.error("Error updating user:", err);
            }
        };

        const changeAddress = async () => {
            const updates = {};
            const trimmed = {
                city: newAddress.city.trim(),
                street: newAddress.street.trim(),
                house: newAddress.house.trim(),
                apartment: newAddress.apartment.trim()
            };
        
            for (const key in trimmed) {
                if (trimmed[key] !== "") {
                    if (!updates.address) updates.address = {};
                    updates.address[key] = trimmed[key];
                }
            }
        
            if (!updates.address) return;
        
            try {
                await updateUser({
                    uid: user.uid,
                    updates,
                });
                setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, ...updates.address }
                }));
                setAddressChange(false);
            } catch (err) {
                console.error("Error updating address:", err);
            }
        }; 
        
        const addNewCard = async () => {
            try {
                const newCards = [...(userData.cards || []), cardNumber];

                await updateUser({ uid: user.uid, updates: {cards: newCards, activeCard: cardNumber } }).unwrap();
                 setUserData((prev) => ({
                    ...prev,
                    cards: newCards,
                    }));
                setCardNumber("");
            } catch (err) {
              console.error("Failed to add card:", err);
            }
        };

        const delCard = async (cardIndex) => {
            if (!userData || !Array.isArray(userData.cards)) return;

            const updatedCards = userData.cards.filter((card, i) => i !== cardIndex);

            try {
                await updateUser({ 
                    uid: user.uid, 
                    updates: { cards: updatedCards } 
                });
                setUserData(prev => ({
                    ...prev,
                    cards: updatedCards 
                }))
                console.log("Card deleted successfully");
                } catch (err) {
                    console.error("Error deleting card:", err);
                }
        };

        const changeActiveCard = async (card) => {
            try {
                await updateUser({
                uid: user.uid,
                updates: { activeCard: card }
                });

                setUserData(prev => ({
                    ...prev,
                    activeCard: card 
                }))
                console.log("Active card updated");
            } catch (err) {
                console.error("Failed to update active card:", err);
            }
        };

        return (
        <div className="user-info">
            <section className="basic-info-section">
                <h1>Ваш профиль</h1>
                <div className="account-info">                    
                    <div className={`show-block ${!profileChange}`}>
                        <h3>Логин: {userData?.login}</h3>
                        <h3>Email: {user?.email}</h3>
                        <h3>Имя: {userData?.name ? userData?.name : "не указано"}</h3>
                        <h3>Фамилия: {userData?.surname ? userData.surname : "не указано"}</h3>
                        <h3>Возраст: {userData?.age ? userData.age : "не указано"}</h3>
                        <button onClick={() => {
                            setProfileChange(true);
                            setNewName(userData);
                            }}>Изменить профиль</button>
                    </div>

                    <div className={`edit-block ${profileChange}`}>
                        <form onSubmit={(e) => {
                                e.preventDefault();
                                changeUser();
                                setProfileChange(false)
                            }}>
                            <h2>Новый логин:</h2>
                            <input type="text" placeholder={"Логин"} value={newName.login} onChange={(e) => setNewName({...newName, login: e.target.value})}/>
                            <h2>Имя:</h2>
                            <input type="text" placeholder={"Имя"} value={newName.name} onChange={(e) => setNewName({...newName, name: e.target.value})}/>
                            <h2>Фамилия:</h2>
                            <input type="text" placeholder={"Фамилия"} value={newName.surname} onChange={(e) => setNewName({...newName, surname: e.target.value})}/>
                            <h2>Возраст:</h2>
                            <input type="number" placeholder={"Возраст"} value={newName.age} onChange={(e) => setNewName({...newName, age: e.target.value})}/>

                            <div className="change-buttons">
                                <button type="submit">Сохранить</button>
                                <button type="button" className="cancel-btn" onClick={() => setProfileChange(false)}>Отмена</button>
                            </div>
                        </form>
                    </div>

                    <div className="avatar-block">
                        <div className="avatar">
                            <img src={userData?.avatar ? userData?.avatar : defaultAvatar} alt="avatar"/>
                        </div>
                        <label htmlFor="avatarUpload" className="upload-label"><img src={imageBorder} alt="edit"/></label>
                        <input id="avatarUpload" type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                </div>
            </section>

            <section className="address-section">
                <h1>Адрес</h1>
                <div className="wr-block">
                    <div className={`show-block ${!addressChange}`}>
                        <div className="address">
                            <h3>Город: {userData?.address?.city ? userData.address.city : "не указано"}</h3>
                            <h3>Улица: {userData?.address?.street ? userData.address.street : "не указано"}</h3>
                            <h3>Дом: {userData?.address?.house ? userData.address.house : "не указано"}</h3>
                            <h3>Квартира: {userData?.address?.apartment ? userData.address.apartment : "не указано"}</h3>
                        </div>
                        <button onClick={() => {
                            setAddressChange(true);
                            setNewAddress(userData.address)
                            }}>Изменить адрес</button>
                    </div>
                    <div className={`edit-block ${addressChange}`}>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            changeAddress();
                        }}>
                            <h2>Город:</h2>
                            <input type="text" placeholder={"Город"} value={newAddress.city} onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}/>

                            <h2>Улица:</h2>
                            <input type="text" placeholder={"Улица"} value={newAddress.street} onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}/>

                            <h2>Дом:</h2>
                            <input type="text" placeholder={"Дом"} value={newAddress.house} onChange={(e) => setNewAddress({...newAddress, house: e.target.value})}/>

                            <h2>Квартира:</h2>
                            <input type="text" placeholder={"Квартира"} value={newAddress.apartment} onChange={(e) => setNewAddress({...newAddress, apartment: e.target.value})}/>

                            <div className="change-buttons">
                                <button type="submit">Сохранить</button>
                                <button type="button" className="cancel-btn" onClick={() => setAddressChange(false)}>Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <section>
                <h1>Способы оплаты</h1>
                <div className="wr-block">
                    <div className={`show-block`}>
                        <div className="radio-group-card">
                            {Array.isArray(userData?.cards) && userData.cards.map((card, index) => (
                                <div className="card-block" key={index}>
                                <label htmlFor={`card-${index}`}>
                                    <input 
                                        type="radio" 
                                        id={`card-${index}`} 
                                        name="card" 
                                        value={card}
                                        checked={userData.activeCard === card}
                                        onChange={() => changeActiveCard(card)}/>
                                    <span className="custom-radio"></span>
                                    Card {index + 1}: {card}
                                </label>
                                <button onClick={() => delCard(index)}>Удалить</button>
                                </div>
                            ))}
                        </div>
                        <button className={`${!cardAdd}`} onClick={() => {
                            setCardAdd(true)
                        }}>Добавить карту</button>
                    </div>

                    <div className={`edit-block always-visible ${cardAdd}`}>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            addNewCard();
                            setCardAdd(false)
                        }}>
                            <h2>Ваши карты: </h2>
                            <PatternFormat format="#### #### #### ####" allowEmptyFormatting mask="#" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}/>
                        </form>
                    </div>
                </div>
            </section>  
        </div>
  )
}
