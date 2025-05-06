import "./userAccount.scss"
import { useUpdateUserMutation } from "../../services/firebaseApi"
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";
import { getAuth, signOut } from "firebase/auth";

import defaultAvatar from "../../assets/icons/defaultIcon.png"

export default function UserAccount() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [updateUser] = useUpdateUserMutation();
    const [newName, setNewName] = useState("");
    const auth = getAuth();
    const [profileChange, setProfileChange] = useState(false);

    const changeUser = async (newName) => {
      if (newName === "") return;
      
      try {
          const { data } = await updateUser({ uid: user.uid, updates: { login: newName } });

          dispatch(setUser({
            uid: user.uid,
            email: user.email,
            login: newName,
            avatar: user.avatar,
            address: user.address,
            cardNumber: user.cardNumber,
            createdAt: user.createdAt
          }));
        } catch (err) {
          console.error("Error updating user:", err);
        }
    }

    const handleLogOut = () => {
        signOut(auth).then(() => {
            navigate("/login")
          }).catch((error) => {
          });
    }

  return (
    <div className="wr-user">
        <div className="user-info">
            <img className="avatar" src={user?.avatar ? "" : defaultAvatar} alt="avatar"/>
            <div className={`show-block ${!profileChange}`}>
                <h1>Login: {user?.login}</h1>
                <h3>Email: {user?.email}</h3>
                <h3>Address: {user?.address}</h3>
                <h3>Card number: {user?.cardNumber}</h3>
                <button onClick={() => setProfileChange(true)}>Edit profile</button>
                <button className="logOut-btn" onClick={handleLogOut}>Log out</button>
            </div>


            <div className={`edit-block ${profileChange}`}>
                <form onSubmit={(e) => {
                        e.preventDefault(); 
                        changeUser(newName);
                        setProfileChange(false)
                    }}>
                    <h2>Login:</h2>
                    <input type="text" placeholder={"New login"} value={newName} onChange={(e) => setNewName(e.target.value)}/>

                    <div className="change-buttons">
                        <button>Save</button>
                        <button className="cancel-btn" onClick={() => setProfileChange(false)}>Cancel</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
  )
}
