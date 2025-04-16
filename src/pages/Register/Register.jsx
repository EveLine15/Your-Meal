import "./Register.scss"
import { Link, useNavigate } from "react-router"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import donut from "../../assets/images/donut.png"

export default function Register(){
    const auth = getAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState({
        errorName: null,
        errorEmail: null,
        errorPassword: null,
        errorConfirmPassword: null
    });

    const [submitted, setSubmitted] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setSubmitted(true);

        const newErrors = {};
        if (!formData.name) newErrors.errorName = true;
        if (!formData.email) newErrors.errorEmail = true;
        if (!formData.password) newErrors.errorPassword = true;
        if (formData.password !== formData.confirmPassword) newErrors.errorConfirmPassword = true;
      
        setError(newErrors);
      
        if (Object.keys(newErrors).length === 0) {
            createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    console.log(userCredential)
                    navigate("/home");
                })
                .catch((error) => {
                    console.log(error)
                });
        }

    }

    return(
        <div className="wr-reg">
            <div className="content-body">
                <div className="login-content">
                    <div className="left-part">
                        <img src={donut} alt="donut"/>
                    </div>

                    <div className="right-part">
                        <form onSubmit={handleRegister}>
                            <h1>Регистрация</h1>
                            <input type="text" className={`${error.errorName ? "error" : ""}`} placeholder="User name" value={formData.name} onChange={(e) => {
                                setSubmitted(false);
                                setFormData({...formData, name: e.target.value})
                            }} 
                            onClick={() => setError({...error, errorName: null})}/>
                            <input type="email" className={`${error.errorEmail ? "error" : ""}`} placeholder="Еmail" value={formData.email} onChange={(e) => {
                                setSubmitted(false);
                                setFormData({...formData, email: e.target.value})
                            }}
                            onClick={() => setError({...error, errorEmail: null})}/>
                            <input type="password" className={`${error.errorPassword ? "error" : ""}`} placeholder="Password" value={formData.password} onChange={(e) => {
                                setSubmitted(false);
                                setFormData({...formData, password: e.target.value})
                            }}
                            onClick={() => setError({...error, errorPassword: null})}/>
                            <input type="password" className={`${error.errorConfirmPassword ? "error" : ""}`} placeholder="Confirm password" value={formData.confirmPassword} onChange={(e) => {
                                setSubmitted(false);
                                setFormData({...formData, confirmPassword: e.target.value})
                            }}
                            onClick={() => setError({...error, errorConfirmPassword: null})}/>
                            {submitted && (error.errorName || error.errorEmail || error.errorPassword) && (
                            <p>Заполните все поля</p>
                            )}

                            {submitted && formData.password !== formData.confirmPassword && (
                            <p>Пароли не совпадают</p>
                            )}

                            <button type="submit">Зарегистрироваться</button>
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