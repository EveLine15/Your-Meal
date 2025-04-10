// export default function addToCart(categoryId, itemId){
// }

import "./addToCartModal.scss"

import { ControlModal } from "./ControlModal";

import { useState } from "react";

export default function AddToCartModal({item, stateCart, closeModal}){
    const {id, name, img, weight, price, description, compos, calories} = item;

    const {cart, setCart} = stateCart;

    const [addAmount, setAddAmount] = useState(0);


    return(
        <div className="modal-content">
            <div className="topPart">
                <h1>{name}</h1>
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

            <button className={`add-btn-modal ${addAmount === 0 ? "add-btn-disabled" : ""}`} disabled={addAmount === 0} onClick={() => {ControlModal(id, cart, setCart, {...item}, addAmount); closeModal()}}>Добавить</button>

            <div className="add">
                <div className="amount-control">
                    <button onClick={() => {if(addAmount !== 0) setAddAmount(addAmount => addAmount - 1) }}>-</button>
                    <p>{addAmount}</p>
                    <button onClick={() => setAddAmount(addAmount => addAmount + 1)}>+</button>
                </div>

                <p className="modal-price">{price}₽</p>
            </div>

        </div>
    )
}