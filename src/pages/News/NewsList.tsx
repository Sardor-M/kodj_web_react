import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { NavLink, Link, useParams, useNavigate } from "react-router-dom";
import { NewsItem } from "../../types";

export default function NewsList() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const { category } = useParams<{ category: string }>();
  const currentCategory = category ?? "tech";

  const fetchNews = async () => {
    try {
      const q = query(
        collection(db, "news"),
        where("category", "==", currentCategory),
        orderBy("lastEdited", "desc")
      );
      const querySnapshot = await getDocs(q);
      const newsData: NewsItem[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
      }));
      setNews(newsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [currentCategory]);

  if (loading) {
    return <div className="text-gray-500 p-20 text-center">Loading...</div>;
  }

  if (news.length === 0) {
    return (
      <div className="">
        <button
          onClick={() => navigate(-1)}
          className="absolute mb-6 px-4 py-1 text-white text- bg-trasnparent text-white rounded hover:bg-gray-500 transition  z-10"
          // className="mb-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-500 transition"
        >
          &#8592;
        </button>
        <div className="text-center text-gray-500 p-20">No news found!</div>
      </div>
    );
  }

  // const newsId = news.map((item) => {
  //   return item.id;
  // })

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">News</h1>
      <nav className="flex space-x-4 mb-6">
        <NavLink
          to={`/news/tech/`}
          className={({ isActive }) =>
            (currentCategory === "tech" && isActive) ||
            currentCategory === "tech"
              ? // isActive || location.pathname.includes('/news/tech/')
                "text-blue-500 font-bold border-b-2 border-blue-500 pb-1"
              : "text-gray-500 hover:text-blue-500"
          }
        >
          tech
        </NavLink>
        <NavLink
          to={`/news/meetup`}
          className={({ isActive }) =>
            (currentCategory === "meetup" && isActive) ||
            currentCategory === "meetup"
              ? // isActive || location.pathname.includes('/news/meetup')
                "text-blue-500 font-bold border-b-2 border-blue-500 pb-1"
              : "text-gray-500 hover:text-blue-500"
          }
        >
          meetup
        </NavLink>
        <NavLink
          to={`/news/social`}
          className={({ isActive }) =>
            (currentCategory === "social" && isActive) ||
            currentCategory === "social"
              ? // isActive || location.pathname.includes('news/social')
                "text-blue-500 border-b-2 border-blue-500 pb-1"
              : "text-gray-500 hover:text-blue-500"
          }
        >
          social
        </NavLink>
      </nav>

      <div className="space-y-8">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-neutral-800 p-4 rounded shadow text-white"
          >
            <Link
              to={`/news/${currentCategory}/${item.id}`}
              className="block hover:underline"
            >
              <h4 className="text-xl font-bold hover:text-blue-400">
                {item.title}
              </h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
