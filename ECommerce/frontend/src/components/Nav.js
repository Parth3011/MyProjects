import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div>
            < img  alt="logo" className="logo" src='https://www.shutterstock.com/shutterstock/photos/1984672004/display_1500/stock-vector-catering-quality-food-design-premium-logo-1984672004.jpg' />
            {auth ? <ul className="nav-ul">
                <li><Link to="/">Product</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/Signup">Logout ({JSON.parse(auth).name})</Link></li>
            </ul>
                :
                <ul className="nav-ul nav-right" >
                    <li><Link to="/Signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    )
}

export default Nav;