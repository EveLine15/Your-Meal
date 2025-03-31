import "./Product.scss"

export default function Products({id, name, img, weight, price}){
    return(
        <div key={id} className="card">
            <div className="img-wr">
                <img src={img} alt={name}/>
            </div>
            <h3>{price}₽</h3>
            <p className="burger-name">{name}</p>
            <p className="burger-weight">{weight}г</p>
            <button>Добавить</button>
        </div>
    )
    
}