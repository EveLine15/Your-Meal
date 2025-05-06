import "./userAccount.scss"
import { useUpdateUserMutation } from "../../services/firebaseApi"
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";
import { getAuth, signOut } from "firebase/auth";

import defaultAvatar from "../../assets/icons/defaulIcon.png"

export default function UserAccount() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [updateUser] = useUpdateUserMutation();
    const [newName, setNewName] = useState("");
    const auth = getAuth();
    const [profileChange, setProfileChange] = useState(false);

    const changeUser = async (newName) => {
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
            <div className={`show-block ${!profileChange}`}>
                <img className="avatar" src={user?.avatar ? "" : defaultAvatar} alt="avatar"/>
                <h1>Login: {user?.login}</h1>
                <h2>Email: {user?.email}</h2>
                <h2>Address: {user?.address}</h2>
                <h2>Card number: {user?.cardNumber}</h2>
                <button onClick={() => setProfileChange(true)}>Edit profile</button>
                <button onClick={handleLogOut}>Log out</button>
            </div>


            <div className={`edit-block ${profileChange}`}>
                <form onSubmit={(e) => {
                        e.preventDefault(); 
                        changeUser(newName);
                        setProfileChange(false)
                    }}>
                    <label>Name:</label>
                    <input type="text" placeholder={"login"} value={newName} onChange={(e) => setNewName(e.target.value)}/>

                    <div className="change-buttons">
                        <button>Save</button>
                        <button>Cancel</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
  )
}
