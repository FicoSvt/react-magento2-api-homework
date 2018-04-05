import React from 'react';

const CartItems = (props) => {
    return (
        <li className="ui-list__item ui-list__cart__item">
            <span className="ui-list__inner-item ui-list__name list-item-name">{props.name}</span>
            <span className="ui-list__inner-item ui-list__qty list-item-qty">Qty: {props.qty}</span>
            <span className="ui-list__inner-item ui-list__price list-item-price">Price: <span className="price">{props.currency}{props.price}</span></span>
            <span className="ui-list__inner-item ui-list__remove" onClick={props.removeItemFromCart}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 28" className="ui-icon ui-icon__remove">
                    <title>times-circle-o</title>
                    <path d="M17.141 16.859l-2.281 2.281c-0.203 0.203-0.516 0.203-0.719 0l-2.141-2.141-2.141 2.141c-0.203 
                    0.203-0.516 0.203-0.719 0l-2.281-2.281c-0.203-0.203-0.203-0.516 0-0.719l2.141-2.141-2.141-2.141c-0.203-0.203-0.203-0.516 
                    0-0.719l2.281-2.281c0.203-0.203 0.516-0.203 0.719 0l2.141 2.141 2.141-2.141c0.203-0.203 0.516-0.203 0.719 0l2.281 
                    2.281c0.203 0.203 0.203 0.516 0 0.719l-2.141 2.141 2.141 2.141c0.203 0.203 0.203 0.516 0 0.719zM20.5 
                    14c0-4.688-3.813-8.5-8.5-8.5s-8.5 3.813-8.5 8.5 3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5zM24 14c0 
                    6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z"></path>
                </svg>
                Remove Item
            </span>
        </li>
    )
}

export default CartItems;