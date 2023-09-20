import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

export function Backdrop(props) {
    return <div className={classes.backdrop} onClick={props.onClose} />
}

export function ModalOverlay(props) {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

const portalElement = document.getElementById('overlay')

export function Modal(props) {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    )
}
