const FetchCartId = (endpoint,cartlist,handleCartId) => {
    fetch(endpoint + cartlist, {
        method: 'POST'
      })
      .then(response => response.json()) 
      .then(data => handleCartId(data));
}

export default FetchCartId;