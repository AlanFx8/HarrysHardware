import React from 'react';
import PropTypes from 'prop-types';
import PurchasePreviewModel from './PurchasePreviewModel';
import { ProductRating, ProductPrice } from './sub/productRatingPrice';
import { connect } from 'react-redux';
import { getProductInfo } from '../redux/actions/product-info-actions';
import { addToCart } from '../redux/actions/cart-actions';
import '../css/product-info.css';

///THE PRODUCT INFO CLASS///
class ProductInfo extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            qty: 1,
            qty_min: 1,
            qty_max: 20,
            openModel: false
        }
    }

    componentDidMount(){
        this.props.getProductInfo(this.props.match.params.id);
    }

    onQtyChange = e => {
        let val = e.target.value;
        if (val < this.state.qty_min){
            val = this.state.qty_min;
        }
        if (val > this.state.qty_max){
            val = this.state.qty_max;
        }
        this.setState({qty: val});
    }

    onQtyDecrease = () => {
        if (this.state.qty > this.state.qty_min){
            this.setState({qty: parseInt(this.state.qty)-1});
        }
    }

    onQtyIncrease = () => {
        if (this.state.qty < this.state.qty_max){
            this.setState({qty: parseInt(this.state.qty)+1});
        }
    }

    onAddToCart = () => {
        this.props.addToCart(this.props.match.params.id, this.state.qty)
        .then(() => {
            this.setState({openModel: true});
        });
    }

    //Checkout methods
    onGoBack = () => {
        this.setState({openModel: false});
    }

    onGoToCart = () => {
        this.props.history.push("/cart");
    }

    //Render
    render(){
        const {loading, product, error } = this.props.productInfoReducer;

        return (
            <>
                { loading && <div className="main-content-wrapper">
                    <p>Loading Items</p>
                </div> }
                { product && 
                    <ProductInfoContent
                        product={ product }
                        qty={ this.state.qty }
                        qty_min={ this.state.qty_min }
                        qty_max={ this.state.qty_max }
                        onQtyChange = { this.onQtyChange }
                        onQtyDecrease = { this.onQtyDecrease }
                        onQtyIncrease = { this.onQtyIncrease }
                        onAddToCart = { this.onAddToCart }
                    /> }
                { this.state.openModel &&
                    <PurchasePreviewModel
                        product={ product }
                        qty={ this.state.qty }
                        onGoBack={ this.onGoBack }
                        onGoToCart={ this.onGoToCart }
                    /> }
                { error && <div className="main-content-wrapper">
                    <p>Sorry there was an error: { error }</p>
                </div> }
            </>
        );
    }
}

///THE PRODUCT INFO CONTENT PAGE///
class ProductInfoContent extends React.Component {
    render(){
        const { product } = this.props;

        return(
            <div className="main-content-wrapper">
                <div id="product-info">
                    <div className="product-info-image">
                        <img src={`../../img/products/${product.product_type}/${product.img}.jpg`}
                                alt={"A preview"} title={product.name} />
                    </div>

                    <div className="product-info-details">
                        <h1 className="name">{ product.name }</h1>
                        <p className="item-id">Item no. {product.id}</p>
                        <ProductRating  rating={product.rating} reviews={product.review_count} />
                        <ProductPrice discount_price={product.discount_price} price={product.price} />
                    </div>

                    <div className="product-info-actions">
                        <div className="qty-handler">
                            <button
                                type="button"
                                onClick={this.props.onQtyDecrease}
                                id="decrease-button"
                            >
                                {'-'}
                            </button>
                            <input
                                type="number"
                                value={ this.props.qty }
                                min={ this.props.qty_min }
                                max={ this.props.qty_max }
                                onChange={ this.props.onQtyChange }
                            />
                            <button
                                type="button"
                                onClick={this.props.onQtyIncrease}
                                id="increase-button"
                            >
                                {'+'}
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={ this.props.onAddToCart }
                            className="cart-checkout-btn info-page"
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

//REDUX
ProductInfo.propTypes = {
    getProductInfo: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    productInfoReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    productInfoReducer: state.productInfoReducer
});

export default connect(mapStateToProps, { getProductInfo, addToCart } )(ProductInfo);