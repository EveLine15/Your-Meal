import "./Main.scss"
import Nav from "./Nav/Nav"
import Cart from "./Cart/Cart"
import Product from "./Product/Product"

export default function Main({stateCart, stateMenu, stateSelected}){

    const {menu, setMenu} = stateMenu;
    const {selected, setSelected} = stateSelected;

    const currentCategory = menu.find(category => category.name === selected);
    const items = currentCategory.items;

    return(
        <div className="wr-main">
            <div className="container">
                <div className="nav-container">
                    <Nav stateMenu={stateMenu} stateSelected={stateSelected}/>
                </div>

                <div className="main-container">
                    <Cart stateCart={stateCart}/>
                    <div className="card-block">
                        <div className="card-holder">
                            <h1 className="selected-items">{selected}</h1>
                            {items.map((item) => <Product key={item.id} {...item}/>)}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}