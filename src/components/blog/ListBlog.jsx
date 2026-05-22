import { Link } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";
import axios from "../../services/api";

const ListBlog = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  const fetchNews = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);

      const { data } = await axios.get("/api/getCryptoNews");

      let list = [];

      if (Array.isArray(data)) list = data;
      else if (Array.isArray(data?.articles)) list = data.articles;
      else if (Array.isArray(data?.results)) list = data.results;

      // 🔥 KEEP OLD NEWS + UPDATE (NO BREAK UI)
      setNews((prev) => {
        if (prev.length === 0) return list;
        return prev; // prevent UI jump
      });

    } catch (err) {
      console.log("News error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ================= INIT =================
  useEffect(() => {
    fetchNews();

    // silent refresh (no UI break)
    const interval = setInterval(() => {
      fetchNews(true);
    }, 60000);

    return () => clearInterval(interval);
  }, [fetchNews]);

  // ================= DISPLAY =================
  const displayNews = useMemo(() => {
    return Array.isArray(news) ? news.slice(0, 12) : [];
  }, [news]);

  // ================= IMAGE FIX =================
  const getImage = (item) => {
    return (
      item.urlToImage ||
      item.image_url ||
      item.image ||
      item.thumbnail ||
      "https://via.placeholder.com/300x200?text=Crypto+News"
    );
  };

  // ================= CLICK =================
  const handleOpen = (item) => {
    localStorage.setItem("selectedNews", JSON.stringify(item));
  };

  return (
    <>
      <div className="header fixed-top bg-surface d-flex justify-content-center align-items-center">
        <Link to="/home" className="left back-btn">
          <i className="icon-left-btn"></i>
        </Link>
        <h3>Hot News</h3>
        <Link
          to="#"
          className="right text-secondary"
          data-bs-toggle="modal"
          data-bs-target="#filter"
        >
          <i className="icon-funnel"></i>
        </Link>
      </div>

      <div className="pt-45 pb-16">
        <div className="tf-container">
          <ul className="mt-12 grid-2 gap-16">

            {loading && (
              <p style={{ textAlign: "center", color: "#888" }}>
                Loading news...
              </p>
            )}

            {!loading && displayNews.length === 0 && (
              <p style={{ textAlign: "center", color: "#888" }}>
                No news available
              </p>
            )}

            {displayNews.map((item, index) => (
              <li key={item.url || index}>
                <Link
                  to="/blog-detail"
                  onClick={() => handleOpen(item)}
                  className="blog-item"
                >
                  <img src={getImage(item)} alt="news" />

                  <div className="content">
                    <p className="text-xsmall text-secondary title">
                      {item.source?.name || item.author || "BITCLUB"} •{" "}
                      {new Date(
                        item.publishedAt || item.pubDate
                      ).toLocaleDateString()}
                    </p>

                    <p className="mt-4">
                      {item.title || "No title"}
                    </p>
                  </div>
                </Link>
              </li>
            ))}

          </ul>
        </div>
      </div>

      {/* FILTER (UNCHANGED DESIGN) */}
      <div className="modal fade action-sheet" id="filter">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <span>Filters</span>
              <span className="icon-cancel" data-bs-dismiss="modal"></span>
            </div>
            <div className="modal-body">
              <div className="text-small text-white">Time</div>
              <ul className="grid-2 rcg-12-16 mt-16">
                <li><Link to="#" className="tf-btn xs line active text-secondary">All</Link></li>
              </ul>
              <div className="mt-16 pt-16 line-t grid-2 gap-16">
                <Link to="#" className="tf-btn sm secondary" data-bs-dismiss="modal">Reset</Link>
                <Link to="#" className="tf-btn sm primary" data-bs-dismiss="modal">Apply</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListBlog;