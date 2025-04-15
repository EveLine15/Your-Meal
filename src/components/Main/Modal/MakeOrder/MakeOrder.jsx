import "./MakeOrder.scss"
import donut from "../../../../assets/images/donut.png"
import { useState } from "react"

export default function MakeOrder(){
    const [delivery, setDelivery] = useState(false);

    return(
        <div className="wr-modal">
            <div className="order-content">
                <div className="left-part">
                    <img src={donut} alt="donut"/>
                </div>

                <div className="right-part">
                    <form>
                        <h1>Доставка</h1>
                        <input type="text" placeholder="Ваше имя" id="name"/>
                        <input type="phone" placeholder="Телефон" id="phone"/>

                        <div className="radio-block">
                            <label className="radio-option">
                                <input type="radio" name="choice" value="option1" onChange={() => setDelivery(false)}/>
                                <span className="custom-radio"></span>
                                Самовывоз
                            </label>

                            <label className="radio-option">
                                <input type="radio" name="choice" value="option2" onChange={() => setDelivery(true)}/>
                                <span className="custom-radio"></span>
                                Доставка
                            </label>
                        </div>

                        {delivery && (
                            <div className="delivery">
                                <input type="text" placeholder="Улица, дом, квартира" id="address" />
                                <div className="floor-door">
                                    <input type="text" placeholder="Этаж" id="floor" />
                                    <input type="text" placeholder="Домофон" id="door" />
                                </div>
                            </div>
                        )}

                        <button>Оформить</button>
                    </form>

                </div>
            </div>
        
        </div>

    )

}