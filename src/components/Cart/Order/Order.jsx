import "./Order.scss"
import { useState } from "react"
import order from "../../../data/order.json"
export default function Order({id, name, img, weight, price, amount, setAmount}){

    //const [orderAmount, setOrder] = useState(1);

    function substractAmount(){
        if(amount[id] !== 1) setAmount(amount.map((item, index) => index === +id ? item - 1 : item ));
    }

    function addAmount(){
        setAmount(amount.map((item, index) => index === +id ? item + 1 : item ));
    }

    return (
        <div className="wr-orders">
            <div className="order-box">
                <div className="left">
                    <div className="img-wrapper">
                        <img src={img} alt="food"/>
                    </div>

                    <div className="discription">
                        <h1>{name}</h1>
                        <p className="weight">{weight}г</p>
                        <p className="price-order">{price}₽</p>
                    </div>
                </div>

                <div className="amount-control">
                    <button onClick={substractAmount}>-</button>
                    <p>{amount[id]}</p>
                    <button onClick={addAmount}>+</button>

                </div>

            </div>

        </div>
    )
}