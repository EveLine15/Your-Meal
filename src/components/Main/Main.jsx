import "./Main.scss"
import Nav from "./Nav/Nav"
import Cart from "./Cart/Cart"
import Product from "./Product/Product"
import Modal from "./Modal/Modal"

import { useState, useEffect } from 'react'
import { useLazyGetMenuQuery } from "../../services/firebaseApi"

export default function Main({stateCart}){
    const [triggerGetMenu] = useLazyGetMenuQuery();
    
    const [menu, setMenu] = useState([]);
    const [selected, setSelected] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [categoryId, setCategoryId] = useState(null);
    const [item, setItem] = useState(null);

    useEffect(() => {
    const fetchMenu = async () => {
        try {
        const result = await triggerGetMenu();

        if (result.data) {
            const menuArray = Object.values(result.data);
            setMenu(menuArray);
            setSelected(menuArray[0]?.name || "");
        }
        } catch (err) {
        console.error("Error fetching menu:", err);
        }
    };

    fetchMenu();
    }, [triggerGetMenu]);

    
    const stateSelected = {selected, setSelected};
    const stateIsOpen = {isOpen, setIsOpen}

    const currentCategory = menu.length > 0 ? menu.find((cat) => cat.name === selected) : null;

    return(
        <div className="wr-main">
            <div className="container">
                <div className="nav-container">
                    <Nav stateSelected={stateSelected} menu={menu}/>
                </div>

                <div className="main-container">
                    <Cart stateCart={stateCart} setCategoryId={setCategoryId} stateIsOpen={stateIsOpen}/>
                    <div className="card-block">
                        <div className="card-holder">
                            <h1 className="selected-items">{selected}</h1>
                            {currentCategory ? (
                            currentCategory.items.map((item) => (
                                <Product
                                    key={item.id}
                                    {...item}
                                    stateIsOpen={stateIsOpen}
                                    setCategoryId={setCategoryId}
                                    setItem={setItem}
                                />
                                ))
                                ) : (
                                <p>Loading menu...</p>
                            )}
                        </div>

                    </div>
                
                <Modal categoryId={categoryId} isOpen={isOpen} closeModal={() => {setIsOpen(false)}} item={item} stateCart={stateCart}/>
                </div>
            </div>
        </div>
    )
}