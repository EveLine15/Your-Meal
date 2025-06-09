import "./Order.scss"

import { useChangeAmount } from "./helper/helper"

export default function Order({id, name, img, weight, price, amount}){
    const updateOrderAmount = useChangeAmount();
    
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
                    <button onClick={() => updateOrderAmount(id, -1)}>-</button>
                    <p>{amount}</p>
                    <button onClick={() => updateOrderAmount(id, 1)}>+</button>
                </div>

            </div>

        </div>
    )
}