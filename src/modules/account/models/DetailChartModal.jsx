import { useEffect, useState } from "react";
import ModalSparkline from "../components/ModalSparkline";
import { useMarketSocket } from "../../../hooks/useMarketSocket";

export const DetailChartModal = ({ details, isOpen, onClose }) => {
  const prices = useMarketSocket(); 

  const tabs = ["1H", "1D", "1W", "1M", "1Y"];
  const [activeTab, setActiveTab] = useState("1D");
  const [chartData, setChartData] = useState([]);

  // =========================
  // INTERVAL MAP
  // =========================
  const getInterval = (tab) => {
    switch (tab) {
      case "1H": return "1m";
      case "1D": return "5m";
      case "1W": return "30m";
      case "1M": return "2h";
      case "1Y": return "1d";
      default: return "5m";
    }
  };

  const getLimit = (tab) => {
    switch (tab) {
      case "1H": return 60;
      case "1D": return 288;
      case "1W": return 336;
      case "1M": return 720;
      case "1Y": return 365;
      default: return 100;
    }
  };

  // =========================
  // FETCH HISTORY
  // =========================
  useEffect(() => {
    if (!details?.symbol || !isOpen) return;

    const fetchHistory = async () => {
      try {
        const interval = getInterval(activeTab);
        const limit = getLimit(activeTab);
        const symbol = `${details.symbol.toUpperCase()}USDT`;

        const res = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
        );

        const data = await res.json();
        if (!Array.isArray(data)) return;

        const prices = data.map((candle) => parseFloat(candle[4]));
        setChartData(prices);
      } catch (err) {
        console.error("History fetch error:", err);
      }
    };

    fetchHistory();
  }, [activeTab, details?.symbol, isOpen]);

  // =========================
  // LIVE UPDATE FROM GLOBAL SOCKET
  // =========================
  useEffect(() => {
    if (!details?.symbol || !isOpen) return;

    const symbol = details.symbol.toUpperCase();
    const live = prices[symbol];

    const price = Number(live?.lastPrice);

    if (!isNaN(price)) {
      setChartData((prev) => [...prev.slice(-100), price]);
    }
  }, [prices, details?.symbol, isOpen]);

  if (!isOpen || !details) return null;

  const symbol = details.symbol.toUpperCase();
  const live = prices[symbol];

  // =========================
  // PRICE (FIXED NaN ISSUE)
  // =========================
  const price = !isNaN(Number(live?.lastPrice))
    ? Number(live.lastPrice)
    : !isNaN(Number(details?.current_price))
      ? Number(details.current_price)
      : 0;

  // =========================
  // CHANGE (FIXED NaN ISSUE)
  // =========================
  const changeValue = !isNaN(Number(live?.priceChangePercent))
    ? Number(live.priceChangePercent)
    : !isNaN(Number(details?.pricePercentage))
      ? Number(details.pricePercentage)
      : 0;

  // =========================
  // CHART CHANGE
  // =========================
  const getChartChange = () => {
    if (!Array.isArray(chartData) || chartData.length < 2) return 0;

    const first = chartData[0];
    const last = chartData[chartData.length - 1];

    if (!first || !last) return 0;

    return ((last - first) / first) * 100;
  };

  const dynamicChange = getChartChange();
  const isUp = dynamicChange >= 0;

  // =========================
  // LABEL
  // =========================
  const getLabel = () => {
    switch (activeTab) {
      case "1H": return "Last 1 hour";
      case "1D": return "Last 24 hours";
      case "1W": return "Last 7 days";
      case "1M": return "Last 30 days";
      case "1Y": return "Last 1 year";
      default: return "Last 24 hours";
    }
  };

  return (
    <div
      className="modal fade action-sheet show"
      style={{ display: "block", background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "420px", margin: "auto" }}
      >
        <div
          className="modal-content"
          style={{
            borderRadius: "16px",
            background: "#0f0f0f",
            padding: "16px",
          }}
        >
          <div className="box-detail-chart">
            {/* TOP */}
            <div className="top">
              <h3 style={{ color: "#fff" }}>
                {symbol}/USD
              </h3>

              <h2 style={{ color: "#fff", marginTop: "6px" }}>
                ${price.toLocaleString()}
              </h2>

              <p style={{ marginTop: "4px" }}>
                <span style={{ color: isUp ? "#25c866" : "#ff4d4f" }}>
                  {dynamicChange.toFixed(3)}%
                </span>

                <span style={{ color: "#aaa", marginLeft: "8px" }}>
                  {getLabel()}
                </span>
              </p>
            </div>

            {/* CHART */}
            <div style={{ width: "100%", height: "110px", marginTop: "10px" }}>
              <ModalSparkline
                width="100%"
                height={100}
                priceChangePercent={dynamicChange}
                data={chartData}
              />
            </div>

            {/* TABS */}
            <div className="content mt-3">
              <ul
                className="tab-time"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {tabs.map((tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        border: "none",
                        background:
                          activeTab === tab ? "#25c866" : "transparent",
                        color:
                          activeTab === tab ? "#fff" : "#D9D9D9",
                        cursor: "pointer",
                      }}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* TOKEN INFO */}
            <h6 style={{ marginTop: "20px", color: "#D9D9D9" }}>
              Token information
            </h6>

            <ul style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
              <li style={{ flex: 1 }}>
                <div style={{ padding: "14px" }}>
                  <p style={{ fontSize: "13px", color: "#D9D9D9" }}>
                    24H Change
                  </p>
                  <span style={{ color: changeValue >= 0 ? "#25c866" : "#ff4d4f" }}>
                    {changeValue.toFixed(2)}%
                  </span>
                </div>
              </li>

              <li style={{ flex: 1 }}>
                <div style={{ padding: "14px" }}>
                  <p style={{ fontSize: "13px", color: "#D9D9D9" }}>
                    From ATH
                  </p>
                  <span>
                    {Number(details.ath_change_percentage || 0).toFixed(2)}%
                  </span>
                </div>
              </li>
            </ul>

            <button
              onClick={() => (location.href = "/Deposite")}
              style={{
                marginTop: "20px",
                padding: "12px",
                width: "100%",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(135deg,#25c866,#f5c738)",
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Buy Asset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};