import React from 'react';
import { Link } from 'react-router-dom';

export default class ProductsLister extends React.Component {
    render(){
        const data = this.props.products.map((product, index) => {
            const _path = `/products/${product.product_type}/${product.id}`;
            return (<>
            {(index > 0 && index % 2 === 0) && <hr className="two-row-divider"/> }
            {(index > 0 && index % 3 === 0) && <hr className="three-row-divider"/> }
            <li key={index} className="product">
                <div className="product-inner">
                    <div className="product-image">
                        <div className="product-image-inner">
                            <Link to={_path}>
                            <img src={`../../img/products/${product.product_type}/${product.img}_small.jpg`}
                            alt={"A preview"} title={product.name} />
                            </Link>
                        </div>
                    </div>
                    <div className="product-name">
                        <Link to={_path}>
                        {product.name}
                        </Link>
                    </div>
                    <ProductRating  rating={product.rating} reviews={product.review_count} />
                    <ProductPrice discount_price={product.discount_price} price={product.price} />
                </div>
            </li>
            </>);
        });

        return (
            <ul className="products-list">
            { data }
            </ul>
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