import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cart-actions';

///THE CART PAGE///
class Cart extends React.Component {
    componentDidMount(){
        const id = this.props.match.params.id;
        const qty = this.props.location.search? Number(this.props.location.search.split("=")[1]):1;
        this.props.addToCart(id, qty);
    }

    render(){
        const { cartItems } = this.props.cartReducer;
        const data = cartItems.map((item, index) => {
            return <div key={index}>
                <p>ID: { item.id }</p>
                <p>Qty: { item.qty }</p>
            </div>
        })

        return <div className="main-content-wrapper">{ data } </div>
    }
}

//REDUX
Cart.propTypes = {
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    cartReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    cartReducer: state.cartReducer
});

export default connect(mapStateToProps, { addToCart, removeFromCart })(Cart);