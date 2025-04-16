import "./User.scss"
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";

export default function User(){
    const auth = getAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        signOut(auth).then(() => {
            navigate("/login")
          }).catch((error) => {
            // An error happened.
          });
    }
    return(
        <div className="user-wr">
            <button onClick={handleLogOut}>Log out</button>
        </div>
    )
}