import Shop from './Shop';
import { useEffect, useState } from 'react';

const Shops = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const TermekLeker = async () => {
            const response = await fetch('http://localhost:3500/api/items-frontend');
            const adat = await response.json();

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
            <div className="main-kontener">
                {items.map((item, index) => (
                    <Shop key={index} shop={item} />
                ))}
            </div>
        </div>
    );
};

export default Shops;
