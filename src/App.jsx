import { useEffect, useState } from "react";

const App = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [news, setNews] = useState([]);
  useEffect(() => {
    async function fetchnews() {
      let healthnews = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=${apiKey}`
      );
      let final = await healthnews.json();
      console.log(final);
      setNews(final.articles);
    }
    fetchnews();
  }, []);
  return (
    <div className="min-h-full bg-slate-900">
      <h1 className="text-white text-center text-4xl pt-4">
        Latest Health Articles
      </h1>
      <div className="p-8 flex flex-wrap">
        {news.map((article, index) => {
          const formattedDate = new Date(
            article.publishedAt
          ).toLocaleDateString();
          return (
            <div
              key={index}
              className="text-white w-64 h-64 bg-slate-800 p-4 m-4"
            >
              <div className="bg-slate-700 text-xl h-[103px] overflow-hidden p-3">
                {article.title}
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <p>Pubilshed on </p>
                  <p className="text-slate-400">{formattedDate}</p>
                  <p>Published by </p>
                  <p className="text-slate-400">{article.author}</p>
                </div>
                <p className="text-blue-500">
                  <a href={`${article.url}`}>
                    <div className="flex">
                      <div className="mr-2">Read</div> <div>more...</div>
                    </div>
                  </a>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;

