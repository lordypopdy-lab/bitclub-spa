import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeHeader from "./HomeHeader.jsx";
import HomeQuickActions from "./HomeQuickActions.jsx";
import HomeMarketCards from "./HomeMarketCards.jsx";
import HomeCarousel from "./HomeCarousel.jsx";
import HomeTabs from "./HomeTabs.jsx";
import HomeSubTabs from "./HomeSubTabs.jsx";
import HomeCoinList from "./HomeCoinList.jsx";
import MenubarFooter from "../ui/MenubarFooter.jsx";
import { MAIN_TABS, SUB_TABS } from "./data/mockData.js";

const Home = () => {
  const [tab, setTab] = useState("Spot");
  const subs = SUB_TABS[tab] || [];
  const [sub, setSub] = useState(subs[0]);

  const onChangeTab = (t) => {
    setTab(t);
    setSub((SUB_TABS[t] || [])[0]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        paddingBottom: 80,
      }}
    >
      <HomeHeader />
      <HomeQuickActions />
      <HomeMarketCards />
      <HomeCarousel />
      <div style={{ marginTop: 10 }}>
        <HomeTabs tabs={MAIN_TABS} active={tab} onChange={onChangeTab} />
        {subs.length > 0 && <HomeSubTabs tabs={subs} active={sub} onChange={setSub} />}
        <HomeCoinList tab={tab} key={tab + sub} />
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px);} to { opacity: 1; transform: none;} }
        ::-webkit-scrollbar { display: none; }
      `}</style>
      <MenubarFooter />
    </div>
  );
};

export default Home;
