import { useState } from "react";
import "./Login.css";
import { useT } from "../../i18n/LanguageContext.jsx";

const Login = () => {
  const t = useT();
  const [email, setEmail] = useState("");
  const [jelszo, setJelszo] = useState("");

  async function bejelentkezes(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:3500/api/login-frontend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, jelszo }),
    });

    const valasz = await response.json();
    console.log(valasz.letezoUser[0]);

    if (response.ok) {
      window.alert(valasz.msg);
      localStorage.setItem("user", JSON.stringify(valasz.letezoUser[0]));
      window.location.href = "/";
    } else {
      window.alert(valasz.msg);
    }
  }

  return (
    <section className="login-page">
      <div className="login-kontener">
        <h1>{t("loginTitle")}</h1>
        <form className="login-form" onSubmit={bejelentkezes}>
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
            autoComplete="current-password"
            required
          />

          <button type="submit">{t("loginBtn")}</button>
        </form>

        <div className="registergomb">
          <p>{t("loginNoAccount")}</p>
          <button type="button" onClick={() => (window.location.href = "/register")}>
            {t("loginRegister")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
