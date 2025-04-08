import "./Product.scss"
import Modal from "./Modal/Modal"
import { useState } from "react";

export default function Products(props) {

    const [isOpen, setIsOpen] = useState(false);

    const { cart, setCart } = props.stateCart;

    return (
        <div className="card">
            <div className="img-wr">
                <img src={props.img} alt={props.name} />
            </div>
            <div className="text-block">
                <h3>{props.price}₽</h3>
                <p className="burger-name">{props.name}</p>
                <p className="burger-weight">{props.weight}г</p>
            </div>
            <button className="add-btn" onClick={() => {setIsOpen(true)}}>Добавить</button>

            <Modal key={props.id} {...props} isOpen={isOpen} cart={cart} setCart={setCart} closeModal={() => {setIsOpen(false)}}/>
        </div>
    );
}
