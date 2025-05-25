import "./Cart.scss";
import Order from "./Order/Order";
import { useState, useEffect } from "react";
import { useLazyGetCartQuery } from "../../../services/firebaseApi";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../../store/slices/cartSlice";

import iconBike from "../../../assets/icons/motobike.png";

export default function Cart({ setCategoryId, stateIsOpen }) {
    const dispatch = useDispatch();
    
    const user = getAuth().currentUser;
    const [getCart] = useLazyGetCartQuery();

    const { items: cart, amountOfMeals, price } = useSelector((state) => state.cart);
    const { isOpen, setIsOpen } = stateIsOpen;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [cartOpen, setCartOpen] = useState(window.innerWidth >= 1044);
    const [cartLoaded, setCartLoaded] = useState(false);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        if(!user) console.log("User not found");

        const fetchCart = async () => {
            const { data } = await getCart(user.uid);
            if (data) {
                dispatch(setCart(Object.values(data)));
                setCartLoaded(true)
            }
        };

        fetchCart();

        return () => window.removeEventListener("resize", handleResize);
    }, [user]);

    return (
        <div className="wr-cart">
            <div className={`container ${cartOpen ? "expanded" : ""}`}>
                <div
                    className="label"
                    onClick={() => {
                        if (windowWidth <= 1044) setCartOpen(!cartOpen);
                    }}
                >
                    <p>Корзина</p>
                    <div className="numberOrders">
                        <p>{amountOfMeals}</p>
                    </div>
                </div>

                {cartOpen && (
                    <div className="cart-content">
                        <div className="order">
                            {cartLoaded ? (
                                cart.map((item) => (
                                    <Order key={item.id} {...item} cart={cart} setCart={setCart} />
                                ))
                            ) : (
                                <p>loading cart...</p>
                            )}
                        </div>

                        { cart.length > 0 && (
                            <>
                                <div className="price">
                                    <p>Итого</p>
                                    <p>{price}₽</p>
                                </div>

                                <button
                                    onClick={() => {
                                        setIsOpen(true);
                                        setCategoryId("makeOrder");
                                    }}
                                    className="make-order-btn"
                                >
                                    Оформить заказ
                                </button>

                                {(amountOfMeals >= 7 || price >= 2500) && (
                                    <div className="freeDelivery">
                                        <img src={iconBike} alt="bike" />
                                        <p>Бесплатная доставка</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
