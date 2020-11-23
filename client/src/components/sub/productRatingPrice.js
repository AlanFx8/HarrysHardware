///Builds the rating and price parts of the Product Lister and Product Info pages
import React from 'react';

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

export { ProductRating, ProductPrice }