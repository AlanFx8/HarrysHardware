const express = require('express');
const path = require('path');
const productsRoute = require('./routes/api/products.js');

//App
const app = express();

//Body-parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Set Routes
app.use('/api/products', productsRoute);

//Set default to build
if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Open server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port: ${port}`));