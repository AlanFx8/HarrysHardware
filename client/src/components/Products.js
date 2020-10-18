import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listProducts } from '../redux/actions/products-actions';
import ProductsLister from './sub/products_components';
import ProductsMenu from './sub/products_menu';
import '../css/products.css';

//PRODUCTS CLASS
class Products extends React.Component {
    //Mount
    componentDidMount(){
        this.props.listProducts();
    }

    //Render
    render(){
        const {loading, products, errors } = this.props.productsReducer;

        return (
            <div>
                { loading && <div>Loading Items</div> }
                { products && <ProductsContent products={ products } /> }
                { errors && <div>Sorry there was an error: { errors }</div> }
            </div>
        );
    }
}

class ProductsContent extends React.Component {
    render(){
        return(
            <div className="products-page-wrapper">
                <ProductsMenu />
                <ProductsLister products = { this.props.products}  />
            </div>
        );
    }
}

//REDUX
Products.propTypes = {
	listProducts: PropTypes.func.isRequired,
    productsReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    productsReducer: state.productsReducer
});

export default connect(mapStateToProps, { listProducts })(Products);