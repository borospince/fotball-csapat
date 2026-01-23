import { useEffect, useState } from "react";
import "./News.css";
import { useLanguage, useT } from "../i18n/LanguageContext.jsx";

const News = () => {
  const t = useT();
  const { lang } = useLanguage();
  const dateLocale = lang === "hu" ? "hu-HU" : "en-GB";
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const res = await fetch(
        // `https://newsapi.org/v2/everything?q=futball OR football&language=hu&sortBy=publishedAt&pageSize=9&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
        `https://newsapi.org/v2/everything?q=futball&from=2025-12-05&sortBy=publishedAt&apiKey=fac94f46c7724ae8b7021a4663cfa54f`
      );
      const data = await res.json();
      console.log(data);

      setNews(data.articles);
    } catch (error) {
      console.error("News fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();

    // automatikus frissítés 5 percenként
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="news-kontener">
      <h1>{t("newsTitle")}</h1>

      {loading && <p className="loading">{t("newsLoading")}</p>}

      <div className="news-grid">
        {news.map((item, index) => (
          <div className="news-card" key={index}>
            {item.urlToImage && (
              <img src={item.urlToImage} alt={item.title} />
            )}

            <h2>{item.title}</h2>
            <p>{item.description}</p>

            <a href={item.url} target="_blank" rel="noreferrer">
              {t("newsFull") ?? "Teljes cikk →"}
            </a>

            <span className="date">
              {new Date(item.publishedAt).toLocaleDateString(dateLocale)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
