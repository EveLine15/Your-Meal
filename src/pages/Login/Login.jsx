import "./Login.scss"
import { Link, useNavigate } from "react-router"

import donut from "../../assets/images/donut.png"

export default function Login(){
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
                            navigate("/home");
                            }}>
                            <h1>Авторизация</h1>
                            <input type="email" placeholder="Еmail"/>
                            <input type="password" placeholder="Password"/>
                            <button className="login-button">Войти</button>

                            <div className="link-holder">
                                <Link to={"/register"}>Зарегистрироваться</Link>
                                <Link to={"/forgotPass"}>Забыли пароль?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}