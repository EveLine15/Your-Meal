import "./Register.scss"
import { Link, useNavigate } from "react-router"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useAddUserMutation } from "../../services/firebaseApi";
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';

import donut from "../../assets/images/donut.png"

export default function Register(){
    const auth = getAuth();
    const navigate = useNavigate();
    const [addUser] = useAddUserMutation();
    const dispatch = useDispatch();

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

    const handleRegister = async (e) => {
        e.preventDefault();
        setSubmitted(true);
    
        const newErrors = {};
        if (!formData.name) newErrors.errorName = true;
        if (!formData.email) newErrors.errorEmail = true;
        if (!formData.password) newErrors.errorPassword = true;
        if (formData.password !== formData.confirmPassword) newErrors.errorConfirmPassword = true;
    
        setError(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const { user } = userCredential;
    
            dispatch(setUser({
              uid: user.uid,
              email: user.email,
            }));
    
            const newUserData = {
                email: user.email,
                login: formData.name,
                avatar: "",
                address: "",
                cardNumber: "",
                createdAt: new Date().toISOString()
            };

            const result = await addUser({
                uid: user.uid,
                newUser: newUserData
            });

            if ('error' in result) {
                console.error("Failed to add user to database:", result.error);
            }
    
            navigate("/home");
    
          } catch (error) {
            console.error("Registration error:", error);
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