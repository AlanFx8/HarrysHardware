import React from 'react';
import ProductPageMenu from './productPageMenu';
import ProductPageFilter from './productPageFilter';
import ProductPageLister from './productPageLister';

export default class ProductsContent extends React.Component {
    render(){
        return(
            <div className="main-content-wrapper">
                <ProductPageMenu
                    itemCount={this.props.products.length}
                    onSortRequest={this.props.onSortRequest}
                />
                <div className="products-content-wrapper">
                    <ProductPageFilter
                        products= { this.props.products }
                        onFilterRequest= { this.props.onFilterRequest}
                    />
                    <ProductPageLister products = { this.props.products} />
                </div>
            </div>
        );
    }
}