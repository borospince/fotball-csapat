import './ff1.css';

const FF1 = ({ ff1 }) => {
  return (
    <div className="ff1-card">
      <div className="ff1-kep-kontener">
        <img src={ff1.kep} alt={ff1.nev} />
      </div>
      <div className="ff1-adatok">
        <h2 className="ff1-nev">{ff1.nev}</h2>
        <p className="ff1-nemzetiseg">{ff1.nemzetiseg}</p>
        <p className="ff1-szuletes">Született: {ff1.szuletes}</p>
        <p className="ff1-poszt">Poszt: {ff1.poszt}</p>
        <div className="ff1-stats">
          <p>Ár: {ff1.ar}</p>
          <p>Gól: {ff1.gol}</p>
          <p>Gólpassz: {ff1.golpassz}</p>
        </div>
      </div>
    </div>
  );
};

export default FF1;
