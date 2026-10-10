import "./Footer.css";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function Footer(){
return(
<footer className="footer">

<div className="footer-social">

<h2>Follow Our Latest Collections</h2>

<div className="footer-divider">
<span></span>
<div className="heart">♥</div>
<span></span>
</div>

<div className="social-buttons">

<a href="#" className="social-btn">
<FaWhatsapp/>
<span>Join WhatsApp</span>
</a>

<a href="#" className="social-btn">
<FaInstagram/>
<span>Follow Instagram</span>
</a>

</div>

</div>

<div className="footer-about">

<p>ABOUT AGVI</p>

<h2>AGVI Clothing</h2>

<span>
Premium fashion crafted with elegance, comfort and affordability for women and kids.
</span>

</div>

<div className="footer-info">

<div className="info-card">

<h3>STITCHING UNIT</h3>

<div className="address">

<FaMapMarkerAlt/>

<div>

<h4>Address</h4>

<p>
2/362, Lorrykarar Thottam,<br/>
West Rasagoundanpalayam,<br/>
Palladam, Tiruppur - 641662
</p>

</div>

</div>

<div className="contact-row">

<a href="tel:+917305004333" className="contact-box">
<FaPhoneAlt/>
<p>Call Us</p>
</a>

</div>

</div>

<div className="info-card">

<h3>AGVI OUTLET</h3>

<div className="address">

<FaMapMarkerAlt/>

<div>

<h4>Outlet</h4>

<p>
Arunothaya Mall<br/>
Palladam,<br/>
Tiruppur.
</p>

</div>

</div>

<div className="contact-row">

<a href="mailto:info@agviclothing.com" className="contact-box">
<FaEnvelope/>
<p>Contact Us</p>
</a>

</div>

</div>

</div>

<div className="footer-bottom">

<p>© 2026 AGVI Clothing. All Rights Reserved.</p>

<div className="footer-links">

<a href="#">Privacy Policy</a>

<a href="#">Terms & Conditions</a>

<a href="#">Shipping Policy</a>

<a href="#">Refund Policy</a>

</div>

</div>

</footer>
);
}

export default Footer;