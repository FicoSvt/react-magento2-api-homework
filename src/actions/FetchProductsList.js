const FetchProductList = (endpoint,productlist,handleCatalogProducts) => {
    fetch(endpoint + productlist)
    .then(response => response.json()) 
    .then(data => handleCatalogProducts(data.items,data.total_count));
}

export default FetchProductList;