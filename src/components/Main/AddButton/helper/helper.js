export const changeAmount = (id, change, cart, setCart, productData) => {
    const existingItem = cart.find(item => item.id === id);

    if (!existingItem && change > 0) {
      setCart([...cart, { ...productData, amount: 1 }]);
      return;
    }
  
    if (existingItem && existingItem.amount <= 1 && change === -1) {
      setCart(cart.filter(item => item.id !== id));
      return;
    }
  
    const newCart = cart.map(item => {
      if (item.id === id) {
        return {
          ...item,
          amount: +item.amount + change,
        };
      }
      return item;
    });
  
    setCart(newCart);
  };
  