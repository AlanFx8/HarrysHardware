import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listProducts, sortProducts } from '../redux/actions/products-actions';
import ProductsLister from './sub/products_components';
import ProductsMenu from './sub/products_menu';
import '../css/products.css';

//PRODUCTS CLASS
class Products extends React.Component {
    //Mount
    componentDidMount(){
        this.props.listProducts();
    }

    //Methods
    onSortRequest = e => {
        const sortType = e.target.options[e.target.selectedIndex].value;
        this.props.sortProducts(this.props.productsReducer.products, sortType);;
    }

    //Render
    render(){
        const {loading, products, errors } = this.props.productsReducer;

        return (
            <div>
                { loading && <div>Loading Items</div> }
                { products && <ProductsContent products={ products } onSortRequest={this.onSortRequest} /> }
                { errors && <div>Sorry there was an error: { errors }</div> }
            </div>
        );
    }
}

class ProductsContent extends React.Component {
    render(){
        return(
            <div className="products-page-wrapper">
                <ProductsMenu itemCount={this.props.products.length} onSortRequest={this.props.onSortRequest} />
                <ProductsLister products = { this.props.products} />
            </div>
        );
    }
}

//REDUX
Products.propTypes = {
    listProducts: PropTypes.func.isRequired,
    sortProducts: PropTypes.func.isRequired,
    productsReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    productsReducer: state.productsReducer
});

export default connect(mapStateToProps, { listProducts, sortProducts })(Products);