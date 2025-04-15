import "./Main.scss"
import Nav from "./Nav/Nav"
import Cart from "./Cart/Cart"
import Product from "./Product/Product"
import Modal from "./Modal/Modal"

import { useState } from 'react'

export default function Main({stateCart, stateMenu}){
    const {menu, setMenu} = stateMenu;
    
    const [selected, setSelected] = useState(menu[0].name);
    const [isOpen, setIsOpen] = useState(false);
    const [categoryId, setCategoryId] = useState(null);
    const [item, setItem] = useState(null);


    const stateSelected = {selected, setSelected};
    const stateIsOpen = {isOpen, setIsOpen}

    const currentCategory = menu.find(category => category.name === selected);


    return(
        <div className="wr-main">
            <div className="container">
                <div className="nav-container">
                    <Nav stateMenu={stateMenu} stateSelected={stateSelected}/>
                </div>

                <div className="main-container">
                    <Cart stateCart={stateCart} setCategoryId={setCategoryId} stateIsOpen={stateIsOpen}/>
                    <div className="card-block">
                        <div className="card-holder">
                            <h1 className="selected-items">{selected}</h1>
                            {currentCategory.items.map((item) => <Product key={item.id} {...item} stateIsOpen={stateIsOpen} setCategoryId={setCategoryId} setItem={setItem}/>)}
                        </div>

                    </div>
                
                <Modal categoryId={categoryId} isOpen={isOpen} closeModal={() => {setIsOpen(false)}} item={item} stateCart={stateCart}/>
                </div>
            </div>
        </div>
    )
}