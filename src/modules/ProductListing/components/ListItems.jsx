import React from 'react';

const ListItems = (props) => {
    return (
        <li className="ui-box ui-list__item ui-list__products__item">
            <span className="ui-list__inner-item ui-list__inner-item--products ui-list__name list-item-name">{props.name}</span>
            <img className="list-item-image" src={props.smallimage} alt={props.name}/>
    <span className="ui-list__inner-item ui-list__inner-item--products ui-list__price list-item-price">Price: <span className="price">{props.currency}{Number.parseFloat(props.price).toFixed(2)}</span></span>
            <button onClick={props.addItemToCart} className="ui-button ui-button--cta" dataid={props.dataid}>Add to Cart</button>
        </li>
    )
}

export default ListItems;