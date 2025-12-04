import Shop from './Shop';
import { useEffect, useState } from 'react';
import './Shops.css';

const Shops = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const TermekLeker = async () => {
            const response = await fetch('http://localhost:3500/api/items-frontend');
            const adat = await response.json();
            console.log(adat);
            

            if (response.ok) {
                setItems(adat.items);
            } else {
                window.alert(adat.msg);
            }
        };

        TermekLeker();
    }, []);

    return (
        <div>
            <div className="shops-kontener">
                {items.map((item, index) => (
                    <Shop key={index} props={{item, index}} />
                ))}
            </div>
        </div>
    );
};

export default Shops;
