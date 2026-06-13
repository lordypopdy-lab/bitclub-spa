import React, { useMemo, useState } from "react";
import RewardsHeader from "./components/RewardsHeader.jsx";
import SummaryCard from "./components/SummaryCard.jsx";
import VoucherCard from "./components/VoucherCard.jsx";
import SelectSheet from "./components/SelectSheet.jsx";
import NotesSheet from "./components/NotesSheet.jsx";
import CheckInSheet from "./components/CheckInSheet.jsx";
import MysteryBoxSheet from "./components/MysteryBoxSheet.jsx";
import RulesFaqSheet from "./components/RulesFaqSheet.jsx";
import MoreMenuSheet from "./components/MoreMenuSheet.jsx";
import RewardsBottomNav from "./components/RewardsBottomNav.jsx";
import ReferralFab from "./components/ReferralFab.jsx";
import Toaster from "./components/Toaster.jsx";
import { Link } from "react-router-dom";
import { useRewardsStore } from "./hooks/useRewardsStore.js";
import {
  REDEEM_ITEMS,
  PRODUCT_OPTIONS,
  REWARD_TYPE_OPTIONS,
} from "./data/config.js";
import { FiChevronDown } from "react-icons/fi";

const Redeem = () => {
  const store = useRewardsStore();
  const [tab, setTab] = useState("vouchers");
  const [product, setProduct] = useState("All");
  const [type, setType] = useState("All");
  const [productSheet, setProductSheet] = useState(false);
  const [typeSheet, setTypeSheet] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [boxOpen, setBoxOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const items = useMemo(
    () =>
      REDEEM_ITEMS.filter((it) => {
        const okP = product === "All" || it.product === product;
        const okT = type === "All" || it.type === type;
        return okP && okT;
      }),
    [product, type],
  );

  const handleRedeem = (item) => {
    const r = store.redeem(item.id);
    if (!r.ok && r.reason === "insufficient") setNotesOpen(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        paddingBottom: 96,
      }}
    >
      <RewardsHeader
        onHelp={() => setRulesOpen(true)}
        onMore={() => setMoreOpen(true)}
      />
      <SummaryCard
        points={store.state.points}
        couponsCount={
          store.state.coupons.filter((c) => c.status === "active").length
        }
        onCheckIn={() => setCheckInOpen(true)}
        tier={store.tier}
      />

      <div style={{ padding: "32px 16px 0", display: "flex", gap: 24 }}>
        {[
          { k: "vouchers", l: "Redeem vouchers" },
          { k: "merch", l: "LALIGA merch" },
        ].map(({ k, l }) => (
          <Link
            key={k}
            onClick={() => setTab(k)}
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              color: tab === k ? "#fff" : "#7d828a",
              fontSize: 18,
              fontWeight: tab === k ? 800 : 500,
              cursor: "pointer",
            }}
          >
            {l}
          </Link>
        ))}
      </div>

      {tab === "vouchers" ? (
        <>
          <div style={{ padding: "16px 16px 0", display: "flex", gap: 12 }}>
            <Link onClick={() => setProductSheet(true)} style={selectStyle}>
              <span>{product === "All" ? "Product" : product}</span>
              <FiChevronDown size={14} />
            </Link>
            <Link onClick={() => setTypeSheet(true)} style={selectStyle}>
              <span>{type === "All" ? "Reward type" : type}</span>
              <FiChevronDown size={14} />
            </Link >
          </div>
          <div
            style={{
              padding: "16px 16px 0",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            {items.map((it) => (
              <VoucherCard
                key={it.id}
                item={it}
                canRedeem={store.state.points >= it.cost}
                onRedeem={() => handleRedeem(it)}
              />
            ))}
            {items.length === 0 && (
              <div
                style={{
                  gridColumn: "1 / -1",
                  color: "#7d828a",
                  textAlign: "center",
                  padding: 40,
                  fontSize: 13,
                }}
              >
                No vouchers match these filters.
              </div>
            )}
          </div>
        </>
      ) : (
        <div
          style={{
            color: "#7d828a",
            textAlign: "center",
            padding: 60,
            fontSize: 14,
          }}
        >
          LALIGA merch — coming soon.
        </div>
      )}

      <SelectSheet
        open={productSheet}
        onClose={() => setProductSheet(false)}
        title="Product"
        options={PRODUCT_OPTIONS}
        value={product}
        onSelect={setProduct}
      />
      <SelectSheet
        open={typeSheet}
        onClose={() => setTypeSheet(false)}
        title="Reward type"
        options={REWARD_TYPE_OPTIONS}
        value={type}
        onSelect={setType}
      />
      <NotesSheet
        open={notesOpen}
        onClose={() => setNotesOpen(false)}
        onEarn={() => window.history.back()}
      />
      <CheckInSheet
        open={checkInOpen}
        onClose={() => setCheckInOpen(false)}
        streak={store.state.streak}
        lastCheckInDate={store.state.lastCheckInDate}
        onCheckIn={() => {
          const r = store.checkIn();
          if (r?.type === "mystery") {
            setCheckInOpen(false);
            setBoxOpen(true);
          }
          return r;
        }}
        onOpenBox={() => {
          setCheckInOpen(false);
          setBoxOpen(true);
        }}
      />
      <MysteryBoxSheet
        open={boxOpen}
        onClose={() => setBoxOpen(false)}
        onOpen={store.openMysteryBox}
      />
      <RulesFaqSheet open={rulesOpen} onClose={() => setRulesOpen(false)} />
      <MoreMenuSheet open={moreOpen} onClose={() => setMoreOpen(false)} />
      <Toaster notifs={store.state.notifs} onDismiss={store.dismissNotif} />
      <ReferralFab />
      <RewardsBottomNav />
    </div>
  );
};

const selectStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "transparent",
  border: "1px solid #2a2e35",
  borderRadius: 8,
  padding: "12px 14px",
  color: "#cfd2d6",
  fontSize: 14,
  cursor: "pointer",
};

export default Redeem;
