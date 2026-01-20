import './U19.css';

const U19 = ({ u19 }) => {
  return (
    <div className="u19-card">
      <div className="u19-kep-kontener">
        <img src={u19.kep} alt={u19.nev} />
      </div>

      <div className="u19-adatok">
        <p className="u19-nev">{u19.nev}</p>
        <p className="u19-nemzetiseg">{u19.nemzetiseg}</p>
        <p className="u19-szuletes">{u19.szuletes}</p>
        <p className="u19-poszt">{u19.poszt}</p>
      </div>

      <div className="u19-stats">
        <p>Ár: {u19.ar}</p>
        <p>Gól: {u19.gol}</p>
        <p>Gólpassz: {u19.golpassz}</p>
      </div>
    </div>
  );
};

export default U19;
