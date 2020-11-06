import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listProducts, sortProducts, filterProducts } from '../redux/actions/products-actions';
import ProductsContent from './sub/productsContent';
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
        const {loading, products, error } = this.props.productsReducer;

        return (
            <>
                { loading && <div className="main-content-wrapper">
                    <p>Loading Items</p>
                </div> }
                { products && <ProductsContent
                    products={ products }
                    onSortRequest={this.onSortRequest}
                    onFilterRequest={this.onFilterRequest}
                /> }
                { error && <div className="main-content-wrapper">
                    <p>Sorry there was an error: { error }</p>
                </div> }
            </>
        );
    }
}

//REDUX
Products.propTypes = {
    listProducts: PropTypes.func.isRequired,
    sortProducts: PropTypes.func.isRequired,
    filterProducts: PropTypes.func.isRequired,
    productsReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    productsReducer: state.productsReducer
});

export default connect(mapStateToProps, { listProducts, sortProducts, filterProducts })(Products);