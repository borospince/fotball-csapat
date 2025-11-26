import { Link } from 'react-router-dom';
import './Navbar.css';
import { CgProfile } from "react-icons/cg";
import { MdStadium } from "react-icons/md";

const Navbar = () => {
    return (
        <div className="navbar-kontener">
            <Link to="/"><MdStadium size={30} /></Link>
            <Link to="/tickets">Jegyek</Link>
            <Link to="/players/ff1s">Játékosok</Link>
            <Link to="/news">Hírek</Link>
            <Link to="/clothes">Web áruház</Link>
            <Link to="/history">Történelem</Link>
            <Link to="/fans">Szurkolók</Link>
            <Link to="/login"><CgProfile size={30} /></Link>
            {/* <Link to="/register">Regisztráció</Link> */}
        </div>
    );
};

export default Navbar;
