export const fetchTokens = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
    );

    const data = await response.json();

    if (data.length > 0) {
      localStorage.setItem("tokens", JSON.stringify(data));
    }

    return data;
  } catch (error) {
    return [];
  }
};

export const getStoredTokens = () => {
  const tokens = localStorage.getItem("tokens");
  return tokens ? JSON.parse(tokens) : [];
};