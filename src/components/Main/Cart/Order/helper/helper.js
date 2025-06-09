import { setCart } from "../../../../../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateCartMutation } from "../../../../../services/firebaseApi";
import { getAuth } from "firebase/auth";

export const useChangeAmount = () => {
    const dispatch = useDispatch();
    const [updateCart] = useUpdateCartMutation();

    const user = getAuth().currentUser;

    const { items: cart } = useSelector((state) => state.cart);

    const updateOrderAmount = (id, change) => {
        let newCart;
        
        const currentAmount = cart.find(item => item.id === id).amount;

        if(currentAmount <= 1 && change === -1) {
            newCart = (cart.filter(item => item.id !== id));
        }

        else{
            newCart = cart.map(item => {
                if(item.id === id){
                    const newAmount = +item.amount + change;
                    return{
                        ...item,
                        amount: newAmount
                    }
                }

            })
        }

        const updateCartInDb = async () => {
            try {
                await updateCart({ uid: user.uid, cart: newCart }).unwrap();
            } catch (err) {
                console.error("Failed to update cart in Firebase:", err);
            }
        }

        dispatch(setCart(newCart));
        updateCartInDb();
    }

    return updateOrderAmount;
}