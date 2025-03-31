import "./Option.scss"

export default function Option({name, icon, active, menu, setMenu}){
    return(
        <div className={`option ${active === "true" ? "isActive" : ""}`} onClick={setMenu(menu)}>
            <img src={icon} alt={name}/>
            <span>{name}</span>
        </div>
    )
}