import "./MakeOrder.scss"
import donut from "../../../../assets/images/donut.png"

export default function MakeOrder(){
    return(
        <div className="wr-modal">
            <div className="order-content">
                <div className="left-part">
                    <img src={donut} alt="donut"/>
                </div>

                <div className="right-part">
                    <h1>Доставка</h1>

                    <form>
                        <input type="text" placeholder="Ваше имя" id="name"/>
                        <input type="phone" placeholder="Телефон" id="phone"/>

                        <div className="radio-block">
                            <label class="radio-option">
                                <input type="radio" name="choice" value="option1"/>
                                <span className="custom-radio"></span>
                                Самовывоз
                            </label>

                            <label class="radio-option">
                                <input type="radio" name="choice" value="option2"/>
                                <span className="custom-radio"></span>
                                Доставка
                            </label>
                        </div>

                        <input type="text" placeholder="Улица, дом, квартира" id="address"/>
                        <div className="floor-door">
                            <input type="text" placeholder="Этаж" id="floor"/>
                            <input type="text" placeholder="Домофон" id="door"/>
                        </div>

                        <button>Оформить</button>
                    </form>

                </div>
            </div>
        
        </div>

    )

}