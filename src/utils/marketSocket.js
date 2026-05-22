let socket = null;

export const getMarketSocket = () => {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket(import.meta.env.VITE_API_MARKET_TICKER);

    socket.onopen = () => {
      console.log("SINGLETON WebSocket connected");
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    socket.onclose = () => {
      console.warn("WebSocket disconnected");
    };
  }

  return socket;
};