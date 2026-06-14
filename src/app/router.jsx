import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Login from "../modules/auth/Login";
import Home from "../modules/account/home/Home";
import Welcome from "../modules/auth/Welcome";
import Register from "../modules/auth/Register";
import Boarding from "../modules/auth/Boarding";
import Rewards from "../modules/rewards/Rewards";
import Redeem from "../modules/rewards/Redeem";
import Boarding2 from "../modules/auth/Boarding2";
import ListBlog from "../components/blog/ListBlog";
import Referral from "../modules/referral/Referral";
import Analytics from "../modules/referral/Analytics";
import MyRecords from "../modules/referral/MyRecords";
import BlogDetail from "../components/blog/BlogDetail";
import Activities from "../modules/referral/Activities";
import AdsScreen from "../modules/account/p2p/AdsScreen";
import P2PScreen from "../modules/account/p2p/P2PScreen";
import Assets from "../modules/account/assets/Assets.jsx";
import Leaderboard from "../modules/referral/Leaderboard";
import OrdersScreen from "../modules/account/p2p/OrdersScreen";
import PremierInviter from "../modules/referral/PremierInviter";
import CategoryPage from "../modules/notifications/CategoryPage";
import WithdrawHistory from "../modules/withdraw/WithdrawHistory";
import OnChainWithdraw from "../modules/withdraw/OnChainWithdraw";
import PromotionCenter from "../modules/rewards/PromotionCenter";
import InternalTransfer from "../modules/withdraw/InternalTransfer";
import CommissionWallet from "../modules/referral/CommissionWallet";
import AddFundsScreen from "../modules/account/funds/AddFundsScreen";
import ProgressPage from "../modules/account/onboarding/ProgressPage";
import P2PExpressScreen from "../modules/account/p2p/P2PExpressScreen";
import MarketsScreen from "../modules/markets/components/MarketsScreen";
import BuySellScreen from "../modules/exchange/components/BuySellScreen";
import FaqScreen from "../modules/account/deposit/components/FaqScreen.jsx";
import SelectCoinScreen from "../modules/account/deposit/components/SelectCoinScreen";
import BankTransferScreen from "../modules/account/deposit/components/BankTransferScreen.jsx";
import DepositHistoryScreen from "../modules/account/deposit/components/DepositHistoryScreen";

import ProtectedRoute from "../routes/ProtectedRoute";
import Notifications from "../modules/notifications/Notifications";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH PAGES */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/boarding" element={<Boarding />} />
          <Route path="/boarding2" element={<Boarding2 />} />
        </Route>

        {/* PROTECTED PAGES */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/faq" element={<FaqScreen />} />
            <Route path="/p2p" element={<P2PScreen />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/blog" element={<ListBlog />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/p2p-ads" element={<AdsScreen />} />
            <Route path="/rewards/redeem" element={<Redeem />} />
            <Route path="/markets" element={<MarketsScreen />} />
            <Route path="/blog-detail" element={<BlogDetail />} />
            <Route path="/buy-sell" element={<BuySellScreen />} />
            <Route path="/p2p-orders" element={<OrdersScreen />} />
            <Route path="/add-funds" element={<AddFundsScreen />} />
            <Route path="/referral/records" element={<MyRecords />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/referral/analytics" element={<Analytics />} />
            <Route path="/referral/activities" element={<Activities />} />
            <Route path="/referral/leaderboard" element={<Leaderboard />} />
            <Route path="/referral/wallet" element={<CommissionWallet />} />
            <Route path="/onboarding/progress" element={<ProgressPage />} />
            <Route path="/referral/premier" element={<PremierInviter />} />
            <Route path="/rewards/promotion" element={<PromotionCenter />} />
            <Route path="/p2p-express" element={<P2PExpressScreen />} />
            <Route path="/deposit-crypto" element={<SelectCoinScreen />} />
            <Route path="/bank-transfer" element={<BankTransferScreen />} />
            <Route path="/deposit-history" element={<DepositHistoryScreen />} />
            <Route path="/assets/withdraw/internal" element={<InternalTransfer />} />
            <Route
              path="/assets/withdraw/history"
              element={<WithdrawHistory />}
            />
            <Route
              path="/assets/withdraw/onchain"
              element={<OnChainWithdraw />}
            />
            <Route
              path="/notifications/news"
              element={<CategoryPage categoryKey="news" />}
            />
            <Route
              path="/notifications/incentives"
              element={<CategoryPage categoryKey="incentives" />}
            />
            <Route
              path="/notifications/new-listings"
              element={<CategoryPage categoryKey="new-listings" />}
            />
            <Route
              path="/notifications/market-updates"
              element={<CategoryPage categoryKey="market-updates" />}
            />
            <Route
              path="/notifications/system-messages"
              element={<CategoryPage categoryKey="system-messages" />}
            />
            <Route
              path="/notifications/promotions"
              element={<CategoryPage categoryKey="promotions" />}
            />
            <Route
              path="/notifications/announcements"
              element={<CategoryPage categoryKey="announcements" />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
