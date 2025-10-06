import './ff1.css';

const FF1 = ({ff1}) => {
  return (
    <div className="tartalom-kontener">
        <h1>{ff1.cim}</h1>
        <p>{ff1.tartalom}</p>
        <div className="ff1-kep-kontener">
            <img src={ff1.kep} alt={ff1.kep} />
        </div>
    </div>
  )
}

export default FF1;