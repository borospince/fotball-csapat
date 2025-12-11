# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=futball OR football&language=hu&sortBy=publishedAt&pageSize=9&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
      );



            <div className="meret-kartya"style={{display: 'none'}}>
        {props.item.vAdatok.map((meret, idx) => (
          <li key={idx}>
            <Link to={`/egyedi-polo/?id=${props.item._id}&meret=${meret}`}>{meret.toLowerCase()}</Link>
          </li>
        ))}
        {/* <li><Link to={`/egyedi-polo/?id=${props.item._id}&meret=XS`}>xs</Link></li>
        <li><Link to={`/egyedi-polo/?id=${props.item._id}&meret=S`}>s</Link></li>
        <li><Link to={`/egyedi-polo/?id=${props.item._id}&meret=M`}>m</Link></li>
        <li><Link to={`/egyedi-polo/?id=${props.item._id}&meret=L`}>l</Link></li>
        <li><Link to={`/egyedi-polo/?id=${props.item._id}&meret=XL`}>xl</Link></li> */}
      </div>