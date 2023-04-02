const data = require('../data/products.json');

function getProducts() {
    return data.products;
}

function getProductById(id){
    return data.products.find((product) => product.id === id);
}

function addProduct(product){
    product.id = data.products.length + 1;  
    data.products.push(product);
}

function updateProduct(product){
    const index = data.products.findIndex((p) => p.id === product.id);
    data.products[index] = product;
}

function deleteProduct(id){
    const index = data.products.findIndex((p) => p.id === id);
    data.products.splice(index, 1);
}

function searchProducts(searchTerm){
    searchTerm = searchTerm.toLowerCase();
    data.products.filter(p => {
        return p.title.toLowerCase().includes(searchTerm) ||
               p.description.toLowerCase().includes(searchTerm) ||
               p.brand.toLowerCase().includes(searchTerm);
    });
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts
};

