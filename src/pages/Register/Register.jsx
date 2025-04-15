import "./Register.scss"
import { Link, useNavigate } from "react-router"

import donut from "../../assets/images/donut.png"

export default function Register(){
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
                            <h1>Регистрация</h1>
                            <input type="text" placeholder="User name"/>
                            <input type="email" placeholder="Еmail"/>
                            <input type="password" placeholder="Password"/>
                            <input type="password" placeholder="Confirm password"/>
                            <button>Зарегистрироваться</button>
                            <div className="link-holder">
                            <Link to={"/login"}>Войти</Link>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}