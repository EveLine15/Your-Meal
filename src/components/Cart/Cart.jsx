import "./Cart.scss"
import Order from "./Order/Order"

import iconBike from "../../assets/icons/motobike.png"
import order from "../../data/order.json"

//import { menu } from "../../data/menu"

import { useState, useEffect } from "react"

export default function Cart(){
    const menu = [];
    for (const i in order) {
        menu[i] = 1;
    }
    const [orderAmount, setOrderAmount] = useState(menu);

    const [amountOfMeals, setAmountOfMeals] = useState(0);

    const [price, setPrice] = useState(0);

    useEffect(() => {
        console.log('change amount')
        console.log(orderAmount)
        setAmountOfMeals(orderAmount.reduce((acc, item) => acc + item, 0));
        setPrice(orderAmount.reduce((acc, item, index) => acc + item*order[index].price, 0))
    })

    // useEffect(() => {
    //     setAmountOfMeals(order.length);
    // }, [])
    return(
        <div className="wr-cart">
            <div className="container">

                <div className="label">
                    <p>Корзина</p>
                    <div className="numberOrders"><p>{amountOfMeals}</p></div>
                </div>

                <div className="order">
                    {
                        order.map(item => {return <Order key={item.id} {...item} amount={orderAmount} setAmount={setOrderAmount}/>})
                    }
                </div>

                <div className="price">
                    <p>Итого</p>
                    <p>{price}₽</p>
                </div>

                <button className="make-order">Оформить заказ</button>

                <div className={`freeDelivery ${amountOfMeals >= 7 || price >= 2500 ? "" : 'none'}`}>
                    <img src={iconBike} alt="bike"/>
                    <p>Бесплатная доставка</p>
                </div>
            </div>
        </div>
    )
}