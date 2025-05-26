import logo from "../../assets/logo/logo.png"
import burgerMain from "../../assets/logo/burgerMain.png"

import { useLazyGetMenuQuery } from "../../services/firebaseApi";
import { useControlModal } from "../Main/Modal/AddToCartModal/useControlModal";

import "./Header.scss"
import { useState, useEffect } from "react"

export default function Header(){

    const [triggerGetMenu] = useLazyGetMenuQuery();
    const [menu, setMenu] = useState([]);
    const controlCart = useControlModal();

    useEffect(() => {
    const fetchMenu = async () => {
        try {
        const result = await triggerGetMenu();

        if (result.data) {
            const menuArray = Object.values(result.data);
            setMenu(menuArray);
        }
        } catch (err) {
        console.error("Error fetching menu:", err);
        }
        };

        fetchMenu();
    }, [triggerGetMenu]);

    function randBurger(){
        const randNum = Math.floor(Math.random() * 7);
        const item = menu[0].items[randNum];
        controlCart(item, 1);
    }
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
                            <button onClick={randBurger}>Добавить</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}