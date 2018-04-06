import React, { Component } from 'react';
import './../App.css';
import listItemImage from '../list-item-image.jpg';
import ListItems from '../modules/ProductListing/components/ListItems';
import CartItems from '../modules/ProductListing/components/CartItems';

class Tracks extends Component {


    state = {
        cartData: [],
        basePrice: 0,
        baseCurrency: '$',
        isLoading: false
    }

    LIST_ITEMS = [
        {
            id: '01',
            artist: 'Oberon',
            name: 'Revolution',
            price: 20.44,
            qty: 1,
            currency: '$'
        },
        {
            id: '02',
            artist: 'The Synthernator',
            name: 'Beoliger',
            price: 30.23,
            qty: 1,
            currency: '$'
        },
        {
            id: '03',
            artist: 'Son Of Trance',
            name: 'Utopia',
            price: 15.25,
            qty: 1,
            currency: '$'
        },
        {
            id: '04',
            artist: 'Oberon',
            name: 'Oberon',
            price: 20.57,
            qty: 1,
            currency: '$'
        },
        {
            id: '05',
            artist: 'The Synthernator',
            name: 'Miami Nights',
            price: 40.23,
            qty: 1,
            currency: '$'
        },
        {
            id: '06',
            artist: 'Son Of Trance',
            name: 'Yuliana',
            price: 60.25,
            qty: 1,
            currency: '$'
        }
    ]

    componentDidMount() {
        localStorage.setItem('listItemsStored', JSON.stringify(this.LIST_ITEMS));    
    }

    // formating price helper - 2 decimals round 

    formatPrice = (sourcePrice) => {
        return parseFloat(sourcePrice.toFixed(2));
    }

    addItemUpdater = (data,inject) => {
        return data.concat(inject);
    }

    miniCartTotalPriceUpdater = (basePrice, priceCalc, operation) => {
        let result;
        switch (operation) {
            case 'add':
                result = basePrice + priceCalc;
                break;
            case 'subtract':
                result = basePrice - priceCalc;
                break;
            case 'multiply':
            result = basePrice * priceCalc;
            break;
            case 'divide':
                result = basePrice / priceCalc;
                break;
            default:
        }
        return result;
    }

    addCartItem = (id) => {
        const grabFromStorage = localStorage.getItem('listItemsStored'),
            cartIndex = JSON.parse(grabFromStorage),
            cartState = this.state.cartData;
        let productInCart = cartState.map(item => item.id).indexOf(id),
            updatedCart = cartIndex.find(cartItem => cartItem.id === id),
            clonedCart = Object.assign({},updatedCart),
            cartDataFinal = null,
            priceUpdater = null;

        if(productInCart < 0) {
            cartDataFinal = this.addItemUpdater(this.state.cartData,clonedCart);
            priceUpdater = this.formatPrice(this.state.basePrice + clonedCart.price);
        } else {
            cartDataFinal = this.state.cartData;
            cartDataFinal[productInCart].qty ++;
            let calculatedPrice = cartIndex[productInCart].price + cartDataFinal[productInCart].price,
                formattedPrice = this.formatPrice(calculatedPrice);

            cartDataFinal[productInCart].price = formattedPrice;
            priceUpdater = this.formatPrice(this.state.basePrice + cartIndex[productInCart].price);
        }
        return this.setState({
            cartData: cartDataFinal,
                basePrice: priceUpdater,
                isLoading: true
        })
    }

    clickTransportHandler = (id) => {
        this.setState({isLoading: true}, () => this.addCartItem(id));
    }

    removeItemHandler = (id) => {
        this.setState({isLoading: true});
        const cartIndex = this.state.cartData;

        let productInCart = cartIndex.map(item => item.id).indexOf(id),
            calculatedPrice = cartIndex[productInCart].price,
            formattedPrice = this.formatPrice(calculatedPrice),
            priceUpdater = null;

        calculatedPrice = formattedPrice;
        if(productInCart > -1) {
            cartIndex.splice(productInCart, 1);
            priceUpdater = this.formatPrice(this.state.basePrice - formattedPrice);
        }

        this.setState ((state, props) => {
            return {
                cartData: cartIndex,
                basePrice: priceUpdater,
                isLoading: false
            }
        });

    }

    render() {
        return (
            <div className="ui-main">
                <div className="ui-container">
                    <h1 className="ui-title ui-title--margin ui-title--border">Inchoo</h1>
                </div>
                <div className="ui-container">
                    <ul className="ui-list ui-list__products">
                        {this.LIST_ITEMS.map((item) => {
                            return <ListItems 
                            key={item.id} 
                            name={item.name}
                            sku={item.sku} 
                            smallimage={listItemImage}
                            currency={this.state.baseCurrency} 
                            price={item.price} 
                            dataid={item.id} 
                            addItemToCart={(event) => this.clickTransportHandler(item.id)}  />
                        })}
                    </ul>
                    <aside className="ui-box ui-sidebar">
                        {this.state.isLoading ?
                        <div className="ui-loader__container">
                            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                        </div>
                        : null
                        }
            
                    {this.state.cartData.length ?
                        <ul className="ui-list ui-list__cart">
                        {this.state.cartData.map((item) => {
                        return <CartItems 
                                key={item.id} 
                                name={item.name} 
                                price={item.price} 
                                qty={item.qty}
                                currency={this.state.baseCurrency}
                                removeItemFromCart={(event) => this.removeItemHandler(item.id)}
                                />
                        })} 
                        </ul>
                        
                        : <p className="ui-cart--no-items">There are no items in your shopping cart</p>  
                    }

                    {this.state.cartData.length ?
                        <p className="ui-grand-total">Subtotal: <span className="price">{this.state.baseCurrency}{this.state.basePrice}</span></p>
                        : null
                    }
                </aside>
            </div>
            </div>
        );
    }
}

export default Tracks;
