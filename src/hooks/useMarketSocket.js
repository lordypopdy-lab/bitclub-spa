import { useEffect, useState } from "react";
import { getMarketSocket } from "../utils/marketSocket";

export const useMarketSocket = () => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const socket = getMarketSocket();

    const handleMessage = (event) => {
      const msg = JSON.parse(event.data);

      const rawSymbol = msg.symbol?.toUpperCase();
      if (!rawSymbol) return;

      const symbol = rawSymbol.replace("USDT", "");

      setPrices((prev) => ({
        ...prev,
        [symbol]: {
          ...(prev[symbol] || {}),
          ...msg,
        },
      }));
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage); 
    };
  }, []);

  return prices;
};