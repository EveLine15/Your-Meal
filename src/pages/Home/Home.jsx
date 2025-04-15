import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";

import menuBase from "../../data/menu.json"

import { useState } from "react";

export default function Home(){
    const [cart, setCart] = useState([]);
    const [menu, setMenu] = useState(menuBase);
  
    const stateCart = {cart, setCart};
    const stateMenu = {menu, setMenu};
    return(
        <>
            <Header stateCart={stateCart} stateMenu={stateMenu}/>
            <Main stateCart={stateCart} stateMenu={stateMenu}/>
            <Footer/>
        </>
    )
}