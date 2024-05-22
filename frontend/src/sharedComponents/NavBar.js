// Navbar.js
import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import styles from './NavBar.module.css';
import { FaHome, FaBook, FaFire, FaSearch, FaUser, FaComment, FaBell, FaShoppingCart } from "react-icons/fa";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from 'react-router';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomNavbar = () => {
    const [searchText, setSearchText] = useState(null);
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        window.location.reload();
    }

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${searchText}`);
    }

    return (
        <Navbar data-bs-theme="light" className={`border-bottom`} expand='md'>
            <Navbar.Brand href="/articles" className={`mx-3`}>Yeeica</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className='mx-3' />
            <Navbar.Collapse id="basic-navbar-nav" className="mx-3">
            <Nav className="mr-auto">
                <Nav.Link href="/home" className="d-flex align-items-center">
                    <FaHome size={18} className="mr-1" /> Home
                </Nav.Link>
                <Nav.Link href="/topselling" className="d-flex align-items-center mr-3">
                    <FaFire size={18} className="mr-1" style={{color: 'rgb(var(--accent-color))'}}/> Popular
                </Nav.Link>

                <Nav.Link href="/notifications" className="d-lg-none d-flex align-items-center">
                    <FaBell size={18} className="mr-1" /> Notifications
                </Nav.Link>
                <Nav.Link href="/cart" className="d-lg-none d-flex align-items-center">
                    <FaShoppingCart size={18} className="mr-1" /> Cart
                </Nav.Link>
                {user && (
                    <Button className={`d-lg-none btn ${styles.hamburgerLogoutButton} mx-3`} onClick={handleLogout}>Logout</Button>
                )}

                {/* Show search bar on larger screens */}
                <Form inline className="d-none d-lg-flex ms-3" style={{width: '280px'}} onSubmit={handleSearchSubmit}>
                    <FormControl type="text" placeholder="Search Yeecia" className="mr-lg-2" value={searchText} onChange={handleSearchTextChange} />
                </Form>
            </Nav>

            {/* Smaller screen login button */}
            {!user && (
                <div className='d-lg-none d-flex col-flex'>
                    <div className="d-flex flex-column">
                        <Nav.Link href="/login" className={`${styles.hamburgerLoginButton} px-3 mt-2`}> Login</Nav.Link>
                    </div>
                </div>
            )}


            {/* Larger screen login button and nav links */}
            <Nav className="d-none d-lg-flex col-md-3 justify-content-end ml-auto">
                {user ? (
                    <>
                        <Nav.Link href="/notifications" className="d-flex align-items-center">
                            <FaBell size={18} className="mr-1" /> Notifications
                        </Nav.Link>
                        <Nav.Link href="/cart" className="d-flex align-items-center">
                            <FaShoppingCart size={18} className="mr-1" /> Cart
                        </Nav.Link>
                        <Button className={`btn ${styles.logoutButton} mx-3`} onClick={handleLogout}>Logout</Button>
                    </>
                ) :
                (
                    <>
                        <Nav.Link href="/login" className={`${styles.loginButton}`}>Login</Nav.Link>
                        <Nav.Link href="/register" className={`${styles.signupButton} mx-3`}>Signup</Nav.Link>
                    </>
                )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    
};

export default CustomNavbar;


/*

<NavDropdown title="more">
<NavDropdown.Item href="#action/3.1">Pics</NavDropdown.Item>
<NavDropdown.Item href="#action/3.2">Videos</NavDropdown.Item>
<NavDropdown.Divider />
<NavDropdown.Item href="#action/3.4">More...</NavDropdown.Item>
</NavDropdown>

*/