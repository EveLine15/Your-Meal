import AddToCartModal from "./addToCartModal/addToCartModal";

export default function RenderModal({categoryId, item, stateCart, closeModal}) {
    switch (categoryId) {
        case "addToCart":
            return <AddToCartModal item={item} stateCart={stateCart} closeModal={closeModal}/>;
    
        default:
            break;
    }
}