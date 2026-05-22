import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Sparkline from "../Sparkline";
import { DetailChartModal } from "../../models/DetailChartModal";
import { useMarketSocket } from "../../../../hooks/useMarketSocket";

const WalletView = () => {
  const [priceBackup, setPriceBack] = useState({});
  const [sparklineData, setSparklineData] = useState({});
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

  // Build sparkline from LIVE data
  useEffect(() => {
    Object.keys(pricesTicker).forEach((symbol) => {
      const price = Number(pricesTicker[symbol]?.lastPrice);
      if (!price) return;

      setSparklineData((prev) => {
        const prevData = prev[symbol] || [];
        const updated = [...prevData, price].slice(-50);
        return { ...prev, [symbol]: updated };
      });
    });
  }, [pricesTicker]);

  const coins = [
    { symbol: "BTC", name: "Bitcoin" },
    { symbol: "ETC", name: "Ethereum Classic" },
    { symbol: "XRP", name: "Ripple" },
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "TRX", name: "TRON" },
    { symbol: "FIL", name: "Filecoin" },
    { symbol: "USDC", name: "USD Coin" },
    { symbol: "SOL", name: "Solana" },
  ];

  const handleOpenModal = (coin) => {
    setSelectedCoin({
      symbol: coin.symbol,
      name: coin.name,
    });
    setIsModalOpen(true);
  };

  return (
    <div>
      {coins.map((coin) => {
        const symbol = coin.symbol;

        const liveData = pricesTicker?.[symbol];
        const backupData = priceBackup?.[symbol];

        const currentPrice =
          liveData?.lastPrice ?? backupData?.current_price ?? 0;

        const priceChangeValue =
          !isNaN(Number(liveData?.priceChangePercent))
            ? Number(liveData.priceChangePercent)
            : !isNaN(Number(backupData?.price_change_percentage_24h))
            ? Number(backupData.price_change_percentage_24h)
            : NaN;

        const isUp = priceChangeValue >= 0;

        const sparkData =
          sparklineData[symbol] ||
          backupData?.sparkline_in_7d?.price?.slice(-50) ||
          [];

        return (
          <li key={symbol} style={{ marginTop: "18px" }}>
            <a
              className="coin-item justify-content-between"
              onClick={() => handleOpenModal(coin)}
            >
              <div className="d-flex align-items-center flex-1">
                <p>
                  <span className="mb-4 text-button fw-6">{symbol}</span>
                  <span className="text-secondary">/ USDT</span>
                </p>
              </div>

              <div className="d-flex align-items-center gap-2 flex-st2">
                <span className="text-small">
                  {Number(currentPrice).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>

                {/* Sparkline */}
                <div
                  style={{
                    width: "110px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 6px",
                  }}
                >
                  <Sparkline
                    width={110}
                    height={40}
                    priceChangePercent={priceChangeValue}
                    data={sparkData}
                  />
                </div>

                <div className="text-end">
                  <span
                    className={`text-button ${
                      isUp ? "text-primary" : "text-red"
                    }`}
                  >
                    {isNaN(priceChangeValue)
                      ? "--"
                      : priceChangeValue.toFixed(3)}
                    %
                  </span>

                  <p className="mt-4 text-secondary">
                    ${Number(currentPrice).toLocaleString()}
                  </p>
                </div>
              </div>
            </a>
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

            sparkline_in_7d:
              sparklineData[selectedCoin.symbol] ||
              priceBackup?.[selectedCoin.symbol]?.sparkline_in_7d?.price?.slice(
                -50
              ) ||
              [],
          }}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default WalletView;