const FetchCartItemDelete = (endpoint,cartlist,cartId,sku,deleteCartItem) => {
    fetch(endpoint + cartlist + '/' + cartId + '/items/' + sku, {
        method: 'DELETE'
      })
      .then(response => response.json()) 
      .then(deleteCartItem);
}

export default FetchCartItemDelete;