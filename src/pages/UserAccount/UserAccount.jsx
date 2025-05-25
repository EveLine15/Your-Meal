  import "./userAccount.scss"

import { Tooltip } from 'react-tooltip'

  import { NavLink, Outlet } from "react-router";
  import { getAuth, signOut } from "firebase/auth";

  import user from "../../assets/icons/linkIcons/user.svg"
  import history from "../../assets/icons/linkIcons/history.svg"
  import call from "../../assets/icons/linkIcons/call.svg"
  import info from "../../assets/icons/linkIcons/info.svg"
  import logOut from "../../assets/icons/linkIcons/log-out.svg"
  import back from "../../assets/icons/linkIcons/arrow-back.svg"

  export default function UserAccount() {
    const auth = getAuth();

      const handleLogOut = () => {
        signOut(auth)
            .catch((error) => {
              console.error(error)
        });
      }

    return (
      <div className="wr-user">
        <div className="container">
          <div className="nav-block">
              <nav>
                <NavLink className="back-arrow" to="/home"><img src={back} alt="profile"/></NavLink>
                <NavLink to="userProfile" data-tooltip-id="nav-tooltip" data-tooltip-content="Профиль"><img src={user} alt="profile"/></NavLink>
                <NavLink to="orderHistory" data-tooltip-id="nav-tooltip" data-tooltip-content="История заказов"><img src={history} alt="orders-history"/></NavLink>
                <NavLink data-tooltip-id="nav-tooltip" data-tooltip-content="О нас"><img src={info} alt="company info"/></NavLink>
                <NavLink data-tooltip-id="nav-tooltip" data-tooltip-content="Контакты"><img src={call} alt="contacts"/></NavLink>
                <NavLink className="log-out" to="/login" onClick={handleLogOut}><img src={logOut} alt="log out"/></NavLink>
              </nav>
              <Outlet/>            
          </div>
        </div>
        <Tooltip id="nav-tooltip" place="bottom" type="light" effect="solid" className="tooltip"/>
      </div>
    )
  }
