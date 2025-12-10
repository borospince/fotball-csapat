import { useEffect, useState } from "react";
import "./News.css";

const News = () => {
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
      console.error("Hiba a hírek lekérésénél", error);
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
      <h1>⚽ Friss futball hírek</h1>

      {loading && <p className="loading">Hírek betöltése...</p>}

      <div className="news-grid">
        {news.map((item, index) => (
          <div className="news-card" key={index}>
            {item.urlToImage && (
              <img src={item.urlToImage} alt={item.title} />
            )}

            <h2>{item.title}</h2>
            <p>{item.description}</p>

            <a href={item.url} target="_blank" rel="noreferrer">
              Teljes cikk →
            </a>

            <span className="date">
              {new Date(item.publishedAt).toLocaleDateString("hu-HU")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
