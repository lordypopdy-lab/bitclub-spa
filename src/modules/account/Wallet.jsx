import { Link } from "react-router-dom";
import { useState } from "react";
import Contract from "./components/WalletComp/Contract";

import { useUserStore } from "../../store/userStore";

import PopUpModal from "./modals/PopUpModal";
import MenubarFooter from "./ui/MenubarFooter";
import HistoryModal from "./modals/HistoryModal";
import AccountListModal from "./modals/AccountListModal";
import NotificationModal from "./modals/NotificationModal";
import HomeActionMenu from "./components/HomeAction/HomeActionMenu";

const Wallet = () => {
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(null);

  return (
    <>
      <div className="header-style2 fixed-top bg-menuDark">
        <div className="d-flex justify-content-between align-items-center">
          <Link className="box-account" to="/UserInfo">
            {!!user && user.picture !== "" ? (
              <img src={user.picture} alt="img" className="avt" />
            ) : (
              <img src="/src/images/avt/avt2.jpg" alt="img" className="avt" />
            )}
            <div className="info">
              <p className="text-xsmall text-secondary">Welcome back!</p>
              <h5 className="mt-4">{!!user && user.name}</h5>
            </div>
          </Link>

          <div className="d-flex align-items-center gap-8">
            <Link to="/assetsRatings" className="icon-search"></Link>

            <Link
              to="#notification"
              className="icon-noti"
              data-bs-toggle="modal"
            >
              <span className="box-noti p-2">
                {!!user && user.NotificationSeen}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="pt-68 pb-80">
        <div className="bg-menuDark tf-container">
          <HomeActionMenu />
        </div>

        <div className="bg-menuDark tf-container">
          <div className="tf-tab pt-12 mt-4">
            <div className="tab-slide">
              <ul className="nav nav-tabs wallet-tabs" role="tablist">
                <li className="item-slide-effect"></li>

                <li className="nav-item active" role="presentation">
                  <button
                    className="nav-link active"
                    data-bs-toggle="tab"
                    data-bs-target="#history"
                  >
                    Market
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#market"
                  >
                    Contracts
                  </button>
                </li>
              </ul>
            </div>

            <div className="tab-content pt-16 pb-16">
              <h5 style={{ marginBottom: "-27px" }}>
                <Link
                  to="/assetsRatings"
                  className="cryptex-rating text-primary"
                >
                  <i className="icon-star text-warning m-1"></i>
                  Bitclub Rating
                </Link>
              </h5>

              <div
                className="tab-pane p-3 rounded fade active show"
                id="history"
                role="tabpanel"
              >
              </div>

              <div className="tab-pane fade" id="market" role="tabpanel">
                <Contract />
              </div>
            </div>
          </div>
        </div>
      </div>

      <PopUpModal />
      <HistoryModal />
      <MenubarFooter />
      <AccountListModal />
      <NotificationModal />
    </>
  );
};

export default Wallet;
