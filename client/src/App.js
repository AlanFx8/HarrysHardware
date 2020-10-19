import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Products from './components/Products';
import ProductsType from './components/ProductsType';
import ProductInfo from './components/ProductInfo';
import Footer from './components/Footer';
import ScrollButton from './components/ScrollButton';
import Error from './components/Error';
import './css/reset.css';
import './css/app.css';

//The App class
function App() {
  return (
    <Router>
      <Header />
      <div id="main-content">
        <Switch>
        <Route path="/" exact component={ Home } />
        <Route path="/products/" exact component={ Products } />
        <Route path="/products/:type" exact component={ ProductsType } />
        <Route path="/products/:type/:id" exact component={ ProductInfo } />
        <Route component={ Error } />
        </Switch>
      </div>
      <Footer />
      <ScrollButton />
    </Router>
  );
}

export default App;