import "../../styles/components/navmenu.css";
import { Link } from "react-router-dom";

function NavMenu() {
    return (
        <nav className="nav-menu">
            <div className="container">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/catalog">Catalog</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavMenu;