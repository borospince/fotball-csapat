import "./Home.css";
import { useT } from "../i18n/LanguageContext.jsx";

const Home = () => {
  const t = useT();
  return (
    <body className="homebody-kontener">
      <div className="home-kontener">
        <h1>{t("homeTitle")}</h1>
      </div>
    </body>
  );
};

export default Home;
