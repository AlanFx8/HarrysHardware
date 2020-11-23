import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCartItems } from '../redux/actions/cart-actions';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Util from '../classes/Util';

class HeaderCart extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            util: new Util()
        }
    }

    componentDidMount(){
        window.addEventListener('onCartChange', this.onCartChange, false);
        this.props.loadCartItems()
        .then(() => {
            const { cartItems } = this.props.cartReducer;
            this.setState({
                totalItems: this.state.util.GetTotalItems(cartItems),
                totalOrder: this.state.util.GetFullOrder(cartItems)
            });
        });
    }

    componentWillUnmount(){
        window.removeEventListener('onCartChange', this.onCartChange, false);
    }

    onCartChange = () => {
        this.props.loadCartItems()
        .then(() => {
            const { cartItems } = this.props.cartReducer;
            this.setState({
                totalItems: this.state.util.GetTotalItems(cartItems),
                totalOrder: this.state.util.GetFullOrder(cartItems)
            });
        });
    }

    render(){
        const { cartItems } = this.props.cartReducer;

        return (<div className="header-cart">
            <Link to="/cart">
                <FontAwesomeIcon icon={['fas', 'shopping-cart']} className="cart-icon" />
                <div className="cart-header-info">
                    {cartItems.length === 0 && 
                        <p>
                            Empty <br/>
                            Cart
                        </p >
                    }
                    {cartItems.length > 0 &&
                        <p>
                            {this.state.totalItems} Item(s) <br/>
                            ${this.state.totalOrder}
                        </p>
                    }
                </div>
            </Link>
        </div>)
    }
}

///REDUX///
HeaderCart.propTypes = {
    loadCartItems: PropTypes.func.isRequired,
    cartReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    cartReducer : state.cartReducer
});

export default connect(mapStateToProps, { loadCartItems})(HeaderCart);