import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/footer.css';

export default class Footer extends React.Component {
    toggleLinkGroup = id => {
        document.getElementsByClassName("footer-link-button")[parseInt(id)].classList.toggle("open")
    }

    onNewsleterSignup = e => {
        e.preventDefault();
        alert("Thank you for joining!");
    }

    render(){
        return <footer id="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <section className="footer-link-group">
                        <button type="button" className="footer-link-button" onClick={() => this.toggleLinkGroup(0)}>More Ways to Shop</button>
                        <div className="footer-link-set">
                            <span className="footer-link"><Link to="/">Store Locator</Link></span>
                            <span className="footer-link"><Link to="/">Shop Our Ad</Link></span>
                            <span className="footer-link"><Link to="/">Brands We Love</Link></span>
                            <span className="footer-link"><Link to="/">Store Directory</Link></span>
                            <span className="footer-link"><Link to="/">Gift Cards</Link></span>
                        </div>
                    </section>
                    <section className="footer-link-group">
                        <button type="button" className="footer-link-button" onClick={() => this.toggleLinkGroup(1)}>Customer Service</button>
                        <div className="footer-link-set">
                            <span className="footer-link"><Link to="/">Contact Us</Link></span>
                            <span className="footer-link"><Link to="/">Track Your Order</Link></span>
                            <span className="footer-link"><Link to="/">Easy Returns</Link></span>
                            <span className="footer-link"><Link to="/">Shipping, Pickup &#38; Delivery</Link></span>
                        </div>
                    </section>
                    <section className="footer-link-group">
                        <button type="button" className="footer-link-button" onClick={() => this.toggleLinkGroup(2)}>Resources</button>
                        <div className="footer-link-set">
                            <span className="footer-link"><Link to="/">Tips &#38; Advice</Link></span>
                            <span className="footer-link"><Link to="/">Sales &#38; Specials</Link></span>
                            <span className="footer-link"><Link to="/">Store Services</Link></span>
                            <span className="footer-link"><Link to="/">Newsroom</Link></span>
                            <span className="footer-link"><Link to="/">Annual Report</Link></span>
                            <span className="footer-link"><Link to="/">Harry's Hardware Services</Link></span>
                        </div>
                    </section>
                </div>

                <hr />

                <div className="footer-newletter">
                    <div>
                        Sign up for Latest Offers and tips
                    </div>
                    <div>
                        <input type="text" placeholder="Sign up for email." name="newsletter" />
                        <button type="button"  onClick={ this.onNewsleterSignup }>JOIN</button>
                    </div>
                </div>

                <hr />

                <div className="social-media-links">
                    <p>Follow us on...</p>
                    <span>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                        </a>
                    </span>
                    <span>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={['fab', 'twitter']} />
                        </a>
                    </span>
                    <span>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={['fab', 'instagram']} />
                        </a>
                    </span>
                    <span>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={['fab', 'youtube']} />
                        </a>
                    </span>
                </div>

                <div className="terms-of-service-links">
                    <span><Link to="/">Terms of Use</Link></span>
                    <span><Link to="/">Privacy Policy</Link></span>
                    <span><Link to="/">Interest Based Ads</Link></span>
                    <span><Link to="/">Do Not Sell My Personal Information</Link></span>
                </div>

                <div className="copyright-notice">
                    <p>&copy; 2020 Harry's Hardware. Harry's Hardware and the Harry's Hardware logo are registered trademarks of Harry's Hardware Corporation. All rights reserved.</p>
                </div>
            </div>
        </footer>
    }
}