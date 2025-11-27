import {Link,Outlet} from 'react-router-dom';
import '../pages/Clothes.css';

const Clothes = () => {
  return (
    <div className="items-kontener">
      <div className="items-main-kontener">
        <h2>Ruházat</h2>
          <nav>
            <ul>
              <li><Link to="ferfi">Férfi</Link></li>
              <li><Link to="noi">Női</Link></li>
              <li><Link to="gyerek">Gyerek</Link></li>
              <li><Link to="kiegészito">kiegészítök</Link></li>
              <li><Link to="minden">minden</Link></li>
            </ul>
          </nav>
        <div className="items-menu-kontener">
        <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Clothes