import "./ForgotPassword.scss"
import donut from "../../assets/images/donut.png"
import { useNavigate } from "react-router";

export default function ForgotPassword(){
    const navigate = useNavigate();
    return(
        <div className="wr-reg">
            <div className="content-body">
                <div className="login-content">
                    <div className="left-part">
                        <img src={donut} alt="donut"/>
                    </div>

                    <div className="right-part">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            navigate("/login");
                        }}>
                            <h1>Восстановить пароль</h1>
                            <input type="email" placeholder="Еmail"/>
                            <p className="hint-forgot-text">Мы отправим сообщение для подтверждения</p>
                            <button>Восстановить пароль</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}