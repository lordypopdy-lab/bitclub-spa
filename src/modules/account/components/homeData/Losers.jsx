import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DetailChartModal } from "../../models/DetailChartModal";
import { useMarketSocket } from "../../../../hooks/useMarketSocket";

const Losers = () => {
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

  //  LOSERS (LIVE)
  const losersList = Object.keys(pricesTicker)
    .filter((symbol) => Number(pricesTicker[symbol]?.priceChangePercent) < 0)
    .sort(
      (a, b) =>
        pricesTicker[a].priceChangePercent -
        pricesTicker[b].priceChangePercent
    )
    .slice(0, 10);

  //  FALLBACK
  const fallbackList = Object.keys(priceBackup)
    .filter(
      (symbol) =>
        Number(priceBackup[symbol]?.price_change_percentage_24h) < 0
    )
    .sort(
      (a, b) =>
        priceBackup[a].price_change_percentage_24h -
        priceBackup[b].price_change_percentage_24h
    )
    .slice(0, 10);

  const finalList = losersList.length > 0 ? losersList : fallbackList;

  //  MODAL
  const handleOpenModal = (symbol) => {
    setSelectedCoin({
      symbol,
      name: priceBackup?.[symbol]?.name || symbol,
    });

    setIsModalOpen(true);
  };

  //  FORMATTERS
  const formatPrice = (symbol) => {
    const live = pricesTicker?.[symbol]?.lastPrice;
    const backup = priceBackup?.[symbol]?.current_price || 0;

    return Number(live ?? backup).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 5,
    });
  };

  const formatChange = (symbol) => {
    const live = pricesTicker?.[symbol]?.priceChangePercent;
    const backup = priceBackup?.[symbol]?.price_change_percentage_24h;

    const value =
      !isNaN(Number(live)) ? Number(live) :
      !isNaN(Number(backup)) ? Number(backup) :
      null;

    if (value === null) return { text: "--", isDown: true };

    return {
      text: value.toFixed(2) + "%",
      isDown: value < 0,
    };
  };

  return (
    <div>
      {finalList.map((symbol, index) => {
        const change = formatChange(symbol);

        return (
          <li key={symbol} style={{ marginTop: "18px" }}>
            <NavLink
              className="coin-item justify-content-between"
              onClick={() => handleOpenModal(symbol)}
            >
              <div className="d-flex align-items-center gap-12 flex-1">
                <h4 className="text-primary">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </h4>

                <p>
                  <span className="mb-4 text-button fw-6">{symbol}</span>
                  <span className="text-secondary"> / USDT</span>
                </p>
              </div>

              <div className="d-flex justify-content-between align-items-center flex-st2">
                <span className="text-small">
                  ${formatPrice(symbol)}
                </span>

                <div className="text-end">
                  <span className="text-red">{change.text}</span>

                  <p className="mt-4 text-secondary">
                    ${formatPrice(symbol)}
                  </p>
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

export default Losers;