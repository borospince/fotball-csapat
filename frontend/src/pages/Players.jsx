import {Link, Outlet} from "react-router-dom";
import  '../pages/players.css';

const Players = () => {
  return (
    <div className='players-kontener'>
      <div className='sidebar-kontener'>
      <Link to='/players/ff1'>Férfi Felnőt 1</Link>
      <Link to='/Players/u19'>Utánpótlás 19</Link>
      </div>
      <div className='players-main-kontener'><Outlet /></div>
    </div>
  );
}

export default Players;