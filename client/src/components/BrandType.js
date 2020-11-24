import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    listProducts,
    sortProducts,
    filterProducts,
    resetProducts
} from '../redux/actions/brand-actions';
import ProductsContent from './sub/productsContent';
import '../css/products.css';

class BrandType extends React.Component {
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
        this.props.listProducts(this.props.match.params.type)
        .then(() => {
            const { products } = this.props.brandReducer;
            this.setState({
                navData: {
                    query: null,
                    type: products[0].brand_name
                }
            })
        });
    }

    //Methods
    onSortRequest = e => {
        const sortType = e.target.options[e.target.selectedIndex].value;
        this.props.sortProducts(this.props.brandReducer.products, sortType);
    }

    onFilterRequest = filterSets => {
        this.props.filterProducts(this.props.brandReducer.products, filterSets);
    }

    onResetRequest = () => {
        this.props.resetProducts(this.props.brandReducer.products);
    }

    getSubType = type => {
        return type;
    }

    //Render
    render(){
        const {loading, products, error } = this.props.brandReducer;

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

///REDUX///
BrandType.propTypes = {
    listProducts: PropTypes.func.isRequired,
    sortProducts: PropTypes.func.isRequired,
    filterProducts: PropTypes.func.isRequired,
    resetProducts: PropTypes.func.isRequired,
    brandReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    brandReducer: state.brandReducer
});

export default connect(mapStateToProps,
    { listProducts, sortProducts, filterProducts, resetProducts }
)(BrandType);