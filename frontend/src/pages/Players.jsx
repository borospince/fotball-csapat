import React from 'react';
import  '../pages/players.css';

const Players = () => {
  return (
    <div className='players-kontener'>
      <div className='sidebar-kontener'>
      <Link to='/players/ff1'>Férfi Felnőt 1</Link>
      <Link to='/players/u19'>Utánpótlás 19</Link>
      </div>
      <div className='players-main-kontener'><Outlet /></div>
    </div>
  );
}

export default Players;