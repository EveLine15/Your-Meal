import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import User from "../../components/User/User"

import { useState } from "react";

export default function Home(){
    const [cart, setCart] = useState([]);
  
    const stateCart = {cart, setCart};
    
    return(
        <>
            <User/>
            <Header stateCart={stateCart}/>
            <Main stateCart={stateCart} />
            <Footer/>
        </>
    )
}