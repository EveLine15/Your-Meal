import "./Footer.scss"
import logo from "../../assets/logo/logoBig.png"
import phone from "../../assets/icons/phone.png"
import wk from "../../assets/icons/wk.png"
import telegram from "../../assets/icons/telegram.png"

export default function Footer(){
    return(
        <div className="wr-footer">
            <div className="container">
                <div className="logo-block">
                    <img src={logo} alt="logo"/>
                </div>

                <div className="phone">
                    <h1>Номер для заказа</h1>
                    <div className="phone-number">
                        <img src={phone} alt="phone"/>
                        <p>+7(930)833-38-11</p>
                    </div>

                </div>

                <div className="socials">
                    <h1>Мы в соцсетях</h1>
                    <div className="social-icons">
                        <img src={wk} alt="wk"/>
                        <img src={telegram} alt="telegram"/>
                    </div>
                </div>
            </div>
        </div>
    )
}