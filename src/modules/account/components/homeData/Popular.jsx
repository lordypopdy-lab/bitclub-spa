import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DetailChartModal } from "../../models/DetailChartModal";
import { useMarketSocket } from "../../../../hooks/useMarketSocket";

const Popular = () => {
  const [priceBackup, setPriceBack] = useState({});
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // GLOBAL WebSocket
  const pricesTicker = useMarketSocket();

  useEffect(() => {
    const rawData = JSON.parse(localStorage.getItem("tokens")) || [];
    const transformed = {};

    rawData.forEach((coin) => {
      if (coin.symbol) transformed[coin.symbol.toUpperCase()] = coin;
    });

    setPriceBack(transformed);
  }, []);

  const coins = ["BTC", "ETH", "SOL", "BNB", "XRP", "LINK", "TRX", "DOGE"];

  const handleOpenModal = (symbol) => {
    setSelectedCoin({ symbol });
    setIsModalOpen(true);
  };

  // FIXED (no USDT)
  const renderPriceChange = (symbol) => {
    const ticker = pricesTicker[symbol];
    const backup = priceBackup[symbol];

    const change =
      ticker?.priceChangePercent ?? backup?.price_change_percentage_24h;

    if (change === undefined) return { text: "--", isUp: true };

    return {
      text: Number(change).toFixed(3) + "%",
      isUp: Number(change) >= 0,
    };
  };

  const renderPrice = (symbol) => {
    const ticker = pricesTicker[symbol];
    const backup = priceBackup[symbol];

    return ticker?.lastPrice ?? backup?.current_price ?? 0;
  };

  const formatVolume = (value) => {
    const num = Number(value || 0);
    if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
    return num.toFixed(2);
  };

  const renderVolume = (symbol) => {
    const ticker = pricesTicker[symbol];
    const backup = priceBackup[symbol];

    return ticker?.volume ?? backup?.volume ?? 0;
  };

  return (
    <div>
      {coins.map((coin) => {
        const change = renderPriceChange(coin);

        return (
          <li key={coin} style={{ marginTop: "18px" }}>
            <NavLink
              className="coin-item style-2 gap-12"
              onClick={() => handleOpenModal(coin)}
            >
              <img
                src={priceBackup[coin]?.image || "/default-icon.png"}
                alt={`${coin} Logo`}
                className="img"
              />

              <div className="content">
                <div className="title">
                  <p className="mb-4 text-button">{coin}</p>

                  <span className="text-secondary">
                    ${formatVolume(renderVolume(coin))}
                  </span>
                </div>

                <div className="d-flex align-items-center gap-12">
                  <span className="text-small">
                    $
                    {Number(renderPrice(coin)).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 5,
                    })}
                  </span>

                  <span
                    className={`coin-btn ${
                      change.isUp ? "increase" : "decrease"
                    }`}
                  >
                    {change.text}
                  </span>
                </div>
              </div>
            </NavLink>
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
          details={{
            ...selectedCoin,
            current_price:
              pricesTicker?.[selectedCoin.symbol]?.lastPrice ??
              priceBackup?.[selectedCoin.symbol]?.current_price ??
              0,

            pricePercentage:
              pricesTicker?.[selectedCoin.symbol]?.priceChangePercent ??
              priceBackup?.[selectedCoin.symbol]
                ?.price_change_percentage_24h ??
              0,

            ath_change_percentage:
              priceBackup?.[selectedCoin.symbol]?.ath_change_percentage ?? 0,
          }}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Popular;