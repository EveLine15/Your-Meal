import AddButton from "../../AddButton/AddButton";

import cross from "../../../../assets/icons/cross.png";

import "./Modal.scss"


export default function Modal({id, name, img, weight, price, description, compos, calories, isOpen, closeModal, cart, setCart}){

    if(!isOpen) return null;

    return(
        <div className="modal">
            <div className="modal-content">
                <div className="topPart">
                    <h1>{name}</h1>
<                   button className="cross" onClick={closeModal}><img src={cross} alt="cross"/></button>
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

                
                <button className="add-btn-modal" onClick={closeModal}>Добавить</button>

                <div className="add">
                    <AddButton id={id} amount={0} cart={cart} setCart={setCart}/>

                    <p className="modal-price">{price}₽</p>
                </div>

            </div>
        </div>
    )
}