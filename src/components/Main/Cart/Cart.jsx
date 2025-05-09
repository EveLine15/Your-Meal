import "./Cart.scss"
import Order from "./Order/Order"
import { useState, useEffect } from "react";

import iconBike from "../../../assets/icons/motobike.png"

export default function Cart({stateCart, setCategoryId, stateIsOpen}){

    const {cart, setCart} = stateCart;
    const {isOpen, setIsOpen} = stateIsOpen;
    const [selfWindow, setSelfWindow] = useState(window.innerWidth);

    const [cartOpen, setCartOpen] = useState(selfWindow >= 1044);

    useEffect(() => {
        const handleResize = () => setSelfWindow(window.innerWidth);
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    

    const amountOfMeals = cart.reduce((acc, item) => acc + +item.amount, 0)
    const price = cart.reduce((acc, item) => acc + item.price * item.amount, 0);

    return(
        <div className="wr-cart">
            <div className={`container ${cartOpen ? "expanded" : ""}`}>

                <div className="label" onClick={() => {if(selfWindow <= 1044) setCartOpen(!cartOpen)}}>
                    <p>Корзина</p>
                    <div className="numberOrders"><p>{amountOfMeals}</p></div>
                </div>

                {cartOpen && (
                    <div className="cart-content">
                        <div className="order">
                            {
                                cart.map(item => {return <Order key={item.id} {...item} cart={cart} setCart={setCart}/>})
                            }
                        </div>

                        <div className={`price ${cart.length === 0 ? "none" : ""}`}>
                            <p>Итого</p>
                            <p>{price}₽</p>
                        </div>

                        <button onClick={() => {setIsOpen(true); setCategoryId("makeOrder")}} className={`make-order-btn ${cart.length === 0 ? "none" : ""}`}>Оформить заказ</button>

                        <div className={`freeDelivery ${amountOfMeals >= 7 || price >= 2500 ? "" : 'none'}`}>
                            <img src={iconBike} alt="bike"/>
                            <p>Бесплатная доставка</p>
                        </div>
                    </div>
                )}
                
            </div>
        </div>
    )
}