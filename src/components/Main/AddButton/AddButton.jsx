import { changeAmount } from "./helper/helper"
import "./AddButton.scss"

export default function AddButton({id, amount, cart, setCart, productData}){
    return(
        <div className="amount-control">
            <button onClick={() => changeAmount(id, -1, cart, setCart)}>-</button>
            <p>{amount}</p>
            <button onClick={() => changeAmount(id, 1, cart, setCart, productData)}>+</button>
        </div>
    )
}