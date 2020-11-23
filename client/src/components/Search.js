import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchProducts, sortSearchProducts, filterSearchProducts, resetSearchProducts }
from '../redux/actions/search-actions';
import ProductsContent from './sub/productsContent';
import '../css/products.css';

class Search extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            navData: {
                query: `Search for "${this.props.match.params.query}"`,
                type: null
            }
        }
    }
    //Mount
    componentDidMount(){
        this.props.searchProducts(this.props.match.params.query);
    }

    //Methods
    onSortRequest = e => {
        const sortType = e.target.options[e.target.selectedIndex].value;
        this.props.sortSearchProducts(this.props.searchReducer.products, sortType);
    }

    onFilterRequest = filterSets => {
        this.props.filterSearchProducts(this.props.searchReducer.products, filterSets);
    }

    onResetRequest = () => {
        this.props.resetSearchProducts(this.props.searchReducer.products);
    }

    //Render
    render(){
        const {loading, products, error } = this.props.searchReducer;

        return (
            <>
                { loading && <div className="main-content-wrapper">
                    <p>Loading Items</p>
                </div> }
                { products && <ProductsContent
                    products={ products }
                    onSortRequest={this.onSortRequest}
                    onFilterRequest={this.onFilterRequest}
                    onResetRequest = { this.onResetRequest }
                    navData = {this.state.navData}
                /> }
                { error && <div className="main-content-wrapper">
                    <p>Sorry there was an error: { error }</p>
                </div> }
            </>
        );
    }
}

//REDUX
Search.propTypes = {
    searchProducts: PropTypes.func.isRequired,
    sortSearchProducts: PropTypes.func.isRequired,
    filterSearchProducts: PropTypes.func.isRequired,
    resetSearchProducts: PropTypes.func.isRequired,
    searchReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    searchReducer: state.searchReducer
});

export default connect(mapStateToProps,
    { searchProducts, sortSearchProducts, filterSearchProducts, resetSearchProducts }
)(Search);