import { Link } from "react-router-dom";
import { useState } from "react";

const HomeActionMenu = () => {
  const [balance, setBalance] = useState(null);

  return (
    <div>
      <div className="pt-12 pb-12 mt-4">
        <h5>
          <span className="text-primary">My Wallet</span> -{" "}
          <button
            type="button"
            className="choose-account"
            data-bs-toggle="modal"
            data-bs-target="#accountWallet"
            style={{
              all: "unset",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <span className="dom-text">Account 1</span> &nbsp;
            <i className="icon-select-down"></i>
          </button>
        </h5>

        <h1 className="mt-16">
          <span>${balance !== null ? Number(balance).toFixed(2) : "0.00"}</span>
        </h1>

        <ul className="mt-16 grid-4 m--16">
          <li>
            <Link
              to="/Send"
              className="tf-list-item d-flex flex-column gap-8 align-items-center"
            >
              <span className="box-round bg-surface d-flex justify-content-center align-items-center">
                <i className="icon icon-way"></i>
              </span>
              Send
            </Link>
          </li>

          <li>
            <Link
              to="/AddressScan"
              className="tf-list-item d-flex flex-column gap-8 align-items-center"
            >
              <span className="box-round bg-surface d-flex justify-content-center align-items-center">
                <i className="icon icon-way2"></i>
              </span>
              Receive
            </Link>
          </li>

          <li>
            <Link
              to="/Earn"
              className="tf-list-item d-flex flex-column gap-8 align-items-center"
            >
              <span className="box-round bg-surface d-flex justify-content-center align-items-center">
                <i className="icon icon-exchange"></i>
              </span>
              Earn
            </Link>
          </li>

          <li>
            <button
              type="button"
              className="tf-list-item gap-8 text-light fw-500"
              data-bs-toggle="modal"
              data-bs-target="#walletHistory"
              style={{
                all: "unset",
                cursor: "pointer",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              <span className="box-round  bg-surface d-flex justify-content-center align-items-center">
                <i className="icon icon-history"></i>
              </span>
              History
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeActionMenu;
