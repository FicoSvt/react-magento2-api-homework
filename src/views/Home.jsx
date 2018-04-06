import React, { Component } from 'react';
import ListItems from '../modules/ProductListing/components/ListItems';
import CartItems from '../modules/ProductListing/components/CartItems';
import Pagination from '../modules/ProductListing/components/Pagination';
import FetchProductsList from '../actions/FetchProductsList';
import FetchCartId from '../actions/FetchCartId';
import FetchCartItem from '../actions/FetchCartItem';
import FetchCartItemDelete from '../actions/FetchCartItemDelete';
import Loader from '../components/Loader';

import { stringify } from 'qs'

//...

//get first 10 simple products from category 3 (Bags)

let query = {
    searchCriteria: {
        page_size: 10,
        current_page: 1,
        filter_groups: [
            {
                filters: [
                    {
                        field: 'category_id',
                        value: '3',
                        condition_type: 'eq'
                    },
                    {
                        field: 'type_id',
                        value: 'simple',
                        condition_type: 'eq'
                    }
                ]
            }
        ]
    }
}

query = stringify(query);

const END_POINT = "http://magento2.inchoo4u.net/rest/V1/";
const PRODUCT_LIST = "products?" + query;
const CART_LIST = "guest-carts"
const imgPath = "http://magento2.inchoo4u.net/pub/media/catalog/product";

class Home extends Component {

  state = {
    listItems: [],
    cartItems: [],
    cartId: '',
    currentPage: 1,
    totalCount: 1,
    pageSize: 10,
    basePrice: 0,
    baseCurrency: '$',
    isLoading: false,
    isLoadingPage: false
  }
  componentWillMount() {
    
  }
  componentDidMount() {
    FetchProductsList(END_POINT,PRODUCT_LIST,this.handleCatalogProducts);
    FetchCartId(END_POINT,CART_LIST,this.handleCartId);
  }

  formatPrice = (sourcePrice) => {
    return parseFloat(sourcePrice).toFixed(2);
  }

  handleCatalogProducts = (data,totalCount) => {
    this.setState({listItems: data,totalCount: totalCount,isLoadingPage: false})
  }

  handleCartId = (data) => {
    this.setState({cartId: data})
  }

  handleCartItem = (sku,response) => {
    let currentCartState = this.state.cartItems,
        existingCartItemCheck = currentCartState.map(item => item.sku).indexOf(sku),
        updatedCartState = null,
        basePrice = this.state.basePrice,
        updatedCartItem = null,
        updatedPrice = null;
    if(existingCartItemCheck < 0) {
      updatedCartState = currentCartState.concat(response);
      updatedCartItem = updatedCartState.find(item => item.sku === sku);
      updatedPrice = basePrice + updatedCartItem.price;
    } else {
      updatedCartState = this.state.cartItems
      updatedCartState[existingCartItemCheck].qty ++;
      updatedPrice = this.state.basePrice + updatedCartState[existingCartItemCheck].price;
    }
    return this.setState({cartItems: updatedCartState,basePrice: updatedPrice,isLoading: false})
  }

  deleteCartItem = (sku) => {
    const currentCartState = this.state.cartItems;
    let productInCart = currentCartState.map(item => item.item_id).indexOf(sku),
        itemPrice = currentCartState[productInCart].price * currentCartState[productInCart].qty,
        updatedPrice = null,
        updatedCartState = null;
    if(productInCart > -1) {
        currentCartState.splice(productInCart, 1);
        updatedCartState = currentCartState;
        updatedPrice = this.state.basePrice - itemPrice;
    }
    return this.setState({cartData: updatedCartState,basePrice: updatedPrice,isLoading: false});
  }

  addItemToCarthandler = (id,sku) => {
    this.setState({isLoading: true});
    FetchCartItem(id,sku,END_POINT,CART_LIST,this.state.cartId,this.handleCartItem);
  }

  removeItemFromCartHandler = (sku) => {
    this.setState({isLoading: true});
    FetchCartItemDelete(END_POINT,CART_LIST,this.state.cartId,sku,this.deleteCartItem(sku));
  } 
  
  transformItems = (id) => {
    let replacer = this.state.listItems.find((item => item.id === id));
    let moreDeep = replacer.custom_attributes.find((item => item.attribute_code === 'small_image'));    
    return imgPath + moreDeep.value;
  }

  paginationNextpageHandler = (pageNum,pageSize) => {
    let query = {
        searchCriteria: {
            page_size: pageSize,
            current_page: pageNum,
            filter_groups: [
                {
                    filters: [
                        {
                            field: 'category_id',
                            value: '3',
                            condition_type: 'eq'
                        },
                        {
                            field: 'type_id',
                            value: 'simple',
                            condition_type: 'eq'
                        }
                    ]
                }
            ]
        }
    }
    query = stringify(query);
    this.setState({isLoadingPage: true});
    FetchProductsList(END_POINT,"products?" + query,this.handleCatalogProducts);
  }

  render() {


    let paginationCount = Math.ceil(this.state.totalCount / this.state.pageSize),
        pagination = [...Array(paginationCount).keys()],
        finalPagination = pagination.map(a => a+1);

    
    
    return (
        <div className="ui-main">
            <div className="ui-container">
                <h1 className="ui-title ui-title--margin ui-title--border">Our Products</h1>
            </div>
            <div className="ui-container">
                <div className="ui-list__products-container">
                    <div className="ui-pagination">
                    {finalPagination.map((item,i) => {
                        return <Pagination key={i} pageNumber={item} pageSwitch={() => this.paginationNextpageHandler(item,this.state.pageSize)}/>;
                        
                    })}
                    </div>
                    <div className="ui-list__container">
                        {this.state.isLoadingPage ?
                        <Loader />
                        : null
                        }
                        <ul className="ui-list ui-list__products">
                        
                            {this.state.listItems.map((item) => {
                                return <ListItems 
                                key={item.id} 
                                name={item.name}
                                sku={item.sku} 
                                smallimage={this.transformItems(item.id)}
                                currency={this.state.baseCurrency} 
                                price={item.price} 
                                dataid={item.id} 
                                addItemToCart={(event) => this.addItemToCarthandler(item.id,item.sku)} />
                            })}
                        </ul>
                    </div>
                </div>
                <aside className="ui-box ui-sidebar">
                    {this.state.isLoading ?
                    <Loader />
                    : null
                    }
                    {this.state.cartItems.length ?
                        <ul className="ui-list ui-list__cart">
                        {this.state.cartItems.map((item) => {
                        return <CartItems 
                        key={item.item_id} 
                        name={item.name} 
                        price={item.price}
                        currency={this.state.baseCurrency} 
                        qty={item.qty}
                        removeItemFromCart={(event) => this.removeItemFromCartHandler(item.item_id)}/>
                        })} 
                        </ul>
                        : <p className="ui-cart--no-items">There are no items in your shopping cart</p>  
                    }

                    {this.state.cartItems.length ?
                        <p className="ui-grand-total">Subtotal: <span className="price">{this.state.baseCurrency}{Number.parseFloat(this.state.basePrice).toFixed(2)}</span></p>
                        : null
                    }
                </aside>
            </div>
      </div>
    );
  }
}

export default Home;
