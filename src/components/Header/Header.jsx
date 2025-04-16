import logo from "../../assets/logo/logo.png"
import burgerMain from "../../assets/logo/burgerMain.png"
import User from "../User/User"

import { ControlModal } from "../Main/Modal/AddToCartModal/ControlModal"

import "./Header.scss"

export default function Header({stateCart, stateMenu}){
    const {menu, setMenu} = stateMenu;
    const {cart, setCart} = stateCart;

    function randBurger(){
        const randNum = Math.floor(Math.random() * 7);
        const item = menu[0].items[randNum];
        ControlModal(item.id, cart, setCart, item, 1);
    }
    return(
        <div className="wr-header">
            <User/>
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
                            <button onClick={randBurger}>Добавить</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}