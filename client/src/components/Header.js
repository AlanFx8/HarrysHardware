import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/header.css';

export default class Header extends React.Component {
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
                    <div className="cart-header">
                        <FontAwesomeIcon icon={['fas', 'shopping-cart']} />
                    </div>
                </section>
            </div>
        </header>
    }
}