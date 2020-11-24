//This is the route to get ALL products
const express = require('express');
const router = express.Router();

const products = require('../../database');

router.get("/", (req, res) => {
    res.send(products);
});

router.get("/brand/:type", (req, res) => {
    const type = req.params.type;
    const filteredProducts = [];

    for (let x = 0; x < products.length; x++){
        if (products[x].brand.trim().toLocaleLowerCase() === type.trim().toLocaleLowerCase()){
            filteredProducts.push(products[x]);
        }
    }

    res.send(filteredProducts)
});

router.get("/:type", (req, res) => {
    const type = req.params.type;
    const filteredProducts = [];

    for (let x = 0; x < products.length; x++){
        if (products[x].product_type === type){
            filteredProducts.push(products[x]);
        }
    }

    res.send(filteredProducts)
});

router.get("/:type/:id", (req, res) => {
    const id = req.params.id;
    const items = products.filter(x => x.id.toString() === id.toString());
    const data = (items.length > 0)?items[0]:null;
    res.send(data);
});

module.exports = router;