export const ControlModal = (id, cart, setCart, item, addAmount) => {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        const changedCart = cart.map(obj => {return obj.id === existingItem.id ? { ...obj, amount: +obj.amount + addAmount} : obj});
        setCart(changedCart)
        return;
    }

    setCart([...cart, {...item, amount: addAmount}]);
    return; 

}