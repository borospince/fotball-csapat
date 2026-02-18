import { useState } from "react";
import "./Register.css";
import { useT } from "../../i18n/LanguageContext.jsx";

const Register = () => {
  const t = useT();
  const [nev, setNev] = useState("");
  const [email, setEmail] = useState("");
  const [jelszo, setJelszo] = useState("");
  const [jelszoUjra, setJelszoUjra] = useState("");

  async function regisztracio(event) {
    event.preventDefault();

    if (jelszo !== jelszoUjra) {
      window.alert(t("registerMismatch"));
      return;
    }

    const response = await fetch("http://localhost:3500/api/register-frontend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nev, email, jelszo }),
    });

    const valasz = await response.json();

    if (response.ok) {
      window.alert(valasz.msg);
      window.location.href = "/";
    } else {
      window.alert(valasz.msg);
    }
  }

  return (
    <section className="register-page">
      <div className="register-kontener">
        <h1>{t("registerTitle")}</h1>
        <form className="register-form" onSubmit={regisztracio}>
          <label htmlFor="nev">{t("registerUsername")}:</label>
          <input
            type="text"
            id="nev"
            value={nev}
            onChange={(e) => setNev(e.target.value)}
            autoComplete="username"
            required
          />

          <label htmlFor="email">{t("emailLabel")}:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="jelszo">{t("loginPassword")}:</label>
          <input
            type="password"
            id="jelszo"
            value={jelszo}
            onChange={(e) => setJelszo(e.target.value)}
            autoComplete="new-password"
            required
          />

          <label htmlFor="jelszo-ujra">{t("registerPasswordAgain")}:</label>
          <input
            type="password"
            id="jelszo-ujra"
            value={jelszoUjra}
            onChange={(e) => setJelszoUjra(e.target.value)}
            autoComplete="new-password"
            required
          />

          <button type="submit">{t("registerBtn")}</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
