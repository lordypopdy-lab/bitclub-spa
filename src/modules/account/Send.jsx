import toast from "react-hot-toast";
import axios from "../../services/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import coin3 from "../../images/coin/coin3.jpg";
import coin5 from "../../images/coin/coin5.jpg";

const Send = () => {
  const [errMessage, setErrMessage] = useState("");
  const [trxRate, setTrxRate] = useState(0);
  const [pinError, setPinError] = useState("");
  const [hasPin, setHasPin] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [valueSend, setValueSend] = useState("");
  const [balanceEth, setBalanceEth] = useState(0);
  const [balanceUsd, setBalanceUsd] = useState(null);

  const [pinInput, setPinInput] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
  });

  const [trxH, setTrxH] = useState({
    to: "",
    from: "",
    status: "",
    value: null,
    blockNumber: "",
    transactionHash: "",
  });

  useEffect(() => {
    const pinCheck = async () => {
      try {
        const email = localStorage.getItem("email");
        const { data } = await axios.post("/pinCheck", { email });
        setHasPin(data.exists === true);
      } catch (err) {
        console.log(err);
      }
    };
    pinCheck();
  }, []);

  //  COPY FUNCTION (reusable)
  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied!");
    } catch {
      toast.error("Failed to copy!");
    }
  };

  //  SEND LOGIC (cleaned)
  const SendEther = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");

    if (!userAddress) {
      return toast.error("Please Insert a valid ERC20 address");
    }

    if (!valueSend) {
      return toast.error("Enter Value to Send");
    }

    try {
      const { pin1, pin2, pin3, pin4 } = pinInput;

      const { data } = await axios.post("/pinVerify", {
        pin1,
        pin2,
        pin3,
        pin4,
        email,
      });

      if (!data.success) {
        return toast.error(data.error || "Invalid PIN");
      }

      const amount = trxRate * valueSend;

      setTrxH({
        to: userAddress,
        from: "0xYourAddress...",
        status: "Success",
        value: amount,
        blockNumber: "Pending",
        transactionHash: "Processing...",
      });

      toast.success("Transaction simulated (hook your signer here)");

      setUserAddress("");
      setValueSend("");
      setPinInput({ pin1: "", pin2: "", pin3: "", pin4: "" });
    } catch (err) {
      console.log(err);
      toast.error("Transaction Failed");
    }
  };

  //  CREATE PIN
  const createPin = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    const { pin1, pin2, pin3, pin4 } = pinInput;

    try {
      const { data } = await axios.post("/createPin", {
        pin1,
        pin2,
        pin3,
        pin4,
        email,
      });

      if (data.error) {
        setPinError("All PIN fields are required");
      } else {
        setPinError("");
        setHasPin(true);
        toast.success(data.success);
        setPinInput({ pin1: "", pin2: "", pin3: "", pin4: "" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  //  MAX
  const Max = () => {
    if (balanceEth > 0) {
      const usd = trxRate * balanceEth;
      setValueSend(balanceEth);
      setBalanceUsd(usd.toFixed(2));
      toast.success("Balance Added");
    } else {
      toast.error("Balance not Available");
    }
  };

  //  INPUT HANDLER (fixed bug)
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setValueSend(value);

    if (value > balanceEth) {
      setErrMessage("Value Entered is Greater than Balance");
    } else {
      setErrMessage("");
      const usd = trxRate * value;
      setBalanceUsd(usd.toFixed(2));
    }
  };

  //  PIN INPUT HANDLER
  const handlePinChange = (key, value) => {
    setPinInput((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className="header bg-transparent fixed-top d-flex justify-content-between align-items-center">
        <Link className="left back-btn">
          <i className="icon-left-btn"></i>
        </Link>

        <Link to="/home" className="right">
          <i className="icon-home2 fs-20"></i>
        </Link>
      </div>

      <div className="pt-45 pb-16">
        <div className="tf-container">
          <div className="mt-4 coin-item style-2 gap-8">
            <img src={coin3} alt="img" className="img" />
            <h5>Send ETH(ERC20)</h5>
          </div>

          <div className="mt-16 d-flex justify-content-between">
            <span>My Balance</span>
            <h5>ETH {balanceEth}</h5>
          </div>

          <p className="text-red">{errMessage}</p>

          <div className="mt-8 group-ip-select">
            <input
              type="text"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              placeholder="Please an ERC20 Address"
            />
            <div className="select-wrapper">
              <select className="tf-select">
                <option>ETH</option>
                <option>BTC</option>
              </select>
            </div>
          </div>

          <div className="mt-8 group-ip-select">
            <input
              type="number"
              value={valueSend}
              onChange={handleAmountChange}
              placeholder="Enter Value to Send"
            />
            <div
              style={{ marginTop: "4%", marginLeft: "3%" }}
              className="wrapper"
            >
              <span
                onClick={Max}
                className="text-primary"
                style={{ fontSize: "17px", cursor: "pointer" }}
              >
                MAX
              </span>
            </div>
          </div>

          <ul className="mt-8 d-flex gap-8">
            <li>
              <span className="tag-sm dark p-2" style={{ fontSize: "17px" }}>
                ${balanceUsd || "0.00"}
              </span>
            </li>
          </ul>

          {/*  FIXED BUTTON */}
          <button
            data-bs-toggle="modal"
            data-bs-target="#otpPin"
            className="tf-btn lg primary mt-10"
          >
            Send
          </button>

          {/*  REFERENCE */}
          <div className="tab-pane fade active show">
            <ul className="mt-10 accent-box line-border">
              <li>
                <h5 className="text-primary">Reference!</h5>
              </li>

              <li>
                <hr />
              </li>

              <li className="d-flex align-items-center justify-content-between">
                <span className="text-small">ValueUSD</span>
                {trxH.value !== null ? (
                  <span className="text-large text-white increase text-end">
                    ${trxH.value.toFixed(2)}
                  </span>
                ) : (
                  <span className="text-large text-white increase text-end">
                    loading...
                  </span>
                )}
              </li>

              <li>
                <hr />
              </li>

              <li className="trade-list-item">
                {trxH.from !== "" ? (
                  <p className="d-flex gap-4 text-white">
                    _from{" "}
                    <span className="text-primarys">
                      {trxH.from.slice(0, 30)}...
                    </span>
                    <i
                      onClick={copyFrom}
                      style={{ cursor: "pointer" }}
                      className="icon-copy active fs-3"
                    ></i>
                  </p>
                ) : (
                  <p className="d-flex gap-2 text-white">
                    _from <span className="text-primary"> loading... </span>
                    <i className="icon-clockwise2 fs-16"></i>
                  </p>
                )}
              </li>

              <li>
                <hr />
              </li>

              <li className="trade-list-item mt-2">
                {trxH.to !== "" ? (
                  <p className="d-flex gap-4 text-white">
                    _to{" "}
                    <span className="text-primary">
                      {trxH.to.slice(0, 30)}...
                    </span>
                    <i
                      onClick={copyTo}
                      style={{ cursor: "pointer" }}
                      className="icon-copy fs-3"
                    ></i>
                  </p>
                ) : (
                  <p className="d-flex gap-2 text-white">
                    _to <span className="text-primary"> loading... </span>
                    <i className="icon-clockwise2 fs-16"></i>
                  </p>
                )}
              </li>

              <li>
                <hr />
              </li>

              <li className="trade-list-item mt-16">
                <p className="d-flex align-items-center text-small gap-4">
                  X Routing{" "}
                  <i className="icon-question fs-16 text-secondary"></i>
                </p>
                
                <span className="d-flex gap-4 align-items-center">
                  <img src={coin3} alt="img" className="img" />
                  <i className="icon-select-right"></i>
                  <img src={coin5} alt="img" className="img" />
                  <i className="icon-arr-right fs-8"></i>
                </span>
              </li>

              <li>
                <hr />
              </li>

              <li className="trade-list-item mt-16">
                <p className="d-flex align-items-center text-small gap-4">
                  Status
                  {trxH.status === "" ? (
                    <i className="icon-clock fs-16 text-warning"></i>
                  ) : (
                    <i className="icon-check fs-16 text-primary"></i>
                  )}
                </p>

                {trxH.status === "" ? (
                  <span className="text-warning">Loading..</span>
                ) : (
                  <span className="text-success">{trxH.status}</span>
                )}
              </li>

              <li>
                <hr />
              </li>

              <li className="d-flex align-items-center justify-content-between">
                <span className="text-small">BlockNumber</span>
                {trxH.blockNumber !== "" ? (
                  <span className="text-large text-white increase text-end">
                    {trxH.blockNumber}
                  </span>
                ) : (
                  <span className="text-large text-white increase text-end">
                    loading...
                  </span>
                )}
              </li>

              <li>
                <hr />
              </li>

              <li className="trade-list-item mt-2">
                {trxH.transactionHash !== "" ? (
                  <p className="d-flex gap-4 text-white">
                    transactionHash{" "}
                    <span className="text-primary">
                      {trxH.transactionHash.slice(0, 25)}...
                    </span>
                    <i
                      onClick={copyTrxHash}
                      style={{ cursor: "pointer" }}
                      className="icon-copy fs-3"
                    ></i>
                  </p>
                ) : (
                  <p className="d-flex gap-2 text-white">
                    transactionHash{" "}
                    <span className="text-primary"> loading... </span>
                    <i className="icon-clockwise2 fs-16"></i>
                  </p>
                )}
              </li>

              <li>
                <hr />
              </li>
            </ul>
          </div>
        </div>

        {/*  PIN MODAL */}
        <div className="modal fade action-sheet sheet-down" id="otpPin">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="header d-flex justify-content-center align-items-center">
                <span
                  className="left icon-cancel"
                  data-bs-dismiss="modal"
                ></span>
                <h3>{hasPin ? "Enter your pin" : "Create your PIN"}</h3>
              </div>

              <div className="modal-body">
                <form>
                  <div className="digit-group">
                    {["pin1", "pin2", "pin3", "pin4"].map((key) => (
                      <input
                        key={key}
                        value={pinInput[key]}
                        onChange={(e) => handlePinChange(key, e.target.value)}
                        type="text"
                        required
                      />
                    ))}
                  </div>

                  <p className="text-danger text-center">{pinError}</p>

                  <button
                    onClick={hasPin ? SendEther : createPin}
                    className="mt-40 tf-btn lg primary"
                  >
                    {hasPin ? "Confirm" : "Create PIN"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Send;
