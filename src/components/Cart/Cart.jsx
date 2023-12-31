import classes from "./Cart.module.css";
import {Modal} from "../UI/Modal";
import CartContext from "../../store/cart-context";
import {useContext} from "react";
import CartItem from "./CartItem";

export default function Cart(props) {
    const cartContext = useContext(CartContext);

    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
    const hasItems = cartContext.items.length > 0;

    function cartItemRemoveHandler(id) {
        cartContext.removeItem(id)
    }

    function cartItemAddHandler(item) {
        cartContext.addItem({...item, amount: 1})
    }

    const cartItems = <ul className={classes['cart-items']}>
        {cartContext.items.map((item) => (
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />
        ))}
    </ul>

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}
