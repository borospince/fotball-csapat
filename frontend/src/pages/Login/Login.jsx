import { useState } from "react";
import "./Login.css";
import { useT } from "../../i18n/LanguageContext.jsx";

const Login = () => {
  const t = useT();
  const [email, setEmail] = useState("");
  const [jelszo, setJelszo] = useState("");
  const [user, setUser] = useState({});

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
    <div className="login-kontener">
      <h1>{t("loginTitle")}</h1>
      <form>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="email">{t("emailLabel")}:</label>
              </td>
              <td>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="jelszo">{t("loginPassword")}:</label>
              </td>
              <td>
                <input
                  type="password"
                  id="jelszo"
                  onChange={(e) => setJelszo(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={(event) => bejelentkezes(event)}>
                  {t("loginBtn")}:
                </button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </form>
      <div className="registergomb">
        <p>{t("loginNoAccount")}</p>
        <button onClick={() => (window.location.href = "/register")}>
          {t("loginRegister")}
        </button>
      </div>
    </div>
  );
};

export default Login;
