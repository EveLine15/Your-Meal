import "./User.scss"
import { useNavigate } from "react-router";

export default function User(){
    const navigate = useNavigate();

    return(
        <div className="user-wr">
            <button className="profile-btn" onClick={() => navigate("/account")}>Go to profile</button>
        </div>
    )
}