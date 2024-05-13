import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaClipboardList } from 'react-icons/fa'; 
import '../styles/NavBar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import "bootstrap/js/src/collapse.js";
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogout = () => {
        logout();
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
        <div className="container">
            <Link className="navbar-brand" to="/home">Yeeica</Link>
            <Navbar.Toggle aria-controls="navbarSupportedContent" />
            <Navbar.Collapse id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">Explore</Link>
                    </li>
                    <Dropdown className="nav-item">
                        <Dropdown.Toggle variant="none" id="dropdown-basic">
                            Categories
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Makeup</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Skincare</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Accessories</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </ul>
                {user ? (
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/orders" style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ marginRight: '0.5rem', marginBottom: '0' }}>Orders</p>
                            <FaClipboardList />
                        </Link>
                        <Link className="nav-link" to="/cart" style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ marginRight: '0.5rem', marginBottom: '0' }}>Cart</p>
                            <FaShoppingCart />
                        </Link>
                        <button className="btn btn-link" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div className="navbar-nav">
                            <Link className="nav-link" to="/login">Log in</Link>
                            <Link className="nav-link" to="/signup">Sign up</Link>
                    </div>
                )}
            </Navbar.Collapse>
        </div>
    </Navbar>
        );
    };

    export default NavBar;

    /*
                                {user ? (
                                    <>
                                        <span className="align-middle me-2">{user.email}</span>
                                        <button className="btn btn-outline-danger" onClick={handleClick}>Log out</button>
                                    </>
                                ) : (
                                    <>
                                        <Link className="nav-link me-2" to="/login">Log in</Link>
                                        <Link className="nav-link" to="/signup">Sign up</Link>
                                    </>
                                )}

                                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Yeeica</Link>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/explore">Explore</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">About</Link>
                                </li>
                            </ul>
                            {user ? (
                                <div className="navbar-nav">
                                    <Link className="nav-link" to="/orders" style={{ display: 'flex', alignItems: 'center' }}>
                                        <p style={{ marginRight: '0.5rem', marginBottom: '0' }}>Orders</p>
                                        <FaClipboardList />
                                    </Link>
                                    <Link className="nav-link" to="/cart" style={{ display: 'flex', alignItems: 'center' }}>
                                        <p style={{ marginRight: '0.5rem', marginBottom: '0' }}>Cart</p>
                                        <FaShoppingCart />
                                    </Link>
                                </div>
                            ) : (
                                <div className="navbar-nav">
                                    <Link className="nav-link me-2" to="/login">Log in</Link>
                                    <Link className="nav-link" to="/signup">Sign up</Link>
                                </div>
                            )}
                            </div>
                    </div>
            </nav>
*/