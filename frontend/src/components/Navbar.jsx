import { Link } from 'react-router-dom';
import './Navbar.css';
import { CgProfile } from "react-icons/cg";
import { MdStadium } from "react-icons/md";
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(0);
    const [isAdmin, setIsAdmin] = useState(0);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        if (user) {
            setIsLoggedIn(1)
        }

        if (user && user.statusz === 'true') {
            setIsAdmin(1);
        }
        
    }, [])

    const kilep = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    return (
        <div className="navbar-kontener">
            <Link to="/"><MdStadium size={30} /></Link>
            <Link to="/tickets">Jegyek</Link>
            <Link to="/players/ff1s">Játékosok</Link>
            <Link to="/news">Hírek</Link>
            <Link to="/shops">Web áruház</Link>
            <Link to="/history">Történelem</Link>
            <Link to="/fans">Szurkolók</Link>
            <Link to="/Cart">kosár</Link>
            {isLoggedIn === 0 ? 
                 <Link to="/login"><CgProfile size={30} /></Link>
            : 
                <button onClick={kilep}>Kilép</button>
            }
            {/* <Link to="/register">Regisztráció</Link> */}
        </div>
    );
};

export default Navbar;
