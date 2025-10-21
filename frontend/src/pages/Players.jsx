import { Link, Outlet } from 'react-router-dom';
import '../pages/players.css';
import { useEffect, useState } from 'react';

const Players = () => {
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
    return (
        <div className="players-kontener">
            <div className="sidebar-kontener">
                <Link to="/players/ff1">Férfi Felnőt 1</Link>
                <Link to="/Players/u19">Utánpótlás 19</Link>
            </div>
            <div className="players-main-kontener">
                {players.map((elem) => {
                    return (
                        <div key={elem._id}>
                            <p style={{ color: 'white' }}>Név: {elem.nev}</p>
                            <img
                                src={elem.kep}
                                alt=""
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Players;
