import { useEffect, useState } from "react";
import "./Fans.css";
import { useLanguage, useT } from "../i18n/LanguageContext.jsx";
import { formatDateTime } from "../i18n/formatters.js";

function Fans() {
  const t = useT();
  const { lang } = useLanguage();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const res = await fetch("http://localhost:3500/api/fans/all");
    const data = await res.json();
    setMessages(data);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3500/api/fans/all", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, message }),
    });

    setMessage("");
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="fan-mail-container">
      <h2>{t("fansTitle")}</h2>

      <form className="fan-mail-form">
        <input
          type="text"
          placeholder={t("fansName")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <textarea
          placeholder={t("fansMessage")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button onClick={sendMessage} type="submit">
          {t("fansSend")}
        </button>
      </form>

      <h3>{t("fansInbox")}</h3>

      <div className="fan-mail-list">
        {messages.map((msg) => {
          return (
            <div key={msg._id} className="fan-mail-item">
              <strong>{msg.username}:</strong>
              <p>{msg.message}</p>
              <small>{formatDateTime(msg.createdAt, lang)}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Fans;
