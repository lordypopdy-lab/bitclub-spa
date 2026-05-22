import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AssetTabs from "./components/AssetTabs.jsx";
import MenubarFooter from "../ui/MenubarFooter.jsx";
import AssetsOverview from "./AssetsOverview.jsx";
import AssetsSpot from "./AssetsSpot.jsx";
import AssetsFutures from "./AssetsFutures.jsx";
import AssetsMargin from "./AssetsMargin.jsx";
import AssetsEarn from "./AssetsEarn.jsx";

const TABS = ["Overview", "Spot", "Futures", "Margin", "Earn"];

const renderTab = (t) => {
  switch (t) {
    case "Spot":
      return <AssetsSpot />;
    case "Futures":
      return <AssetsFutures />;
    case "Margin":
      return <AssetsMargin />;
    case "Earn":
      return <AssetsEarn />;
    default:
      return <AssetsOverview />;
  }
};

const Assets = () => {
  const [active, setActive] = useState("Overview");
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
      <AssetTabs tabs={TABS} active={active} onChange={setActive} />
      <div key={active} style={{ animation: "fadeIn 0.25s ease" }}>
        {renderTab(active)}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px);} to { opacity: 1; transform: none;} }
        ::-webkit-scrollbar { display: none; }
      `}</style>
     <MenubarFooter />
    </div>
  );
};

export default Assets;
