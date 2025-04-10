export const changeAmount = (id, change, cart, setCart) => {

  const currentAmount = cart.find(item => item.id === id).amount;
  if(currentAmount <= 1 && change === -1) {
      setCart(cart.filter(item => item.id !== id));
      return;
  }

  const arr = cart.map(item => {
      if(item.id === id){
          const newAmount = +item.amount + change;
          return{
              ...item,
              amount: newAmount
          }
      }

      return item;
  })

  setCart(arr);

}