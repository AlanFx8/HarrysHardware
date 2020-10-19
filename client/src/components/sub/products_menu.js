import React from 'react';
import { Link } from 'react-router-dom';
import './../../css/products-menu.css';

export default class ProjectsMenu extends React.Component {
    render(){
        return(
            <div className="products-menu" >
                <div className="products-menu-nav"><Link to='/'>Home</Link> {'>'} Products</div>
                <div className="products-menu-content">
                    <h1 className="products-menu-results">All Products ({this.props.itemCount} items found)</h1>
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