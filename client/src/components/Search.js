import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchProducts, sortProducts, filterProducts } from '../redux/actions/search-actions';
import ProductsContent from './sub/productsContent';
import '../css/products.css';

class Search extends React.Component {
    //Mount
    componentDidMount(){
        this.props.searchProducts(this.props.match.params.query);
    }

    //Methods
    onSortRequest = e => {
        const sortType = e.target.options[e.target.selectedIndex].value;
        this.props.sortProducts(this.props.searchReducer.products, sortType);
    }

    onFilterRequest = filterSets => {
        this.props.filterProducts(this.props.searchReducer.products, filterSets);
    }

    //Render
    render(){
        const {loading, products, errors } = this.props.searchReducer;

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
                { errors && <div className="main-content-wrapper">
                    <p>Sorry there was an error: { errors }</p>
                </div> }
            </>
        );
    }
}

//REDUX
Search.propTypes = {
    searchProducts: PropTypes.func.isRequired,
    sortProducts: PropTypes.func.isRequired,
    filterProducts: PropTypes.func.isRequired,
    searchReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    searchReducer: state.searchReducer
});

export default connect(mapStateToProps, { searchProducts, sortProducts, filterProducts })(Search);