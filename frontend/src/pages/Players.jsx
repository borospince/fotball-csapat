import { Link, Outlet } from 'react-router-dom';
import '../pages/players.css';

const Players = () => {
    return (
        <div className="players-kontener">
            <div className="sidebar-kontener">
                <Link to="/players/ff1s">Férfi Felnőt 1</Link>
                <Link to="/players/u19s">Utánpótlás 19</Link>
            </div>
            <div className="players-main-kontener">
                <Outlet />
            </div>
        </div>
    );
};

export default Players;
