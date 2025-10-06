import adatok_ff1 from "../../public/js/adatok_FF1";
import FF1 from "./FF1";

const FF1 = () => {
  let ff1Items = [];
    for (let i = 0; i < adatok_ff1.length; i++) {
        ff1Items.push(<FF1 key={i} ff1={adatok_ff1[i]} />);
    }
    return (
        <div>
            <div className="main-kontener">{ff1Items}</div>;
        </div>
    );
}

export default FF1;