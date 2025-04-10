import "./Product.scss"

export default function Products(props) {
    const {isOpen, setIsOpen} = props.stateIsOpen;
    return (
        <div className="card">
            <div className="img-wr">
                <img src={props.img} alt={props.name} />
            </div>
            <div className="text-block">
                <h3>{props.price}₽</h3>
                <p className="burger-name">{props.name}</p>
                <p className="burger-weight">{props.weight}г</p>
            </div>
            <button className="add-btn" onClick={() => {setIsOpen(true); props.setCategoryId("addToCart"); props.setItem({
                id: props.id,
                name: props.name,
                img: props.img,
                weight: props.weight,
                price: props.price,
                description: props.description,
                compos: props.compos,
                calories: props.calories
                })}}>Добавить</button>
        </div>
    );
}
