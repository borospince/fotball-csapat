import './u19.css';

const U19 = ({u19}) => {
  return (
    <div className="tartalom-kontener">
        <h1>{u19.cim}</h1>
        <p>{u19.tartalom}</p>
        <div className="u19-kep-kontener">
            <img src={u19.kep} alt={u19.kep} />
        </div>
    </div>
  )
}

export default U19;