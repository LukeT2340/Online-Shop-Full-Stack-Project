import { useEffect, useState } from 'react';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaClipboardList } from 'react-icons/fa'; 
import Dropdown from 'react-bootstrap/Dropdown';
import "bootstrap/js/src/collapse.js";
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [expanded, setExpanded] = useState(false);

    const handleLogout = () => {
        logout();
    };

    const handleLinkClick = () => {
        setExpanded(false); // Close the navbar when a link is clicked
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary" expanded={expanded}>
            <div className="container">
                <Link className="nav-item mr-3 my-auto pb-2" to="/home" onClick={() => setExpanded(false)}>
                    <img src='Branding.png' style={{ width: '3.9rem' }} alt="Logo" />
                </Link>
                <Navbar.Toggle aria-controls="navbarSupportedContent" onClick={() => setExpanded(!expanded)} />
                <Navbar.Collapse id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/home" onClick={handleLinkClick}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/home" onClick={handleLinkClick}>Explore</Link>
                        </li>
                    </ul>
                    {user ? (
                        <div className="navbar-nav">
                            <Link className="nav-link text-dark" to="/orders" onClick={handleLinkClick} style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: '0.5rem', marginBottom: '0' }}>Orders</p>
                                <FaClipboardList />
                            </Link>
                            <Link className="nav-link text-dark" to="/cart" onClick={handleLinkClick} style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: '0.5rem', marginBottom: '0' }}>Cart</p>
                                <FaShoppingCart />
                            </Link>
                            <button className="btn btn-link" onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <div className="navbar-nav">
                            <Link className="nav-link" to="/login" onClick={handleLinkClick}>Log in</Link>
                            <Link className="nav-link" to="/signup" onClick={handleLinkClick}>Sign up</Link>
                        </div>
                    )}
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default NavBar;

/*
                        <Dropdown className="nav-item">
                            <Dropdown.Toggle variant="none" id="dropdown-basic" onClick={handleLinkClick}>
                                Categories
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Makeup</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Skincare</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Accessories</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
*/