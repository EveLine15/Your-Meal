import "./Login.scss"
import { Link, useNavigate } from "react-router"
import { useLazyGetUserQuery } from "../../services/firebaseApi";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import donut from "../../assets/images/donut.png"

export default function Login(){
    const navigate = useNavigate();
    const auth = getAuth();
    const [triggerGetUser] = useLazyGetUserQuery();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState({
        errorEmail: null,
        errorPassword: null,
        errorUnauth: null
    });

    const [submitted, setSubmitted] = useState(false);

    const handleAuth = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const newErrors = {};
        if (!loginData.email) newErrors.errorEmail = true;
        if (!loginData.password) newErrors.errorPassword = true;
        
        setError(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const userCredential = await signInWithEmailAndPassword(
                  auth,
                  loginData.email,
                  loginData.password
                );
                const user = userCredential.user;
 
                const result = await triggerGetUser(user.uid).unwrap();
                if (result) {
                  navigate("/home");
                } else {
                  setError("Пользователь не найден в базе данных");
                }
                
              } catch (err) {
                console.error("Ошибка входа:", err);
                setError("Неверный email или пароль");
              }
        }
    
      };

    return(
        <div className="wr-reg">
            <div className="content-body">
                <div className="login-content">
                    <div className="left-part">
                        <img src={donut} alt="donut"/>
                    </div>

                    <div className="right-part">
                        <form onSubmit={handleAuth}>
                            <h1>Авторизация</h1>
                            <input type="email" className={`${error.errorEmail || error.errorUnauth ? "error" : ""}`} placeholder="Еmail" value={loginData.email} onChange={
                                (e) => setLoginData({...loginData, email: e.target.value})
                            }
                            onClick={() => setError({...error, errorEmail: null, errorUnauth: null})}/>
                            <input type="password" className={`${error.errorPassword || error.errorUnauth ? "error" : ""}`} placeholder="Password" value={loginData.password} onChange={
                                (e) => setLoginData({...loginData, password: e.target.value})
                            }
                            onClick={() => setError({...error, errorPassword: null, errorUnauth: null})}/>
                            {submitted && (error.errorEmail || error.errorPassword) && (<p>Заполните все поля</p>)}
                            {submitted && (error.errorUnauth) && (<p>Неправильно набран логин или пароль</p>)}
                            <button className="login-button" type="submit">Войти</button>

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