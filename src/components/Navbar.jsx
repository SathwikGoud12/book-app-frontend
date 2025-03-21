import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

import avatarImg from "../assets/avatar.png";
import "../components/Navbar.css";

// Navigation menu items
const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems || []);  // Ensuring default empty array
    const { currentUser, logout } = useAuth();
    const token = localStorage.getItem("token");

    const isAuthenticated = currentUser || token;  // Improved authentication check

    const handleLogOut = () => {
        logout();
        localStorage.removeItem("token");  // Ensure token is cleared
    };

    // Ref for dropdown menu
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="navbar-container">
            <nav className="navbar">
                {/* Left side: Menu icon and Search box */}
                <div className="navbar-left">
                    <Link to="/">
                        <HiMiniBars3CenterLeft className="icon" />
                    </Link>

                    <div className="search-box">
                        <IoSearchOutline className="search-icon" />
                        <input type="text" placeholder="Search here" className="search-input" />
                    </div>
                </div>

                {/* Right side: User, Wishlist, Cart */}
                <div className="navbar-right">
                    <div>
                        {isAuthenticated ? (
                            <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img src={avatarImg} alt="User Avatar" className="avatar active-avatar" />
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div ref={dropdownRef} className="dropdown-menu">
                                        <ul>
                                            {navigation.map((item) => (
                                                <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                    <Link to={item.href} className="dropdown-item">{item.name}</Link>
                                                </li>
                                            ))}
                                            <li>
                                                <button onClick={handleLogOut} className="dropdown-item">Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link to="/login"><HiOutlineUser className="icon" /></Link>
                        )}
                    </div>

                    <button className="wishlist-btn">
                        <HiOutlineHeart className="icon" />
                    </button>

                    <Link to="/cart" className="cart-btn">
                        <HiOutlineShoppingCart />
                        <span className="cart-count">{cartItems.length}</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
