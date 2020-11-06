import React from 'react';
import { Link } from 'react-router-dom';

//The ProductPagwMenu class
//It is used by the Products and ProductsType page to list the sub-menu, and sort options
export default class ProductPageMenu extends React.Component {
    render(){
        return(
            <div className="products-menu" >
                <HeaderNavBuilder navData={ this.props.navData } />
                <div className="products-menu-content">
                    <MenuResultsBuilder itemCount={this.props.itemCount} navData={this.props.navData} />
                    <div className="products-menu-sort-options">Sort by 
                        <select className="sort-products-select" onChange={this.props.onSortRequest}>
                            <option value="R">Recommended</option>
                            <option value="T">Top Rated</option>
                            <option value="Low-High">Price: Low to High</option>
                            <option value="High-Low">Price: High to Low</option>
                            <option value="A-Z">Alphabetical: A-Z</option>
                            <option value="Z-A">Alphabetical: Z-A</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

///SUB-CLASSES///
class HeaderNavBuilder extends React.Component {
    render(){
        const { navData } = this.props;

        return (
            <div className="products-menu-nav">
                {navData.query && <SearchHeader query={navData.query} />}
                {navData.type && <TypeHeader type={navData.type} />}
                {(!navData.query && !navData.type) && <BasicHeader /> }
            </div>
        );
    }
}

class MenuResultsBuilder extends React.Component {
    getCatagory = navData => {
        return (navData.query)?navData.query:(navData.type)?navData.type:'All Products';
    }

    render(){
        return(
            <h1 className="products-menu-results">
                {this.getCatagory(this.props.navData)} ({this.props.itemCount} items found)
            </h1>
        );
    }
}

//HELPERS///
class SearchHeader extends React.Component {
    render(){
        return (<>
            <Link to='/'>Home</Link> {'>'} {this.props.query}
        </>);
    }
}

class TypeHeader extends React.Component {
    render(){
        return (<>
            <Link to='/'>Home</Link> {'>'} <Link to='/products'>Products</Link> {'>'} {this.props.type}
        </>);
    }
}

class BasicHeader extends React.Component {
    render(){
        return (<>
            <Link to='/'>Home</Link> {'>'} Products
        </>);
    }
}