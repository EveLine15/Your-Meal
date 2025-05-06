  import './App.scss'

  import { Route, Routes, useNavigate, useLocation} from "react-router";
  import { useEffect } from 'react';
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { useDispatch } from 'react-redux';
  import { setUser, clearUser } from '../store/slices/authSlice';

  import Login from '../pages/Login/Login';
  import Home from '../pages/Home/Home';
  import Register from '../pages/Register/Register';
  import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
  import UserAccount from '../pages/userAccount/userAccount';

  export default function App(){
    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
      onAuthStateChanged(auth, async (userCurrent) => {
        if (userCurrent) {
          const res = await fetch(
            `https://burger-6e37c-default-rtdb.firebaseio.com/users/${userCurrent.uid}.json`
          );
          const userData = await res.json();
    
          if (userData) {
            dispatch(setUser({
              uid: userCurrent.uid,
              email: userCurrent.email,
              login: userData.login || "",
              avatar: userData.avatar || "",
              address: userData.address || "",
              cardNumber: userData.cardNumber || "",
              createdAt: userData.createdAt || "",
            }));
          }
    
          if (location.pathname === "/login" || location.pathname === "/") {
            navigate("/home");
          }
        } else {
          dispatch(clearUser());
    
          const publicRoutes = ["/", "/login", "/register", "/forgotPass"];
          if (!publicRoutes.includes(location.pathname)) {
            navigate("/login");
          }
        }
      });
    }, [auth, navigate, dispatch, location.pathname]);
    

    return(
      <>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgotPass' element={<ForgotPassword/>}/>
        <Route path='/account' element={<UserAccount/>}/>
      </Routes>
      </>
    )
  }
