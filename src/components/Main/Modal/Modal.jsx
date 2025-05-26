import RenderModal from "./RenderModal";
import "./Modal.scss"
import cross from "../../../assets/icons/cross.png";

export default function Modal({categoryId, isOpen, closeModal, item, stateCart}) {
    if(!isOpen) return null;
    
    return(
        <div className="modal">
            <div className="modal-body">
                <RenderModal categoryId={categoryId} item={item} closeModal={closeModal}/>
                <button className="cross" onClick={closeModal}><img src={cross} alt="cross"/></button>
            </div>
        </div>
    )
}