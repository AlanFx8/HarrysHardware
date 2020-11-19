import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cart-actions';
import Util from '../classes/Util';
import '../css/cart.css';

///THE CART PAGE///
class Cart extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            id: this.props.match.params.id,
            qty: this.props.location.search? Number(this.props.location.search.split("=")[1]):1,
            qty_min: 1,
            qty_max: 20,
            util: new Util()
        }
    }

    componentDidMount(){
        this.props.addToCart(this.state.id, this.state.qty);
    }

    //Methods
    onQtyChange = (id, e) => {
        if (isNaN(e.target.value))
            return;
        this.props.addToCart(id, e.target.value);
    }

    onQtyDecrease = id => {
        const product = this.props.cartReducer.cartItems.find(x => x.id === id);
        if (!product) return;
        if (product.qty > this.state.qty_min){
            this.props.addToCart(id, product.qty-1);
        }
    }

    onQtyIncrease = id => {
        const product = this.props.cartReducer.cartItems.find(x => x.id === id);
        if (!product) return;
        if (product.qty < this.state.qty_max){
            this.props.addToCart(id, product.qty+1);
        }
    }

    onRemoveItem = id => {
        const product = this.props.cartReducer.cartItems.find(x => x.id === id);
        if (!product) return;
        this.props.removeFromCart(product.id);
    }

    //Render
    render(){
        const { cartItems } = this.props.cartReducer;
        const products = cartItems.map((item, index) => {
            return <CartItemBuilder
                product={ item }
                index={ index }
                key={ index }
                util={ this.state.util }
                qty_min={ this.state.qty_min }
                qty_max={ this.state.qty_max }
                onQtyChange={ this.onQtyChange }
                onQtyDecrease={ this.onQtyDecrease }
                onQtyIncrease={ this.onQtyIncrease }
                onRemoveItem={ this.onRemoveItem }
            />
        });
        
        return (<div className="main-content-wrapper">
            <div id="cart">
                <div className="cart-header">
                    The Header
                </div>

                <div className="cart-body">
                    <div className="purchase-headings">
                        <div>Product</div>
                        <div>Quantity</div>
                        <div>Prices</div>
                    </div>
                    <ul className="purchases">
                        {products}
                    </ul>
                </div>

                <div className="cart-footer">
                    The Footer
                </div>
            </div>
        </div>);
    }
}

///SUB-CLASSES///
class CartItemBuilder extends React.Component {
    render(){
        const { product, index } = this.props;
        const { id, qty } = product;

        return <li className="purchase" key={index}>
                <section className="purchase-product">
                    <img src={`../../img/products/${product.product_type}/${product.img}_small.jpg`}
                            alt={"A preview"} title={product.name} />
                    <div className="info">
                        <span className="name">{product.name}</span>
                        <span className="id">Item no. {product.id}</span>
                    </div>
                </section>

                <section className="purchase-quantity">
                    <div className="qty-handler">
                        <button
                            type="button"
                            onClick={ () => this.props.onQtyDecrease(id) }
                            id="decrease-button"
                        >
                            {'-'}
                        </button>
                        <input
                            type="number"
                            value={ qty }
                            min={ this.props.qty_min }
                            max={ this.props.qty_max }
                            onChange={ e => this.props.onQtyChange(id, e) }
                        />
                        <button
                            type="button"
                            onClick={ () => this.props.onQtyIncrease(id) }
                            id="increase-button"
                        >
                            {'+'}
                        </button>
                    </div>
                    <div className="remove-handler">
                        <button
                            type="button"
                            onClick={() => this.props.onRemoveItem(id)}
                        >
                            Remove from cart
                        </button>
                    </div>
                </section>

                <section className="purchase-prices">
                    <span>
                        Each Price: ${(product.discount_price)?product.discount_price:product.price}
                    </span>
                    <span>
                        Total price: ${this.props.util.GetTotalCost((product.discount_price)?
                        product.discount_price:product.price, product.qty)}
                    </span>
                </section>
            </li>
    }
}

///REDUX///
Cart.propTypes = {
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    cartReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    cartReducer : state.cartReducer
});

export default connect(mapStateToProps, { addToCart, removeFromCart })(Cart);