import { Link } from "react-router-dom";
import avt2 from "../../images/avt/avt2.jpg";
import { useUserStore } from "../../store/userStore";

import Top from "./components/homeData/Top";
import MenubarFooter from "./ui/MenubarFooter";
import Losers from "./components/homeData/Losers";
import Gainers from "./components/homeData/Gainers";
import Popular from "./components/homeData/Popular";
import Favourite from "./components/homeData/Favourite";
import MarketCap from "./components/homeData/MarketCap";
import HomeActionMenu from "./components/HomeAction/HomeActionMenu";
import HomeMenuSwiper from "./components/HomeSwiper/HomeMenuSwiper";
import HomeMenuSwiperList from "./components/HomeSwiper/HomeMenuSwiperList";

import PopUpModal from "./modals/PopUpModal";
import HistoryModal from "./modals/HistoryModal";
import AccountListModal from "./modals/AccountListModal";
import NotificationModal from "./modals/NotificationModal";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const Home = () => {
  const { user } = useUserStore();
  return (
    <>
      <div className="header-style2 fixed-top bg-menuDark">
        <div className="d-flex justify-content-between align-items-center gap-14">
          <div className="box-account style-2">
            <Link to="/UserInfo">
              {!!user && user.picture !== "" ? (
                <img src={user.picture} alt="img" className="avt" />
              ) : (
                <img src={avt2} alt="img" className="avt" />
              )}
            </Link>

            <div className="search-box box-input-field style-2">
              <Link to="#" className="icon-search"></Link>
              <input
                type="text"
                placeholder="Looking for crypto"
                required
                className="clear-ip"
              />
              <i className="icon-close"></i>
            </div>
          </div>

          <div className="d-flex align-items-center gap-8">
            <Link to="/blog" className="icon-gift"></Link>

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
          <HomeMenuSwiper />
        </div>

        <div className="bg-menuDark tf-container">
          <div className="pt-12 pb-12 mt-4">
            <HomeMenuSwiperList />

            <div className="tab-content mt-8">
              <div
                className="tab-pane fade show active"
                id="favorites"
                role="tabpanel"
              >
                <div className="d-flex justify-content-between">
                  Index/Name
                  <p className="d-flex gap-8">
                    <span>Last Price(USD)/</span>
                    <span>Change(%)</span>
                  </p>
                </div>

                <ul className="mt-16">
                  <Top />
                </ul>
              </div>

              <div className="tab-pane fade" id="top" role="tabpanel">
                <div className="d-flex justify-content-between">
                  Name/Volume*
                  <p className="d-flex gap-8">
                    <span>Current Price(USD)/</span>
                    <span>Change(%)</span>
                  </p>
                </div>
                <ul className="mt-16">
                  <Favourite />
                </ul>
              </div>

              <div className="tab-pane fade" id="popular" role="tabpanel">
                <div className="d-flex justify-content-between">
                  Name/Volume*
                  <p className="d-flex gap-8">
                    <span>Current Price(USD)/</span>
                    <span>Change(%)</span>
                  </p>
                </div>
                <ul className="mt-16">
                  <Popular />
                </ul>
              </div>

              <div className="tab-pane fade" id="gainers" role="tabpanel">
                <div className="d-flex justify-content-between">
                  Name
                  <p className="d-flex gap-8">
                    <span>Current Price(USD)/</span>
                    <span>Change(%)</span>
                  </p>
                </div>
                <ul className="mt-16">
                  <Gainers />
                </ul>
              </div>

              <div className="tab-pane fade" id="losers" role="tabpanel">
                <div className="d-flex justify-content-between">
                  Name
                  <p className="d-flex gap-8">
                    <span>Current Price(USD)/</span>
                    <span>Change(%)</span>
                  </p>
                </div>
                <ul className="mt-16">
                  <Losers />
                </ul>
              </div>

              <div className="tab-pane fade" id="cap" role="tabpanel">
                <div className="d-flex justify-content-between">
                  Name
                  <p className="d-flex gap-8">
                    <span>Current Price(USD)/</span>
                    <span>Market Cap</span>
                  </p>
                </div>
                <ul className="mt-16">
                  <MarketCap />
                </ul>
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

export default Home;
