const FetchCartItem = (id,sku,endpoint,cartlist,cartId,handleCartItem) => {
    fetch(endpoint + cartlist + '/' + cartId + '/items', {
        method: 'POST',
        body: JSON.stringify({cartItem: {quoteId: cartId,sku: sku, qty:1}}),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(response => response.json()) 
      .then(data => handleCartItem(sku,data));
}

export default FetchCartItem;