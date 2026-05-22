import { useEffect, useState, useCallback } from "react";
import axios from "../../../services/api";

const AccountListModal = () => {
  const [accounts, setAccounts] = useState([]);
  const [copied, setCopied] = useState(null);

  // ================= FETCH =================
  const fetchAccounts = useCallback(async () => {
    try {
      const email = localStorage.getItem("email");
      if (!email) return;

      const { data } = await axios.post("/getAccounts", { email });
      setAccounts(data?.accounts || []);
    } catch (err) {
      console.log("Account fetch error:", err);
    }
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  // ================= FORMAT ADDRESS =================
  const formatAddress = (addr) => {
    if (!addr) return "N/A";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // ================= COPY =================
  const copyAddress = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(address);

    setTimeout(() => setCopied(null), 1500);
  };

  // ================= ITEM =================
  const renderAccount = (account, index) => {
    return (
      <li key={account.address || index} style={{ marginBottom: "12px" }}>
        <div
          onClick={() => copyAddress(account.address)}
          style={{
            background: "#0f0f0f",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "14px",
            padding: "14px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {/* LEFT */}
          <div>
            <p
              style={{
                color: "#fff",
                fontWeight: "600",
                marginBottom: "4px",
                fontSize: "14px",
              }}
            >
              {account.currency} Wallet
            </p>

            <span
              style={{
                color: copied === account.address ? "#25c866" : "#888",
                fontSize: "12px",
                transition: "0.2s",
              }}
            >
              {copied === account.address
                ? "Copied ✓"
                : formatAddress(account.address)}
            </span>
          </div>

          {/* RIGHT */}
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                color: "#25c866",
                fontWeight: "600",
                fontSize: "14px",
                margin: 0,
              }}
            >
              {account.balance?.toFixed(6) || "0.000000"}
            </p>

            <span
              style={{
                color: "#666",
                fontSize: "11px",
              }}
            >
              {account.currency}
            </span>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="modal fade action-sheet" id="accountWallet">
      <div className="modal-dialog" role="document">
        <div
          className="modal-content"
          style={{
            background: "#000",
            borderRadius: "18px 18px 0 0",
            border: "none",
          }}
        >
          {/* HEADER */}
          <div
            className="modal-header"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              padding: "16px",
            }}
          >
            <span style={{ color: "#fff", fontWeight: "600" }}>
              Wallets
            </span>

            <span
              className="icon-cancel"
              data-bs-dismiss="modal"
              style={{ color: "#888", cursor: "pointer" }}
            ></span>
          </div>

          {/* BODY */}
          <div style={{ padding: "12px 14px 20px 14px" }}>
            {accounts.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "#666",
                  marginTop: "20px",
                }}
              >
                No wallets found
              </p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {accounts.map(renderAccount)}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountListModal;