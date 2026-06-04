import React, { useMemo, useState } from "react";
import { FiSearch, FiMoreHorizontal, FiChevronRight } from "react-icons/fi";
import MenubarFooter from "../../account/ui/MenubarFooter";
import MainTabs from "./MainTabs";
import SubTabs from "./SubTabs";
import FilterChips from "./FilterChips";
import OverviewCard from "./OverviewCard";
import CoinListRow from "./CoinListRow";
import SortHeader from "./SortHeader";
import PromoCarousel from "./PromoCarousel";
import FavoritesPicker from "./FavoritesPicker";
import useLivePrices from "../hooks/useLivePrices";
import {
  OVERVIEW_CARDS,
  CRYPTO_COINS,
  NEW_LISTINGS,
  FUTURES_COINS,
  MARGIN_COINS,
  STOCKS_COINS,
  TRADFI_COINS,
  MAIN_TABS,
  SUB_TABS,
  SPOT_FILTERS,
  FUTURES_FILTERS,
  MARGIN_FILTERS,
} from "../data/marketMockData";

const MarketsScreen = () => {
  const [main, setMain] = useState("Overview");
  const [subMap, setSubMap] = useState({
    Overview: "Hot",
    Favorites: "All",
    Crypto: "Spot",
    Stocks: "Tech",
    TradFi: "Forex",
  });
  const [spotFilter, setSpotFilter] = useState("All");
  const [futuresFilter, setFuturesFilter] = useState("All");
  const [marginFilter, setMarginFilter] = useState("All");
  const [query, setQuery] = useState("");

  const sub = subMap[main];
  const setSub = (v) => setSubMap((m) => ({ ...m, [main]: v }));

  const live = useLivePrices(CRYPTO_COINS, 2500, 0.0025);
  const liveNew = useLivePrices(NEW_LISTINGS, 2800, 0.005);
  const liveFut = useLivePrices(FUTURES_COINS, 2200, 0.003);
  const liveMargin = useLivePrices(MARGIN_COINS, 2400, 0.003);
  const liveStocks = useLivePrices(STOCKS_COINS, 3000, 0.002);
  const liveTradfi = useLivePrices(TRADFI_COINS, 3500, 0.0015);

  const filt = (arr) =>
    !query ? arr : arr.filter((c) => c.symbol.toLowerCase().includes(query.toLowerCase()));

  const renderBody = () => {
    if (main === "Overview") {
      return (
        <div key="ov" style={{ animation: "fadeIn .25s ease" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
              paddingTop: 12,
            }}
          >
            {OVERVIEW_CARDS.map((c) => (
              <OverviewCard key={c.symbol} {...c} />
            ))}
          </div>
          <PromoCarousel />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 22,
              marginBottom: 4,
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>Crypto</div>
            <FiChevronRight color="#7d828a" />
          </div>
          {filt(live).slice(0, 6).map((c) => (
            <CoinListRow key={c.id} coin={c} />
          ))}
        </div>
      );
    }

    if (main === "Favorites") {
      if (sub === "Futures") {
        return (
          <FavoritesPicker
            pairs={["BTCUSDT", "ETHUSDT", "XRPUSDT", "LINKUSDT", "DOTUSDT", "TRXUSDT", "LTCUSDT", "UNIUSDT", "SUSHIUSDT"]}
          />
        );
      }
      if (sub === "Margin") {
        return (
          <FavoritesPicker
            pairs={["BTC / USDT", "ETH / USDT", "BGB / USDT", "XRP / USDT", "UNI / USDT", "DOGE / USDT"]}
          />
        );
      }
      if (sub === "Holdings") {
        return (
          <div key="hold" style={{ animation: "fadeIn .25s ease" }}>
            <SortHeader leftLabel="Coin/amount/value" />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "16px 0",
                borderBottom: "1px solid #14171b",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#1c1f23",
                  marginRight: 12,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: 700 }}>GOATS</div>
                <div style={{ color: "#7d828a", fontSize: 12 }}>451.6 ≈ €0.00</div>
              </div>
              <div style={{ color: "#7d828a", marginRight: 16 }}>--</div>
              <div
                style={{
                  background: "#3a3d42",
                  color: "#1a1d22",
                  padding: "6px 18px",
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                --
              </div>
            </div>
          </div>
        );
      }
      const rows = sub === "Spot" ? live.slice(0, 6) : live.slice(0, 6);
      return (
        <div key={"fav" + sub} style={{ animation: "fadeIn .25s ease" }}>
          <SortHeader />
          {filt(rows).map((c) => (
            <CoinListRow key={c.id} coin={c} />
          ))}
        </div>
      );
    }

    if (main === "Crypto") {
      if (sub === "Spot") {
        const data = spotFilter === "New" ? liveNew : live;
        return (
          <div key="spot" style={{ animation: "fadeIn .25s ease" }}>
            <FilterChips items={SPOT_FILTERS} active={spotFilter} onChange={setSpotFilter} trailing="All" />
            <SortHeader />
            {filt(data).map((c) => (
              <CoinListRow key={c.id} coin={c} starred={["BTC", "ETH"].includes(c.symbol) && spotFilter === "All"} />
            ))}
          </div>
        );
      }
      if (sub === "Futures") {
        return (
          <div key="fut" style={{ animation: "fadeIn .25s ease" }}>
            <FilterChips items={FUTURES_FILTERS} active={futuresFilter} onChange={setFuturesFilter} trailing="USDT-M Futur..." />
            <SortHeader />
            {filt(liveFut).map((c) => (
              <CoinListRow key={c.id + "f"} coin={{ ...c, symbol: c.symbol + c.quote, quote: "" }} />
            ))}
          </div>
        );
      }
      return (
        <div key="mar" style={{ animation: "fadeIn .25s ease" }}>
          <FilterChips items={MARGIN_FILTERS} active={marginFilter} onChange={setMarginFilter} trailing="All" />
          <SortHeader />
          {filt(liveMargin).map((c) => (
            <CoinListRow key={c.id + "m"} coin={c} showLeverage />
          ))}
        </div>
      );
    }

    if (main === "Stocks") {
      return (
        <div key={"st" + sub} style={{ animation: "fadeIn .25s ease" }}>
          <SortHeader />
          {filt(liveStocks).map((c) => (
            <CoinListRow key={c.id} coin={c} />
          ))}
        </div>
      );
    }

    return (
      <div key={"tf" + sub} style={{ animation: "fadeIn .25s ease" }}>
        <SortHeader />
        {filt(liveTradfi).map((c) => (
          <CoinListRow key={c.id} coin={c} />
        ))}
      </div>
    );
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff", paddingBottom: 90 }}>
      <div style={{ padding: "16px 16px 0", position: "sticky", top: 0, background: "#000", zIndex: 10 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#15171a",
            borderRadius: 10,
            padding: "11px 14px",
            gap: 10,
          }}
        >
          <FiSearch color="#7d828a" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="preOPAI"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: 14,
            }}
          />
          <FiMoreHorizontal color="#7d828a" />
        </div>
        <MainTabs tabs={MAIN_TABS} active={main} onChange={setMain} />
        {SUB_TABS[main] && (
          <SubTabs tabs={SUB_TABS[main]} active={sub} onChange={setSub} showEdit={main === "Favorites"} />
        )}
      </div>

      <div style={{ padding: "0 16px" }}>{renderBody()}</div>

      <MenubarFooter />
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px);} to { opacity:1; transform:none; } }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default MarketsScreen;
