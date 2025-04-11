import AddToCartModal from "./addToCartModal/addToCartModal";
import MakeOrder from "./MakeOrder/MakeOrder";

export default function RenderModal({categoryId, item, stateCart, closeModal}) {
    switch (categoryId) {
        case "addToCart":
            return <AddToCartModal item={item} stateCart={stateCart} closeModal={closeModal}/>;
        
        case "makeOrder":
            return <MakeOrder/>;    
        default:
            break;
    }
}