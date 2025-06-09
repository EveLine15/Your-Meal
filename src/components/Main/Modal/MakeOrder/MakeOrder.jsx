import "./MakeOrder.scss"
import donut from "../../../../assets/images/donut.png"
import { useState, useEffect } from "react"
import { useAddOrderMutation, useLazyGetUserQuery, useUpdateCartMutation } from "../../../../services/firebaseApi";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../../../store/slices/cartSlice";

export default function MakeOrder({closeModal}){
    const dispatch = useDispatch();
    const [triggerCartMutation] = useUpdateCartMutation();
    const [delivery, setDelivery] = useState(false);
    const [selectedOption, setSelectedOption] = useState('option1');
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        city: "",
        street: "",
        house: "",
        apartment: ""
    });

    const auth = getAuth();
    const user = auth.currentUser;

    const { items: cart, price } = useSelector((state) => state.cart);

    const [addOrder] = useAddOrderMutation();
    const [triggerGetUser] = useLazyGetUserQuery();

    const fetchUserData = async () => {
        if (!user) return;
            try {
                const { data } = await triggerGetUser(auth.currentUser?.uid);
                if (data) setFormData({
                    name: data.name,
                    phone: "",
                    city: data.address.city,
                    street: data.address.street,
                    house: data.address.house,
                    apartment: data.address.apartment
                });
            } catch (err) {
                console.error("Failed to load user data", err);
            }
        };
        
    useEffect(() => {
        fetchUserData();
    }, []);

    const sendOrder = async (e) => {
        e.preventDefault();

        const { name, phone, city, street, house, apartment } = formData;

        if (!name || !phone || (delivery && (!city || !street || !house || !apartment))) {
            console.log("Fieldes aren't filled")
            return;
        }

        const order = {
            name: name,
            phone: phone,
            delivery: delivery,
            ...(delivery && {
                city: city,
                street: street,
                house: house,
                apartment: apartment
            }),
            createdAt: new Date().toLocaleDateString('ru-RU'),
            cart: cart,
            price: price
        };

        console.log(order)

        try {
            await addOrder({
                uid: auth.currentUser.uid,
                orders: {...order}
            }).unwrap();
            setSelectedOption("option1");
            setDelivery(false);
            dispatch(setCart([]));
            await triggerCartMutation({ uid: user.uid, cart: [] }).unwrap();
            closeModal();
        } catch (error) {
            console.error("Ошибка при отправке заказа:", error);
        }
    };

    return(
        <div className="wr-modal">
            <div className="order-content">
                <div className="left-part">
                    <img src={donut} alt="donut"/>
                </div>

                <div className="right-part">
                    <form onSubmit={(e) => sendOrder(e)}>
                        <h1>Доставка</h1>
                        <input type="text" placeholder="Ваше имя" id="name" value={formData.name} onChange={(e) => {setFormData((prev) => ({ ...prev, name: e.target.value }))}}/>
                        <input type="phone" placeholder="Телефон" id="phone" value={formData.phone} onChange={(e) => {setFormData((prev) => ({ ...prev, phone: e.target.value }))}}/>

                        <div className="radio-block">
                            <label className="radio-option">
                                <input 
                                type="radio" 
                                name="choice" 
                                value="option1" 
                                checked={selectedOption === 'option1'} 
                                onChange={(e) => {
                                    setDelivery(false);
                                    setSelectedOption(e.target.value)
                                    }}/>
                                <span className="custom-radio"></span>
                                Самовывоз
                            </label>

                            <label className="radio-option">
                                <input 
                                type="radio" 
                                name="choice" 
                                value="option2" 
                                checked={selectedOption === 'option2'} 
                                onChange={(e) => {
                                    setDelivery(true);
                                    setSelectedOption(e.target.value)
                                    }}/>
                                <span className="custom-radio"></span>
                                Доставка
                            </label>
                        </div>

                        {delivery && (
                            <div className="delivery">
                                <div className="delivery-line">
                                <input 
                                    type="text" 
                                    placeholder="Улица" 
                                    id="address" 
                                    value={formData.street} 
                                    onChange={
                                    (e) => {setFormData((prev) => ({ ...prev, street: e.target.value }))} 
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Город"
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, city: e.target.value }))
                                    }
                                />

                                </div>
                                <div className="delivery-line">
                                <input
                                type="text"
                                placeholder="Дом"
                                id="house"
                                value={formData.house}
                                onChange={(e) =>
                                setFormData((prev) => ({ ...prev, house: e.target.value }))
                                }
                                />
                                <input
                                    type="text"
                                    placeholder="Квартира"
                                    id="apartment"
                                    value={formData.apartment}
                                    onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, apartment: e.target.value }))
                                    }
                                />
                                </div>
                            </div>
                            )}
                        <button>Оформить</button>
                    </form>

                </div>
            </div>
        
        </div>

    )

}