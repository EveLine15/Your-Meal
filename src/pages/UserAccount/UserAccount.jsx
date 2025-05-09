  import "./userAccount.scss"
  import { useUpdateUserMutation } from "../../services/firebaseApi"
  import { useState, useEffect } from "react";
  import { getAuth, signOut } from "firebase/auth";
  import { useLazyGetUserQuery } from "../../services/firebaseApi";

  import defaultAvatar from "../../assets/icons/defaultIcon.svg"
  import { useNavigate, NavLink, Outlet } from "react-router";

  export default function UserAccount() {
      const [updateUser] = useUpdateUserMutation();
      const [newName, setNewName] = useState("");
      const [newAddress, setNewAddress] = useState("");
      const [newCardNumber, setNewCardNumber] = useState("");
      const [profileChange, setProfileChange] = useState(false);
      const [userData, setUserData] = useState(null);

      const auth = getAuth();
      const user = auth.currentUser;
      const navigate = useNavigate();
      const [triggerGetUser] = useLazyGetUserQuery();

      const fetchUserData = async () => {
        if (!user) return;
        try {
          const { data } = await triggerGetUser(auth.currentUser?.uid);
          if (data) setUserData(data);
        } catch (err) {
          console.error("Failed to load user data", err);
        }
      };
    
      useEffect(() => {
        fetchUserData();
      }, []);


      const changeUser = async () => {
        const updates = {};
        if (newName.trim() !== "") updates.login = newName;
        if (newAddress.trim() !== "") updates.address = newAddress;
        if (newCardNumber.trim() !== "") updates.cardNumber = newCardNumber;
    
        try {
          await updateUser({
            uid: auth.currentUser.uid,
            updates
          });
          setProfileChange(false);
          setUserData(prev => ({ ...prev, ...updates }));

        } catch (err) {
          console.error("Error updating user:", err);
        }
      };

      const handleLogOut = () => {
          signOut(auth).then(() => {
              navigate("/login")
            }).catch((error) => {
              console.error(error)
            });
      }

    return (
      <div className="wr-user">
          <div className="user-info">
              <img className="avatar" src={user?.avatar ? "" : defaultAvatar} alt="avatar"/>
              <div className={`show-block ${!profileChange}`}>
                  <h1>Login: {userData?.login}</h1>
                  <h3>Email: {user?.email}</h3>
                  <h3>Address: {userData?.address}</h3>
                  <h3>Card number: {userData?.cardNumber}</h3>
                  <button onClick={() => setProfileChange(true)}>Edit profile</button>
                  <button className="logOut-btn" onClick={handleLogOut}>Log out</button>
              </div>


              <div className={`edit-block ${profileChange}`}>
                  <form onSubmit={(e) => {
                          e.preventDefault();
                          changeUser();
                          setProfileChange(false)
                      }}>
                      <h2>Новый логин:</h2>
                      <input type="text" placeholder={"New login"} value={newName} onChange={(e) => setNewName(e.target.value)}/>
                      <h2>Адрес доставки:</h2>
                      <input type="text" placeholder={"New login"} value={newAddress} onChange={(e) => setNewAddress(e.target.value)}/>
                      <h2>Номер карты:</h2>
                      <input type="text" placeholder={"New login"} value={newCardNumber} onChange={(e) => setNewCardNumber(e.target.value)}/>

                      <div className="change-buttons">
                          <button type="submit">Save</button>
                          <button type="button" className="cancel-btn" onClick={() => setProfileChange(false)}>Cancel</button>
                      </div>
                  </form>

              </div>
          </div>

          <div className="orders-block">
            <nav>
              <NavLink>Корзина</NavLink>
              <NavLink to="orderHistory">История заказов</NavLink>
            </nav>
            <Outlet/>            
          </div>
      </div>
    )
  }
