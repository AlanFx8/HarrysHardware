import React from 'react';
import { Link, withRouter  } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../img/logo.png';
import '../css/header.css';

class Header extends React.Component {
    onSearchRequest = e => {
        e.preventDefault();
        const searchQuery = document.querySelectorAll(`input[type="search"]`)[0].value.trim();

        if (searchQuery === "")
            return;

        //Due to React Router we must force a refresh on every submit
        //However, we don't want to refresh on the first search
        if (window.location.href.includes("search")){
            if (!window.location.href.trim().endsWith(searchQuery)){
                //Refreshing resets the string to the last search
                //So we have to use history.push here first
                this.props.history.push(`/search/${searchQuery}`);
                window.location.reload();
            }
        }
        else {
            this.props.history.push(`/search/${searchQuery}`);
        }
    }

    render(){
        return <header id="header">
            <div className="header-content">
                <section className="intro-links-section">
                    <div className="intro-links-section-inner">
                        <div className="deliever-message">
                            <strong>We Deliver.</strong> Get what you need, when you need it.
                        </div>
                        <div className="inrto-links">
                            <span><a href="/">Sign In / Register</a></span>
                            <span><a href="/">Customer Service</a></span>
                            <span><a href="/">Store Locator</a></span>
                        </div>
                    </div>
                </section>

                <section className="page-header">
                    <div className="logo-header">
                        <Link to="/">
                            <img src={logo} title="Harry's Hardware" alt="Harry's Hardware logo" />
                        </Link>
                    </div>

                    <div className="search-header">
                        <form id="search-form" name="search-form" onSubmit={this.onSearchRequest}>
                            <input type="search" placeholder="What are you looking for?" />
                            <button type="submit">
                                <FontAwesomeIcon icon={['fas', 'search']} />
                            </button>
                        </form>
                    </div>

                    <div className="cart-header">
                        <FontAwesomeIcon icon={['fas', 'shopping-cart']} className="cart-icon" />
                        <p>Shopping <br/> Cart</p>
                    </div>
                </section>
            </div>
        </header>
    }
}

export default withRouter(Header)