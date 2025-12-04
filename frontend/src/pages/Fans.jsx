import { useEffect, useState } from "react";
import "./Fans.css";

function Fans() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        const res = await fetch("http://localhost:5173/api/fans/all");
        const data = await res.json();
        setMessages(data);
    };

    const sendMessage = async (e) => {
        e.preventDefault();

        await fetch("http://localhost:5173/api/fans/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, message }),
        });

        setMessage("");
        fetchMessages(); // frissítés
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="fan-mail-container">
            <h2>Üzenj a csapatnak!</h2>

            <form onSubmit={sendMessage} className="fan-mail-form">
                <input
                    type="text"
                    placeholder="Neved"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <textarea
                    placeholder="Írd meg az üzeneted..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>

                <button type="submit">Küldés</button>
            </form>

            <h3>Beérkezett üzenetek</h3>

            <div className="fan-mail-list">
                {messages.map((msg) => (
                    <div key={msg._id} className="fan-mail-item">
                        <strong>{msg.username}:</strong>
                        <p>{msg.message}</p>
                        <small>{new Date(msg.createdAt).toLocaleString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Fans;
