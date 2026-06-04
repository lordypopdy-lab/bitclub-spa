import React from "react";
import {
  FiBell,
  FiGift,
  FiMail,
  FiTrendingUp,
  FiStar,
  FiFileText,
} from "react-icons/fi";
import { HiSpeakerphone } from "react-icons/hi";
import { BsConfetti } from "react-icons/bs";

const map = {
  megaphone: HiSpeakerphone,
  party: BsConfetti,
  news: FiFileText,
  chart: FiTrendingUp,
  sparkle: FiStar,
  gift: FiGift,
  mail: FiMail,
  bell: FiBell,
};

const CategoryIcon = ({ name, color = "#cfd2d6", size = 18 }) => {
  const Cmp = map[name] || FiBell;
  return (
    <div
      style={{
        width: 38,
        height: 38,
        borderRadius: "50%",
        background: "#1a1d22",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Cmp size={size} color={color} />
    </div>
  );
};

export default CategoryIcon;
