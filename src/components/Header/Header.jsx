import logo from "../../assets/logo/logo.png"
import burgerMain from "../../assets/logo/burgerMain.png"

import "./Header.scss"

export default function Header(){
    return(
        <div className="wr-header">
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>

                <div className="main-head">
                    <div className="img-wr">
                        <img src={burgerMain} alt="burger"/>
                    </div>

                    <div className="text-wr">
                        <div className="top">
                            <p>Только самые</p>
                            <p className="orange">сочные бургеры</p>
                        </div>

                        <div className="bottom">
                            <p>Бесплатная доставка от 599₽</p>
                            <button>Добавить</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}