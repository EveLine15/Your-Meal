import AddButton from "../../AddButton/AddButton";

import cross from "../../../../assets/icons/cross.png";

import { changeAmount } from "../../AddButton/helper/helper";

import { useEffect } from "react";

import "./Modal.scss"


export default function Modal({id, name, img, weight, price, description, compos, calories, isOpen, closeModal, cart, setCart}){

    
    if(!isOpen) return null;

    useEffect(() => {
        const itemInCart = cart.find(item => item.id === id);
        if (!itemInCart) {
            console.log('changed')
            changeAmount(id, 1, cart, setCart, { id, name, img, weight, price, description, compos, calories });
        }
    }, []);

    const cartItem = cart.find(item => item.id === id);
    const currentAmount = cartItem ? cartItem.amount : 0;

    return(
        <div className="modal">
            <div className="modal-content">
                <div className="topPart">
                    <h1>{name}</h1>
                    <button className="cross" onClick={closeModal}><img src={cross} alt="cross"/></button>
                </div>

                <div className="modal-img-wr">
                    <img src={img} alt={name}/>
                </div>

                <div className="text-content">
                    <p className="descr">{description}</p>

                    <div className="comps">
                        <h1>Состав:</h1>
                        <ul>
                            {compos.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>

                    <div className="nutritional-value">
                        <span>{weight}г, </span>
                        <span>ккал {calories}</span>
                    </div>

                </div>

                
                <button className={`add-btn-modal ${currentAmount === 0 ? "add-btn-disabled" : ""}`} disabled={currentAmount === 0} onClick={closeModal}>Добавить</button>

                <div className="add">
                        <AddButton id={id} amount={currentAmount} cart={cart} setCart={setCart} productData={{ id, name, img, weight, price }}/>
                    <p className="modal-price">{price}₽</p>
                </div>

            </div>
        </div>
    )
}