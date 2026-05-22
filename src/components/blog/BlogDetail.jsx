import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import avt2 from "../../images/avt/avt2.jpg";

const BlogDetail = () => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("selectedNews");
    if (stored) {
      setNews(JSON.parse(stored));
    }
  }, []);

  if (!news) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        No article found
      </p>
    );
  }

  const image =
    news.urlToImage ||
    news.image_url ||
    news.image ||
    news.thumbnail ||
    "https://via.placeholder.com/600x300";

  return (
    <>
      <div className="header absolute">
        <div className="tf-container">
          <div className="d-flex justify-content-between align-items-center mt-12">
            <Link to="/blog" className="box-icon back-btn">
              <i className="icon-left-btn"></i>
            </Link>

            <button
              className="box-icon text-secondary"
              onClick={() => navigator.share?.({ url: news.url })}
            >
              <i className="icon-share"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="wrapper-blog">
        <img src={image} alt="banner" className="banner-blog" />
      </div>

      <div className="pt-16 pb-16">
        <div className="tf-container">

          <Link to="#" className="tag-xs primary round-1">
            Crypto
          </Link>

          <h3 className="mt-6">
            {news.title || "No title"}
          </h3>

          <div className="d-flex justify-content-between align-items-center mt-12">
            <ul className="box-user-blog">
              <li className="d-flex align-items-center">
                <img src={avt2} alt="img" className="avt" />
                &ensp;
                <p>
                  by{" "}
                  <span className="text-white">
                    {news.author || news.source?.name || "BITCLUB"}
                  </span>
                </p>
              </li>

              <li className="text-white d-flex align-items-center">
                <i className="icon-clock"></i>
                &nbsp;{new Date(
                  news.publishedAt || news.pubDate
                ).toLocaleDateString()}
              </li>
            </ul>

            <Link to="#" className="tag-xs primary round-1">
              Follow
            </Link>
          </div>

          <ul className="d-flex gap-6 mt-12 flex-wrap">
            <li><Link to="#" className="list-item-social"><i className="icon icon-fb"></i>Facebook</Link></li>
            <li><Link to="#" className="list-item-social"><i className="icon icon-tw"></i>Twitter</Link></li>
            <li><Link to="#" className="list-item-social"><i className="icon icon-discord"></i>Discord</Link></li>
            <li><Link to="#" className="list-item-social"><i className="icon icon-gmail"></i>Gmail</Link></li>
          </ul>

          {/* CONTENT */}
          <p className="mt-12 text-large">
            {news.description || news.content || "No content available."}
          </p>

          <p className="mt-8 text-large">
            {news.content || ""}
          </p>

        </div>
      </div>
    </>
  );
};

export default BlogDetail;