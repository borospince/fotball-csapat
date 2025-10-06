import adatok_ff1 from "../../public/js/adatok_U19";
import U19 from "./U19";

const FF1 = () => {
  let ff1Items = [];
    for (let i = 0; i < adatok_u19.length; i++) {
        u19Items.push(<U19 key={i} u19={adatok_u19[i]} />);
    }
    return (
        <div>
            <div className="main-kontener">{u19Items}</div>;
        </div>
    );
}

export default U19;