const express = require('express');
const model = require('../models/products');
const router = express.Router();

router
    .get('/', (req, res) => {
        const list = model.getProducts();
        const data = {
            data: list,
            total: list.length,
            isSuccess: true
        }
        res.send(data);
    })

    .get('/search/:q', (req, res) => { //searchProducts()
        const term = req.params.q;
        console.log({ term });
        const list = model.searchProducts(list);
        const data = {
            data: list,
            total: list.length,
            isSuccess: true
        }
        res.send(data);
        
    })

    .get('/:id', (req, res) => { //getProductById()
        const id = +req.params.id;
        const product = model.getProductById(id);
        const data = { data: product, isSuccess: true };
        res.send(data)
    })

    .post('/', (req, res) => { //addProduct()
        const product = req.body;

        console.log({ product });
        console.log( req.query );
        console.log( req.params );
        console.log( req.headers );

        model.addProduct(product);
        const data = { data: product, isSuccess: true };
        res.send(data)
    })

    .patch('/:id', (req, res) => { //updateProduct()
        const product = req.body;
        model.updateProduct(product);
        const data = { data: product, isSuccess: true };
        res.send(data)
    })

    .delete('/:id', (req, res) => { //deleteProduct()
        const id = +req.params.id;
        model.deleteProduct(id);
        const data = { data: id, isSuccess: true };
        res.send(data)
    })

module.exports = router;