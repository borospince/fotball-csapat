import FF1 from './FF1';
import { useEffect, useState } from 'react';

const FF1s = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const jatekosLeker = async () => {
            const response = await fetch(
                'http://localhost:3500/api/players-frontend'
            );

            const adat = await response.json();
            console.log(adat);
            

            if (response.ok) {
                console.log(adat.players);
                setPlayers(adat.players);
            } else {
                window.alert(adat.msg);
            }
        };

        jatekosLeker();
    }, []);

    let adatok = players.filter((elem) => {
        return elem.korosztaly === 'felnőtt';
    });

    let ff1Items = [];

    for (let index = 0; index < adatok.length; index++) {
        ff1Items.push(
            <FF1
                key={index}
                ff1={adatok[index]}
            />
        );
    }

    return (
        <div>
            <div className="main-kontener">{ff1Items}</div>;
        </div>
    );
};

export default FF1s;
