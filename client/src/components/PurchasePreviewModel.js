import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Util from '../classes/Util';
import '../css/purchase-preview-model.css';

class PurchasePreviewModel extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            util: new Util()
        }
    }

    componentDidMount(){
        window.addEventListener('keyup', this.onKeyInput, false);
    }

    componentWillUnmount(){
        window.removeEventListener('keyup', this.onKeyInput, false);
    }

    onKeyInput = e => {
        if (e.keyCode === 27){
            this.props.onGoBack();
        }
    }

    onClickEvent = e => {
        if (e.target.id === "purchase-preview-model")
            this.props.onGoBack();
    }

    render(){
        const { product } = this.props;
        const { cartItems } = this.props.cartReducer;

        return <div id="purchase-preview-model" onClick={ this.onClickEvent }>
            <div id="purchase-preview-panel">
                <div className="purchase-preview-header">
                    <div className="header-title">
                        <FontAwesomeIcon icon={['fas', 'shopping-cart']} className="cart-icon" />
                        <h2>Added to Your Cart</h2>
                    </div>
                    <div className="close-btn" onClick={ this.props.onGoBack }>
                        <FontAwesomeIcon icon={['fas', 'times']}  />
                    </div>
                </div>

                <div className="purchase-preview-body">
                    <div className="preview-body-img">
                        <img
                            src={`../../img/products/${product.product_type}/${product.img}.jpg`}
                            alt={"A preview"} title={product.name}
                        />
                    </div>
                    <div className="preview-body-info">
                        <h2>{product.name}</h2>
                        <span className="price">${product.discount_price || product.price}</span>
                        <span>Qty: {this.props.qty}</span>
                    </div>
                    <div className="preview-body-total">
                        <div>
                            Total Items in Cart: {this.state.util.GetTotalItems(cartItems)}
                        </div>
                        <div>
                            Subtotal: ${this.state.util.GetFullOrder(cartItems)}
                        </div>
                    </div>
                </div>

                <div className="purchase-preview-footer">
                    <button
                        type="button"
                        className="continue-shopping-btn"
                        onClick={ this.props.onGoBack }
                    >
                        Continue Shoping
                    </button>
                    <button
                        type="button"
                        className="cart-checkout-btn"
                        onClick={ this.props.onGoToCart }
                    >
                        Go To Cart
                    </button>
                </div>
            </div>
        </div>
    }
}

//REDUX
PurchasePreviewModel.propTypes = {
    cartReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    cartReducer: state.cartReducer
});

export default connect(mapStateToProps, {} )(PurchasePreviewModel);