import U19 from './U19';
import { useEffect, useState } from 'react';

const U19s = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const jatekosLeker = async () => {
            const response = await fetch(
                'http://localhost:3500/api/players-frontend'
            );

            const adat = await response.json();

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
        return elem.korosztaly === 'u19';
    });

    let u19Items = [];

    for (let index = 0; index < adatok.length; index++) {
        u19Items.push(
            <U19
                key={index}
                u19={adatok[index]}
            />
        );
    }

    return (
        <div>
            <div className="main-kontener">{u19Items}</div>;
        </div>
    );
};

export default U19s;
