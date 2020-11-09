import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProductInfo } from '../redux/actions/product-info-actions';
import '../css/product-info.css';

///THE PRODUCT INFO CLASS///
class ProductInfo extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            qty: 1,
            qty_min: 1,
            qty_max: 20
        }
    }

    componentDidMount(){
        this.props.getProductInfo(this.props.match.params.id);
    }

    onQtyChange = e => {
        this.setState({qty: e.target.value});
    }

    onQtyDecrease = () => {
        if (this.state.qty > this.state.qty_min){
            this.setState({qty: this.state.qty-1});
        }
    }

    onQtyIncrease = () => {
        if (this.state.qty < this.state.qty_max){
            this.setState({qty: this.state.qty+1});
        }
    }

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
                        <button type="button" id="cart-button">Add To Cart</button>
                    </div>
                </div>
            </div>
        );
    }
}

///HELPER CLASSES///
class ProductRating extends React.Component {
    render(){
        const _rating = this.props.rating * 10;
        const _ratingPercentage = (_rating / 50) * 100;
        const _styleString = {width: `${_ratingPercentage}%`};
        return (
            <div className="product-reviews">
                <span className="product-rating-background">
                    <span className="product-rating" style={_styleString} />
                </span>
                <span className="product-review-count">
                    ({this.props.reviews} reviews)
                </span>
            </div>
        )
    }
}

class ProductPrice extends React.Component {
    render(){
        const { discount_price, price } = this.props;
        return(
            <div className="product-price">
                {discount_price && <span className="product-price-current">
                    ${discount_price}
                </span>}
                <span className={(discount_price)?'product-price-old':'product-price-current'} >
                    ${price}
                </span>
            </div>
        );
    }
}

//REDUX
ProductInfo.propTypes = {
    getProductInfo: PropTypes.func.isRequired,
    productInfoReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    productInfoReducer: state.productInfoReducer
});

export default connect(mapStateToProps, { getProductInfo } )(ProductInfo);