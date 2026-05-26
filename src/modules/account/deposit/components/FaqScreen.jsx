import React from "react";
import { FiChevronRight } from "react-icons/fi";
import ScreenHeader from "../../components/ScreenHeader.jsx";
import { FAQS } from "../data/mockData.js";

const FaqScreen = () => (
  <div style={{ background: "#0a0b0d", minHeight: "100vh", color: "#fff" }}>
    <ScreenHeader title="FAQ" />
    <div style={{ padding: "8px 0" }}>
      {FAQS.map((q, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "18px 16px",
            borderBottom: "1px solid #15171b",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 15, lineHeight: 1.45, flex: 1 }}>{q}</span>
          <FiChevronRight color="#7d828a" />
        </div>
      ))}
    </div>
  </div>
);

export default FaqScreen;
