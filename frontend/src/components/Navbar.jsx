import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar-kontener">
            <Link to="/">Home</Link>
            <Link to="/tickets">Jegyek</Link>
            <Link to="/players/ff1s">Játékosok</Link>
            <Link to="/news">Hírek</Link>
            <Link to="/clothes">Web áruház</Link>
            <Link to="/history">Történelem</Link>
            <Link to="/fans">Szurkolók</Link>
            <Link to="/register">Regisztráció</Link>
        </div>
    );
};

export default Navbar;
