import { setCart } from "../../../../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateCartMutation } from "../../../../services/firebaseApi";
import { getAuth } from "firebase/auth";

export const useControlModal = () => {
    const dispatch = useDispatch();
    const [updateCart] = useUpdateCartMutation();

    const user = getAuth().currentUser;

    const { items: cart } = useSelector((state) => state.cart);

    const controlCart = async (item, addAmount) => {
        if (!user || !item?.id || addAmount <= 0) return;
        
        const existingItem = cart.find(cartItem => cartItem.id === item.id);

        let updatedCart;
        if (existingItem) {
            updatedCart = cart.map((obj) =>
                obj.id === existingItem.id ? { ...obj, amount: +obj.amount + addAmount } : obj
            );
        } else {
            updatedCart = [...cart, { ...item, amount: addAmount }];
        }

        dispatch(setCart(updatedCart));

        try {
            await updateCart({ uid: user.uid, cart: updatedCart }).unwrap();
        } catch (err) {
            console.error("Failed to update cart in Firebase:", err);
        }
    }

    return controlCart;
}