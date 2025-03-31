import "./Cart.scss"
import Order from "./Order/Order"

import iconBike from "../../../assets/icons/motobike.png"

export default function Cart({stateCart}){

    const {cart, setCart} = stateCart;

    const amountOfMeals = cart.reduce((acc, item) => acc + +item.amount, 0)
    const price = cart.reduce((acc, item) => acc + item.price * item.amount, 0);

    return(
        <div className="wr-cart">
            <div className="container">

                <div className="label">
                    <p>Корзина</p>
                    <div className="numberOrders"><p>{amountOfMeals}</p></div>
                </div>

                <div className="order">
                    {
                        cart.map(item => {return <Order key={item.id} {...item} cart={cart} setCart={setCart}/>})
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