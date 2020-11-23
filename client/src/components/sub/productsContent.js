import React from 'react';
import ProductPageMenu from './productPageMenu';
import ProductPageFilter from './productPageFilter';
import ProductPageLister from './productPageLister';

export default class ProductsContent extends React.Component {
    allProductsHidden = products => {
        for (let x = 0; x < products.length; x++){
            if (!products[x].hidden_by_filter){
                return false;
            }
        }
        return true;
    }

    render(){
        return(
            <div className="main-content-wrapper">
                <ProductPageMenu
                    navData = { this.props.navData }
                    itemCount={this.props.products.length}
                    onSortRequest={this.props.onSortRequest}
                />
                <div className="products-content-wrapper">
                    <ProductPageFilter
                        products= { this.props.products }
                        onFilterRequest= { this.props.onFilterRequest}
                        onResetRequest= { this.props.onResetRequest }
                    />
                    { this.allProductsHidden(this.props.products) &&
                        <div>
                            Sorry, your filter query returned no results.
                        </div> }
                    <ProductPageLister products = { this.props.products} />
                </div>
            </div>
        );
    }
}