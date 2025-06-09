import AddToCartModal from "./AddToCartModal/AddToCartModal";
import MakeOrder from "./MakeOrder/MakeOrder";

export default function RenderModal({categoryId, item, closeModal}) {
    switch (categoryId) {
        case "addToCart":
            return <AddToCartModal item={item} closeModal={closeModal}/>;
        
        case "makeOrder":
            return <MakeOrder closeModal={closeModal}/>;   
        default:
            break;
    }
}