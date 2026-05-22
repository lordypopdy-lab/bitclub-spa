import axios from "../../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FreeMode } from "swiper/modules";
import { useEffect, useState, useMemo } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import { Swiper, SwiperSlide } from "swiper/react";
import MenuBarFooter from "./ui/MenubarFooter";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const Earn = () => {
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const [details, setDetails] = useState({
    name: "",
    images: "",
    symbol: "",
    current_price: "",
    market_cap: "",
    lastTradindVolume24: "",
    pricePercentage: "",
    ath_change_percentage: "",
  });

  useEffect(() => {
    setLoading(true);

    try {
      const tokenGetter = localStorage.getItem("tokens");
      const datas = JSON.parse(tokenGetter || "[]");

      setTokens(datas);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  }, []);

  const setTokenDetails = (token) => {
    setDetails({
      name: token.name,
      images: token.image,
      symbol: token.symbol,
      current_price: token.current_price,
      market_cap: token.market_cap,
      lastTradindVolume24: token.price_change_24h,
      pricePercentage: token.price_change_percentage_24h,
      ath_change_percentage: token.ath_change_percentage,
    });
  };

  // 🔥 SEARCH FILTER (global)
  const filteredTokens = useMemo(() => {
    if (!searchItem) return tokens;
    return tokens.filter((t) =>
      t.name.toLowerCase().includes(searchItem.toLowerCase())
    );
  }, [tokens, searchItem]);

  // 🔥 SLICE HELPERS (clean tab separation)
  const stablecoins = useMemo(() => filteredTokens.slice(0, 12), [filteredTokens]);
  const singleCoins = useMemo(() => filteredTokens.slice(60, 80), [filteredTokens]);
  const vaultCoins = useMemo(() => filteredTokens.slice(80, 98), [filteredTokens]);

  // 🔥 REUSABLE RENDER FUNCTION (no repetition)
  const renderCoin = (token, index) => (
    <li key={index} style={{ marginTop: "18px" }}>
      <Link
        onClick={() => setTokenDetails(token)}
        data-bs-toggle="modal"
        data-bs-target="#detailChart"
        className="coin-item style-2 gap-12"
      >
        <img src={token.image} alt="img" className="img" />
        <div className="content">
          <div className="title">
            <p className="mb-4 text-button">
              {token.symbol.toUpperCase()}
            </p>
            <span className="text-secondary">${token.market_cap}M</span>
          </div>

          <div className="d-flex align-items-center gap-12">
            <span className="text-small">${token.current_price}</span>

            {token.price_change_percentage_24h > 1 ? (
              <span className="coin-btn increase">
                {token.price_change_percentage_24h}%
              </span>
            ) : (
              <span className="coin-btn decrease">
                {token.price_change_percentage_24h}%
              </span>
            )}
          </div>
        </div>
      </Link>
    </li>
  );

  const toContractOne = async () => {
    const email = localStorage.getItem("email");
    try {
      const { data } = await axios.post("/getContractOne", { email });

      if (data.success && data.contractOne.status !== "Paused") {
        location.href = "/ContractOneProfile";
      } else {
        location.href = "/ContractOne";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toContractTwo = async () => {
    const email = localStorage.getItem("email");
    try {
      const { data } = await axios.post("/getContractTwo", { email });

      if (data.success) {
        location.href = "/ContractTwoProfile";
      } else {
        location.href = "/ContractTwo";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="header-style2 fixed-top d-flex align-items-center justify-content-between bg-surface">
        <h3>Earn</h3>
        <i
          className="icon-funnel text-white"
          data-bs-toggle="modal"
          data-bs-target="#filter"
        ></i>
      </div>

      <div className="pt-55 pb-80">
        <div className="tf-container">
          <h5 className="mb-2 mt-20">Create & sell your Wallet</h5>

          <Swiper spaceBetween={12} freeMode modules={[FreeMode]}>
            <SwiperSlide>
              <div className="accent-box-v5 p-0 bg-icon2 bg-menuDark active">
                <Link
                  onClick={toContractOne}
                  className="coin-item style-1 gap-12 bg-surface"
                >
                  Contract Class One
                </Link>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="accent-box-v5 bg-menuDark">
                <Link onClick={toContractTwo} className="coin-item style-1 gap-12 bg-surface">
                  Contract Class Two
                </Link>
              </div>
            </SwiperSlide>
          </Swiper>

          {/* TABS */}
          <div className="mt-20">
            <ul className="menu-tab-v3">
              <li className="nav-link active">Stablecoin</li>
              <li className="nav-link">Single Cryptocurrency</li>
              <li className="nav-link">Vault</li>
            </ul>

            {/* SEARCH */}
            <div className="mt-4 search-box box-input-field">
              <input
                type="text"
                placeholder="Cryptocurrency search, protocol"
                className="clear-ip"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
              />
            </div>

            <div className="tab-content mt-16 mb-16">
              {/* STABLE */}
              <div className="tab-pane fade show active">
                <ul>
                  {stablecoins.map(renderCoin)}
                </ul>
              </div>

              {/* SINGLE */}
              <div className="tab-pane fade">
                <ul>{singleCoins.map(renderCoin)}</ul>
              </div>

              {/* VAULT */}
              <div className="tab-pane fade">
                <ul>{vaultCoins.map(renderCoin)}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MenuBarFooter />

      {/* MODAL (UNCHANGED UI, ONLY DATA) */}
      <div className="modal fade action-sheet" id="detailChart">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="box-detail-chart">
              <div className="top">
                <h3>
                  {details.symbol?.toUpperCase()}/USD
                </h3>

                <h2 className="mt-4">${details.current_price}</h2>

                <p className="mt-4">
                  <span
                    className={
                      details.pricePercentage > 1
                        ? "text-primary"
                        : "text-red"
                    }
                  >
                    {details.pricePercentage}
                  </span>
                  &nbsp;Last 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER MODAL */}
      <div className="modal fade action-sheet" id="filter">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <ul className="mt-20 pb-16">
              {stablecoins.slice(0, 12).map((t, i) => (
                <li key={i}>
                  <div className="item-check coin-item style-2 gap-8">
                    <img src={t.image} alt="img" className="img" />
                    <p className="content text-large">{t.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <MenuBarFooter />
    </>
  );
};

export default Earn;