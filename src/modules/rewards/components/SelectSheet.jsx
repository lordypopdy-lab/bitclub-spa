import React from "react";
import Sheet from "./Sheet.jsx";
import { Link } from "react-router-dom";

const SelectSheet = ({ open, onClose, title, options, value, onSelect }) => (
  <Sheet open={open} onClose={onClose} title={title}>
    <div>
      {options.map((opt) => (
        <Link
          key={opt}
          onClick={() => {
            onSelect(opt);
            onClose();
          }}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            color: opt === value ? "#22c1c3" : "#fff",
            textAlign: "left",
            padding: "18px 4px",
            fontSize: 16,
            fontWeight: opt === value ? 700 : 500,
            cursor: "pointer",
          }}
        >
          {opt}
        </Link>
      ))}
    </div>
  </Sheet>
);

export default SelectSheet;
