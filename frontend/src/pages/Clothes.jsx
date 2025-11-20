import {Link,Outlet} from 'react-router-dom';
import '../pages/Clothes.css';

const Clothes = () => {
  return (
    <div className="items-kontener">
      <div className="sidebar-kontener">
        <Link to="/items/Shops">ruhák</Link>
      </div>
      <div className="items-main-kontener">
        <Outlet />
      </div>
    </div>
  )
}

export default Clothes