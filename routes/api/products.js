//This is the route to get ALL products
const express = require('express');
const router = express.Router();

const products = require('../../database');

router.get("/", (req, res) => {
    res.send(products);
});

module.exports = router;