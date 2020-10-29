import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listProducts, sortProducts, filterProducts } from '../redux/actions/products-actions';
import ProductPageMenu from './sub/productPageMenu';
import ProductPageFilter from './sub/productPageFilter';
import ProductPageLister from './sub/productPageLister';
import '../css/products.css';

//This page will list every product
class Products extends React.Component {
    //Mount
    componentDidMount(){
        this.props.listProducts();
    }

    //Methods
    onSortRequest = e => {
        const sortType = e.target.options[e.target.selectedIndex].value;
        this.props.sortProducts(this.props.productsReducer.products, sortType);
    }

    onFilterRequest = filterSets => {
        this.props.filterProducts(this.props.productsReducer.products, filterSets);
    }

    //Render
    render(){
        const {loading, products, errors } = this.props.productsReducer;

        return (
            <>
                { loading && <div>Loading Items</div> }
                { products && <ProductsContent
                    products={ products }
                    onSortRequest={this.onSortRequest}
                    onFilterRequest={this.onFilterRequest}
                /> }
                { errors && <div>Sorry there was an error: { errors }</div> }
            </>
        );
    }
}

class ProductsContent extends React.Component {
    render(){
        return(
            <div className="main-content-wrapper">
                <ProductPageMenu
                    itemCount={this.props.products.length}
                    onSortRequest={this.props.onSortRequest}
                />
                <div className="products-content-wrapper">
                    <ProductPageFilter
                        products= { this.props.products }
                        onFilterRequest= { this.props.onFilterRequest}
                    />
                    <ProductPageLister products = { this.props.products} />
                </div>
            </div>
        );
    }
}

//REDUX
Products.propTypes = {
    listProducts: PropTypes.func.isRequired,
    sortProducts: PropTypes.func.isRequired,
    filterProducts: PropTypes.func.isRequired,
    filterProductsX: PropTypes.func.isRequired,
    productsReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    productsReducer: state.productsReducer
});

export default connect(mapStateToProps, { listProducts, sortProducts, filterProducts })(Products);