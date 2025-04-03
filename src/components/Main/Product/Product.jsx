import "./Product.scss"

export default function Products({id, name, img, weight, price}){
    return(
        <div className="card">
            <div className="img-wr">
                <img src={img} alt={name}/>
            </div>
            <div className="text-block">
                <h3>{price}₽</h3>
                <p className="burger-name">{name}</p>
                <p className="burger-weight">{weight}г</p>
            </div>
            <button>Добавить</button>
        </div>
    )
    
}