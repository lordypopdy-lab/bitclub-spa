import axios from "../../../services/api";
import { useEffect, useMemo, useState } from "react";

const HistoryModal = () => {
  const [history, setHistory] = useState([]);
  const [rawHistory, setRawHistory] = useState([]);

  const [timeFilter, setTimeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // ================= FETCH =================
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) return;

        const { data } = await axios.post("/getHistory", { email });

        const list = data?.historyList || [];
        const reversed = [...list].reverse();

        setRawHistory(reversed);
        setHistory(reversed);
      } catch (err) {
        console.log("History error:", err);
      }
    };

    fetchHistory();
  }, []);

  // ================= FILTER =================
  const filteredHistory = useMemo(() => {
    let filtered = [...rawHistory];

    if (timeFilter !== "All") {
      const now = Date.now();

      const map = {
        "24 Hours": 1,
        "7 Days": 7,
        "12 Days": 12,
        "30 Days": 30,
        "3 Month": 90,
        "6 Month": 180,
        "12 Month": 365,
      };

      const days = map[timeFilter];

      if (days) {
        filtered = filtered.filter((item) => {
          const time = new Date(item.timestamp).getTime();
          return now - time <= days * 86400000;
        });
      }
    }

    if (categoryFilter !== "All") {
      filtered = filtered.filter((item) => {
        if (categoryFilter === "Transfer money") {
          return item.type === "Sent";
        }
        if (categoryFilter === "Receive money") {
          return item.type === "Deposite" || item.type === "Receive";
        }
        return true;
      });
    }

    return filtered;
  }, [rawHistory, timeFilter, categoryFilter]);

  // ================= SAFE MODAL HANDLER =================
  const closeModal = (id) => {
    // 👇 remove focus BEFORE closing modal (FIX ARIA ERROR)
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const modalEl = document.getElementById(id);
    if (!modalEl || !window.bootstrap) return;

    const instance = window.bootstrap.Modal.getInstance(modalEl);
    instance?.hide();
  };

  const openModal = (id) => {
    const modalEl = document.getElementById(id);
    if (!modalEl || !window.bootstrap) return;

    const instance = new window.bootstrap.Modal(modalEl);
    instance.show();
  };

  // ================= APPLY =================
  const applyFilter = () => {
    setHistory(filteredHistory);

    closeModal("filterHistory");

    setTimeout(() => {
      openModal("walletHistory");
    }, 150);
  };

  const resetFilter = () => {
    setTimeFilter("All");
    setCategoryFilter("All");
    setHistory(rawHistory);

    closeModal("filterHistory");

    setTimeout(() => {
      openModal("walletHistory");
    }, 150);
  };

  // ================= ITEM =================
  const renderItem = (item, index) => {
    const isNegative =
      item.type === "Deposite" || item.type === "Sent";

    return (
      <li key={item._id || index} className="mt-8">
        <div className="coin-item style-1 gap-12 bg-menuDark">
          <span className="box-round d-flex justify-content-center align-items-center">
            <i style={{ fontSize: "20px" }} className="icon icon-delete"></i>
          </span>

          <div className="content">
            <div className="title">
              <p className="mb-4 text-large">{item.type}</p>

              {item.Status === "Success" ? (
                <span className="text-success">{item.Status}</span>
              ) : (
                <span className="text-warning">{item.Status}</span>
              )}
            </div>

            <div className="box-price">
              <p className="text-small mb-4">
                <span className={isNegative ? "text-danger" : "text-primary"}>
                  {isNegative ? "-" : "+"}
                </span>{" "}
                ETH {item.valueEth}
              </p>

              <p className="text-small">
                <span className={isNegative ? "text-danger" : "text-primary"}>
                  {isNegative ? "-" : "+"}
                </span>{" "}
                ${item.valueUsd?.toFixed(2) || "0.00"}
              </p>
            </div>
          </div>
        </div>
      </li>
    );
  };

  return (
    <>
      {/* MAIN MODAL */}
      <div className="modal fade modalRight" id="walletHistory">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="header fixed-top bg-surface d-flex justify-content-center align-items-center">
              <span className="left" data-bs-dismiss="modal">
                <i className="icon-left-btn"></i>
              </span>

              <h3>History</h3>

              <span
                className="right text-white btn-filter-history"
                data-bs-toggle="modal"
                data-bs-target="#filterHistory"
              >
                <i className="icon-funnel"></i>
              </span>
            </div>

            <div className="overflow-auto pt-45 pb-16">
              <div className="tf-container">
                <ul className="mt-4">
                  {history.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#888" }}>
                      No history found
                    </p>
                  ) : (
                    history.map(renderItem)
                  )}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="modal fade action-sheet" id="filterHistory">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <span>Filters</span>
              <span
                className="icon-cancel"
                data-bs-dismiss="modal"
              ></span>
            </div>

            <div className="modal-body">

              <div className="text-button fw-6 text-white">Time</div>
              <ul className="grid-2 rcg-12-16 mt-16">
                {["All","24 Hours","7 Days","12 Days","30 Days","3 Month","6 Month","12 Month"].map((t) => (
                  <li key={t}>
                    <button
                      onClick={() => setTimeFilter(t)}
                      className={`tf-btn xs line text-secondary bg-transparent ${timeFilter === t ? "active" : ""}`}
                    >
                      {t}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="text-button fw-6 text-white mt-16">
                Categories
              </div>
              <ul className="grid-2 rcg-12-16 mt-16">
                {["All","Transfer money","Receive money"].map((c) => (
                  <li key={c}>
                    <button
                      onClick={() => setCategoryFilter(c)}
                      className={`tf-btn xs line text-secondary bg-transparent ${categoryFilter === c ? "active" : ""}`}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-16 pt-16 line-t grid-2 gap-16">
                <button onClick={resetFilter} className="tf-btn sm secondary">
                  Reset
                </button>

                <button onClick={applyFilter} className="tf-btn sm primary">
                  Apply
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryModal;