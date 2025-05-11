  import './App.scss'

  import { Route, Routes, useNavigate, useLocation, Navigate} from "react-router";
  import { useEffect } from 'react';
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { useLazyGetUserQuery } from "../services/firebaseApi"

  import Login from '../pages/Login/Login';
  import Home from '../pages/Home/Home';
  import Register from '../pages/Register/Register';
  import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
  import UserAccount from '../pages/userAccount/userAccount';
  import OrdersHistory from '../pages/OrdersHistory/OrdersHistory';
  import UserInfo from '../pages/UserInfo/UserInfo';

  export default function App(){
    const auth = getAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [triggerGetUser] = useLazyGetUserQuery();

    useEffect(() => {
      onAuthStateChanged(auth, async (userCurrent) => {
        if (userCurrent) {
          try {
            await triggerGetUser(userCurrent.uid);

            if (location.pathname === "/login" || location.pathname === "/") {
              navigate("/home");
            }

          } catch (error) {
            console.error("Error fetching user:", error);
          }

        } else {
    
          const publicRoutes = ["/", "/login", "/register", "/forgotPass"];
          if (!publicRoutes.includes(location.pathname)) {
            navigate("/login");
          }
        }
      });
    }, [auth, navigate, location.pathname]);
    

    return(
      <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgotPass' element={<ForgotPassword/>}/>
        <Route path='/account' element={<UserAccount/>}>
          <Route path="userProfile" element={<UserInfo />} />
          <Route path="orderHistory" element={<OrdersHistory />} />
        </Route>
      </Routes>
      </> 
    )
  }
