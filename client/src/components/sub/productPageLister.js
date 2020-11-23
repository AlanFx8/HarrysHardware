import React from 'react';
import { Link } from 'react-router-dom';
import { ProductRating, ProductPrice } from './productRatingPrice';

//The ProductPageLister class
//It is used by the Products and ProductsType page to list all the products
export default class ProductPageLister extends React.Component {
    render(){
        let rowCounter = 0; //We have to use this instead of index
        const data = this.props.products.map((product, index) => {
            const linkPath = `/products/${product.product_type}/${product.id}`;

            if (product.hidden_by_filter)
                return null;

            rowCounter++;
            return (<>
            {(rowCounter > 1 && (rowCounter-1) % 2 === 0) && <hr className="two-row-divider"/> }
            {(rowCounter > 1 && (rowCounter-1) % 3 === 0) && <hr className="three-row-divider"/> }
            <li key={index} className="product">
                <div className="product-inner">
                    <div className="product-image">
                        <div className="product-image-inner">
                            <Link to={linkPath}>
                            <img src={`../../img/products/${product.product_type}/${product.img}_small.jpg`}
                            alt={"A preview"} title={product.name} />
                            </Link>
                        </div>
                    </div>
                    <div className="product-name">
                        <Link to={linkPath}>
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