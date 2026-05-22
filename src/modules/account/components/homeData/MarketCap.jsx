import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DetailChartModal } from "../../models/DetailChartModal";
import { useMarketSocket } from "../../../../hooks/useMarketSocket";

const MarketCap = () => {
  const [priceBackup, setPriceBack] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState(null);

  //  GLOBAL WebSocket
  const pricesTicker = useMarketSocket();

  useEffect(() => {
    const rawData = JSON.parse(localStorage.getItem("tokens")) || [];
    const transformed = {};

    rawData.forEach((coin) => {
      if (coin.symbol) {
        transformed[coin.symbol.toUpperCase()] = coin;
      }
    });

    setPriceBack(transformed);
    setLoading(false);
  }, []);

  const formatMarketCap = (value) => {
    const num = Number(value || 0);

    if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
    return num.toFixed(2);
  };

  //  Sort from backup (market cap source)
  const sortedByMarketCap = Object.entries(priceBackup)
    .filter(([_, data]) => data?.market_cap)
    .sort((a, b) => b[1].market_cap - a[1].market_cap)
    .slice(0, 10);

  //  MODAL (FIXED)
  const handleOpenModal = (symbol) => {
    const backup = priceBackup[symbol] || {};
    const ticker = pricesTicker[symbol] || {};

    setSelectedCoin({
      symbol,
      ...backup,
      current_price: ticker.lastPrice ?? backup.current_price ?? 0,
      pricePercentage:
        ticker.priceChangePercent ??
        backup.price_change_percentage_24h ??
        0,
      ath_change_percentage: backup.ath_change_percentage ?? 0,
    });
  };

  return (
    <div>
      {loading
        ? Array.from({ length: 10 }).map((_, idx) => (
            <li key={idx} style={{ marginTop: "18px" }}>
              <div className="coin-item style-2 gap-12 skeleton-loader">
                <div className="content">
                  <div className="title">
                    <div
                      className="skeleton skeleton-text"
                      style={{ width: "60px", height: "16px" }}
                    />
                  </div>
                  <div className="d-flex align-items-center gap-12">
                    <div
                      className="skeleton skeleton-text"
                      style={{ width: "70px", height: "14px" }}
                    />
                    <div
                      className="skeleton skeleton-text"
                      style={{ width: "50px", height: "14px" }}
                    />
                    <div
                      className="skeleton skeleton-text"
                      style={{ width: "80px", height: "14px" }}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))
        : sortedByMarketCap.map(([symbol, data]) => {
            const ticker = pricesTicker[symbol] || {};

            const lastPrice =
              ticker?.lastPrice ?? data?.current_price ?? 0;

            const change =
              ticker?.priceChangePercent ??
              data?.price_change_percentage_24h;

            const isUp = Number(change) >= 0;

            return (
              <li key={symbol} style={{ marginTop: "18px" }}>
                <div
                  className="coin-item style-2 gap-12"
                  style={{ cursor: "pointer", transition: "0.2s ease" }}
                  onClick={() => handleOpenModal(symbol)}
                >
                  <div className="content" style={{ width: "100%" }}>
                    {/* HEADER */}
                    <div
                      className="title"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p className="mb-4 text-button">{symbol}</p>

                      <span
                        style={{
                          fontSize: "12px",
                          padding: "3px 10px",
                          borderRadius: "20px",
                          background: isUp ? "#25c86620" : "#ff4d4f20",
                          color: isUp ? "#25c866" : "#ff4d4f",
                          fontWeight: "600",
                          marginLeft: "10px",
                        }}
                      >
                        {change !== undefined
                          ? `${Number(change).toFixed(2)}%`
                          : "--"}
                      </span>
                    </div>

                    {/* BODY */}
                    <div
                      className="d-flex align-items-center justify-content-between"
                      style={{ marginTop: "6px" }}
                    >
                      <span className="text-small">
                        $
                        {Number(lastPrice).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>

                      <span className="text-button" style={{ opacity: 0.7 }}>
                        {formatMarketCap(data?.market_cap)}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}

      {/* VIEW MORE */}
      <div className="d-block m-2 coin-item p-2 text-center">
        <NavLink to="/wallet">
          <span className="text-small text-primary">View More</span>
        </NavLink>
      </div>

      {/* MODAL */}
      {selectedCoin && (
        <DetailChartModal
          details={selectedCoin}
          isOpen={!!selectedCoin}
          onClose={() => setSelectedCoin(null)}
        />
      )}
    </div>
  );
};

export default MarketCap;