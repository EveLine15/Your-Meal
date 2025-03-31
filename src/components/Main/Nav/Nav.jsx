import "./Nav.scss"

export default function Nav({stateMenu, stateSelected}){
    const {menu, setMenu} = stateMenu;
    const {selected, setSelected} = stateSelected;

    return(
        <div className="nav-wr">
            <div className="container">
                {
                    menu.map(item =>  (      
                    <button key={item.id} className={`option ${selected === item.name ? "isActive" : ""}`} onClick={() => {setSelected(menu[item.id].name)}}>
                        <img src={item.icon} alt={item.name}/>
                        <span>{item.name}</span>
                    </button>
                ))
                }
            </div>
        </div>
    )
}