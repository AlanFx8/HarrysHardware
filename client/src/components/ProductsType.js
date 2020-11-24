import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    listProductTypes,
    sortProductTypes,
    filterProductTypes,
    resetProductTypes
} from '../redux/actions/product-sub-actions';
import ProductsContent from './sub/productsContent';
import '../css/products.css';

//The ProductsType component lists all products of a certain product_type (drills, lawnmowers, etc.)
class ProductsType extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            navData: {
                query: null,
                type: this.getSubType(this.props.match.params.type)
            }
        }
    }

    //Mount
    componentDidMount(){
        this.props.listProductTypes(this.props.match.params.type);
    }

    //Methods
    onSortRequest = e => {
        const sortType = e.target.options[e.target.selectedIndex].value;
        this.props.sortProductTypes(this.props.productTypesReducer.products, sortType);
    }

    onFilterRequest = filterSets => {
        this.props.filterProductTypes(this.props.productTypesReducer.products, filterSets);
    }

    onResetRequest = () => {
        this.props.resetProductTypes(this.props.productTypesReducer.products);
    }

    getSubType = type => {
        if (type === 'powerdrills'){
            return 'Power Drills';
        }

        if (type === 'lawnmowers'){
            return 'Lawn Mowers';
        }

        if (type === 'snowblowers'){
            return 'Snow Blowers';
        }

        if (type === 'grills'){
            return 'Grills';
        }

        if (type === 'chainsaws'){
            return 'Chainsaws';
        }

        return "Null";
    }

    //Render
    render(){
        const {loading, products, error } = this.props.productTypesReducer;

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
ProductsType.propTypes = {
    listProductTypes: PropTypes.func.isRequired,
    sortProductTypes: PropTypes.func.isRequired,
    filterProductTypes: PropTypes.func.isRequired,
    resetProductTypes: PropTypes.func.isRequired,
    productTypesReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    productTypesReducer: state.productTypesReducer
});

export default connect(mapStateToProps,
    { listProductTypes, sortProductTypes, filterProductTypes, resetProductTypes }
)(ProductsType);