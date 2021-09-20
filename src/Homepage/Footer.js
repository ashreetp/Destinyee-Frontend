import React from 'react'
import './Footer.css'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

function Footer() {
    return (
        <div className="Footer">
            <h3 className="Footer__logo">Destinyee</h3>
            <div className="Footer__grid">
                <div className="Footer__1">
                    <h1>Customer services</h1>
                    <h2>Contact us</h2>
                    <h2>Track order</h2>
                    <h2>Return order</h2>
                    <h2>Cancel order</h2>
                </div>
                <div className="Footer__2">
                    <h1>Company</h1>
                    <h2>About us</h2>
                    <h2>Terms and Conditions</h2>
                </div>
                <div className="Footer__3">
                    <h1>Connect with us</h1>
                    <h2 className="Footer__3__text"><InstagramIcon className="Footer__3__icon" /> <h5> &nbsp; 1M Followers</h5></h2>
                    <h2 className="Footer__3__text"><FacebookIcon className="Footer__3__icon" /> <h5> &nbsp; 567k People Like this</h5></h2>
                </div>
                <div className="Footer__4">
                    <h1>100% safe</h1>
                    <h2><img className="Footer__4__img" src="https://images.bewakoof.com/web/secure-payments-image.png" /></h2>
                </div>
            </div>
        </div>
    )
}

export default Footer