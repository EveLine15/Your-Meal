import "./OrdersHistory.scss"
import { useLazyGetOrderQuery } from "../../services/firebaseApi"
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export default function OrdersHistory() {
  const [getOrder] = useLazyGetOrderQuery();
  const [load, setLoad] = useState(false);
  const [orders, setOrders] = useState([]);
  const user = getAuth().currentUser;

  useEffect(() => {
    (async () => {
      const {data} = await getOrder(user.uid);
      if(data){
        setOrders(Object.values(data));
        setLoad(true);
      } 
    })();

  }, []);

  return (
    <div className='wr-order-hisory'>
        <h1>История заказов</h1>
          <ul>
            {
              load ? (
              orders?.map((order, index) => (
                <li key={index}>
                  <h2>{order.createdAt}</h2>

                  <div className="cartList">
                    {
                      order?.cart.map((meal, index) => (
                        <div key={index} className="mealCard">
                          <div className="img-wr">
                              <img src={meal.img} alt="meal"/>
                          </div>
                          <p className="burger-name">{meal.name}</p>
                        </div>
                      ))
                    }
                  </div>
                </li>
              ))
            ) : (
                <p>Loading history...</p>
              )
            }
          </ul>
    </div>
  )
}
