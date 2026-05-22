import axios from "../../../../services/api"
import { useNavigate } from "react-router-dom";

const Contract = () => {
  const navigate = useNavigate();

  const toContractOne = async () => {
    const email = localStorage.getItem("email");
    try {
      const { data } = await axios.post("/getContractOne", { email });
      if (data.success && data.contractOne.status !== "Paused") {
        navigate("/ContractOneProfile");
      } else {
        navigate("/ContractOne");
      }
    } catch (error) {
      console.log(`Contract is yet to Activated!: ${error}`);
    }
  };

  const toContractTwo = async () => {
    const email = localStorage.getItem("email");
    try {
      const { data } = await axios.post("/getContractTwo", { email });
      if (data.success && data.contractOne.status !== "Paused") {
        navigate("/ContractTwoProfile");
      } else {
        navigate("/ContractTwo");
      }
    } catch (error) {
      console.log(`Contract is yet to Activated!: ${error}`);
    }
  };

  return (
    <ul>
      <li>
        <div
          className="accent-box-v5 p-0 bg-menuDark active"
          style={{ width: "100%" }}
        >
          <div
            onClick={toContractOne}
            className="coin-item style-1 gap-12 bg-surface"
            style={{ cursor: "pointer" }}
          >
            <span className="icon-box bg-transparent bg-icon1">
              <i className="icon-book"></i>
            </span>

            <div className="mt-12">
              {/* ✅ FIXED (no nested Link) */}
              <span className="text-small">
                Contract <span style={{ color: "#25C866" }}>Class One</span>
              </span>

              <p className="mt-4">
                Click Create and set up your collection. Add contract status, a
                description, price & contract icons, and set a secondary sales
                fee.{" "}
                <span style={{ color: "#25C866" }}>Contract level one+</span>
              </p>
            </div>
          </div>
        </div>
      </li>

      <li className="mt-8">
        <div
          className="accent-box-v5 p-0 bg-menuDark"
          style={{ width: "100%" }}
        >
          <div
            onClick={toContractTwo}
            className="coin-item style-1 gap-12 bg-surface"
            style={{ cursor: "pointer" }}
          >
            <span className="icon-box bg-transparent bg-icon1">
              <i className="icon-book"></i>
            </span>

            <div className="mt-12">
              <span className="text-small">
                Contract <span style={{ color: "#25C866" }}>Class two</span>
              </span>

              <p className="mt-4">
                Click Create and set up your collection. Add contract status, a
                description, price & contract icons, and set a secondary sales
                fee.{" "}
                <span style={{ color: "#25C866" }}>Contract level two+</span>
              </p>
            </div>
          </div>
        </div>
      </li>

      <li className="mt-8">
        <div
          className="accent-box-v5 p-0 bg-menuDark"
          style={{ width: "100%" }}
        >
          <div
            onClick={() => navigate("/ContractThree")}
            className="coin-item style-1 gap-12 bg-surface"
            style={{ cursor: "pointer" }}
          >
            <span className="icon-box bg-transparent bg-icon2">
              <i className="icon-wallet-money"></i>
            </span>

            <div className="mt-12">
              <span className="text-small">
                Contract <span style={{ color: "#25C866" }}>Class three</span>
              </span>

              <p className="mt-4">
                Click Create and set up your collection. Add contract status, a
                description, price & contract icons, and set a secondary sales
                fee.{" "}
                <span style={{ color: "#ab00e7" }}>Contract level three+</span>
              </p>
            </div>
          </div>
        </div>
      </li>

      <li className="mt-8">
        <div
          className="accent-box-v5 p-0 bg-menuDark"
          style={{ width: "100%" }}
        >
          <div
            onClick={() => navigate("/ContractFour")}
            className="coin-item style-1 gap-12 bg-surface"
            style={{ cursor: "pointer" }}
          >
            <span className="icon-box bg-transparent bg-icon2">
              <i className="icon-wallet-money"></i>
            </span>

            <div className="mt-12">
              <span className="text-small">
                Contract <span style={{ color: "#25C866" }}>Class four</span>
              </span>

              <p className="mt-4">
                Click Create and set up your collection. Add contract status, a
                description, price & contract icons, and set a secondary sales
                fee.{" "}
                <span style={{ color: "#ab00e7" }}>Contract level four+</span>
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default Contract;