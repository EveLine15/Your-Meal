import "./Order.scss"

import { changeAmount } from "./helper/helper"

export default function Order({id, name, img, weight, price, description, compos, calories, amount, cart, setCart}){
    
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
                    <button onClick={() => changeAmount(id, -1, cart, setCart)}>-</button>
                    <p>{amount}</p>
                    <button onClick={() => changeAmount(id, 1, cart, setCart)}>+</button>
                </div>

            </div>

        </div>
    )
}