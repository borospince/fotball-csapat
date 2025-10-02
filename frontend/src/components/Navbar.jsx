import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar-kontener">
        <Link to='/'>Home</Link>
        <Link to='/tickets'>Jegyek</Link>
        <Link to='/players'>Játékosok</Link>
        <Link to='/news'>Hírek</Link>
        <Link to='/clothes'>Ruházat</Link>
        <Link to='/history'>Történelem</Link>
        <Link to='/Fans'>Szurkolók</Link>
    </div>
  );
}

export default Navbar;