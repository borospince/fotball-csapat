import { useState } from 'react';

function Ticket() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        match: '',
        quantity: 1,
        category: 'Normál'
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const priceTable = {
            'Normál': 3000,
            'VIP': 8000,
            'Ultra': 12000,
        };

        const ticketData = {
            ...form,
            price: priceTable[form.category] * form.quantity
        };

        const res = await fetch('http://localhost:3500/api/tickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketData)
        });

        const data = await res.json();
        alert("Sikeres jegyfoglalás!");
        console.log(data);
    };

    return (
        <div className="ticket-container">
            <h1>jegyfoglalás</h1>

            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Név" onChange={handleChange} required />
                <input name="email" placeholder="Email" onChange={handleChange} required />

                <select name="match" onChange={handleChange} required>
                    <option value="">Válassz meccset</option>
                    <option value="Foci Klub – Rivális FC">Ízelt Lábúak FC – FC Barcelona</option>
                    <option value="Foci Klub – Legendák FC">Ízelt Lábúak FC – Újpest</option>
                </select>

                <select name="category" onChange={handleChange}>
                    <option value="Normál">Normál</option>
                    <option value="VIP">VIP</option>
                    <option value="Ultra">Ultra</option>
                </select>

                <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={form.quantity}
                    onChange={handleChange}
                />

                <button type="submit">Jegy foglalás</button>
            </form>
        </div>
    );
}

export default Ticket;
