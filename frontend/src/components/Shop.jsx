import './Shop.css';
import { FaCartArrowDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Shop = ({ props }) => {
  function kartyaFelfed() {
    const kartya = document.querySelectorAll('.meret-kartya');
    console.log(kartya);
    
    if (kartya[props.index].style.display === 'none') { kartya[props.index].style.display = 'block'; }
    else { kartya[props.index].style.display = 'none'; }
    }
  return (
    <div className="shop-card">
      <div className="atfedo">
      <div className="shop-kep-kontener">
        <img src={props.item.kep} alt={props.item.nev}/>
        <button className='kart' onClick={kartyaFelfed}><FaCartArrowDown /></button>
        
      </div>
      <div className="meret-kartya"style={{display: 'none'}}>
        {props.item.vAdatok.map((meret, idx) => (
          <li key={idx}>
            <Link to={`/egyedi-polo/?id=${props.item._id}&meret=${meret}`}>{meret.toLowerCase()}</Link>
          </li>
        ))}
        {/* <li><Link to={`/egyedi-polo/?id=${props.item._id}&meret=XS`}>xs</Link></li>
        <li><Link to={`/egyedi-polo/?id=${props.item._id}&meret=S`}>s</Link></li>
        <li><Link to={`/egyedi-polo/?id=${props.item._id}&meret=M`}>m</Link></li>
        <li><Link to={`/egyedi-polo/?id=${props.item._id}&meret=L`}>l</Link></li>
        <li><Link to={`/egyedi-polo/?id=${props.item._id}&meret=XL`}>xl</Link></li> */}
      </div>

      </div>

      <div className="shop-adatok">
        <h2 className="shop-nev">{props.item.nev}</h2>
        <p className="shop-termekleiras">Kategória: {props.item.termekleiras}</p>
        <p className="shop-mennyisegEgyseg">{props.item.mennyisegEgyseg}</p>
        {/* <p className="shop-kep">{shop.kep}</p> */}

        <div className="shop-stats">
          <p>Ár: {props.item.ar} Ft</p>
          <p>Készlet: {props.item.mennyiseg} db</p>
        </div>
      </div>
    </div>
  );
};

export default Shop;
