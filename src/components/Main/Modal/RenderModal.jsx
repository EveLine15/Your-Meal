import AddToCartModal from "./AddToCartModal/AddToCartModal";
import MakeOrder from "./MakeOrder/MakeOrder";

export default function RenderModal({categoryId, item, stateCart, closeModal}) {
    switch (categoryId) {
        case "addToCart":
            return <AddToCartModal item={item} closeModal={closeModal}/>;
        
        case "makeOrder":
            return <MakeOrder/>;   
        default:
            break;
    }
}