import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listProducts } from '../redux/actions/products-actions';
import { Link } from 'react-router-dom';
import '../css/home.css';

class Home extends React.Component {
    componentDidMount(){
        this.props.listProducts();
    }

    render(){
        const { loading, products } = this.props.productsReducer;
        return (
            <div className="main-content-wrapper">
                { loading &&
                    <div>
                        <p>Loading...</p>
                    </div>
                }
                { products &&
                    <div id="home">
                        <div className="intro-text">
                            Welcome to Harry's Hardware. Harry's Hardware is a portfolio site made by Alan Mark Freeman using the MERN stack and React Redux. You can browse all products or browse projucts by departments or with a search query. You can also sort and filter products, as well as add them to a basket/cart.
                        </div>

                        <section className="home-nav-section">
                            <h1 className="section-heading">Start By...</h1>
                            <div className="home-nav-btn-group">
                                <Link to="/products" className="home-nav-btn">
                                    Browse All Products ({products.length} items)
                                </Link>
                            </div>
                        </section>

                        <section className="home-nav-section">
                            <h1 className="section-heading">Or... Browse by Departments</h1>
                            <DepartmentLinksBuilder products={ products } />
                        </section>

                        <section className="home-nav-section">
                            <h1 className="section-heading">Or... Browse by Brands</h1>
                            <BrandLinksBuilder products={ products } />
                        </section>
                    </div>
                }
            </div>
        );
    }
}

///SUB-CLASSESS///
class DepartmentLinksBuilder extends React.Component {
    buildLinks = () => {
        const { products } = this.props;
        const objs = [];

        for (let x = 0; x < products.length; x++){
            const product_type = products[x].product_type;
            const dup = objs.find(x => x.name === product_type);
            if (!dup){
                objs.push({
                    name: product_type,
                    qty: 1
                });
            }
            else {
                dup.qty += 1;
            }
        }

        return objs;
    }

    render(){
        const objs = this.buildLinks();
        const buttons = objs.map((item, index) => {
            const link = `/products/${item.name}`;
            let name = item.name.replace("_", " ");
            name = name.charAt(0).toUpperCase() + name.slice(1);
            return <Link to={link} key={index} className="home-nav-btn">
                {name} ({item.qty} items)
            </Link>
        });

        return(
            <div className="home-nav-btn-group">
                {buttons}
            </div>
        );
    }
}

class BrandLinksBuilder extends React.Component {
    buildLinks = () => {
        const { products } = this.props;
        const objs = [];

        for (let x = 0; x < products.length; x++){
            const brand = products[x].brand;
            const dup = objs.find(x => x.name === brand);
            if (!dup){
                objs.push({
                    name: brand,
                    brand_name: products[x].brand_name,
                    qty: 1
                });
            }
            else {
                dup.qty += 1;
            }
        }

        return objs;
    }

    render(){
        const objs = this.buildLinks();
        const buttons = objs.map((item, index) => {
            const link = `/brand/${item.name}`;
            let name = item.brand_name;
            return <Link to={link} key={index} className="home-nav-btn">
                {name} ({item.qty} items)
            </Link>
        });

        return(
            <div className="home-nav-btn-group">
                {buttons}
            </div>
        );
    }
}

///REDUX///
Home.propTypes = {
    listProducts: PropTypes.func.isRequired,
    productsReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    productsReducer: state.productsReducer
});

export default connect(mapStateToProps, { listProducts })(Home);