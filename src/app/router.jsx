import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Login from "../modules/auth/Login";
import Send from "../modules/account/Send";
import Earn from "../modules/account/Earn";
//import Home from "../modules/account/Home";
import Home from "../modules/account/home/Home";
import Welcome from "../modules/auth/Welcome";
import Wallet from "../modules/account/Wallet";
import Register from "../modules/auth/Register";
import Boarding from "../modules/auth/Boarding";
import Boarding2 from "../modules/auth/Boarding2";
import ListBlog from "../components/blog/ListBlog";
import Exchange from "../modules/account/Exchange";
import BlogDetail from "../components/blog/BlogDetail";
import AdsScreen from "../modules/account/p2p/AdsScreen";
import P2PScreen from "../modules/account/p2p/P2PScreen";
import Assets from "../modules/account/assets/Assets.jsx";
import OrdersScreen from "../modules/account/p2p/OrdersScreen";
import AddFundsScreen from "../modules/account/funds/AddFundsScreen";
import P2PExpressScreen from "../modules/account/p2p/P2PExpressScreen";
import BuySellScreen from "../modules/exchange/components/BuySellScreen";
import FaqScreen from "../modules/account/deposit/components/FaqScreen.jsx";
import SelectCoinScreen from "../modules/account/deposit/components/SelectCoinScreen";
import BankTransferScreen from "../modules/account/deposit/components/BankTransferScreen.jsx";
import DepositHistoryScreen from "../modules/account/deposit/components/DepositHistoryScreen";

import ProtectedRoute from "../routes/ProtectedRoute";

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
            <Route path="/earn" element={<Earn />} />
            <Route path="/send" element={<Send />} />
            <Route path="/home" element={<Home />} />
            <Route path="/faq" element={<FaqScreen />} />
            <Route path="/p2p" element={<P2PScreen />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/blog" element={<ListBlog />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/p2p-ads" element={<AdsScreen />} />
            <Route path="/blog-detail" element={<BlogDetail />} />
            <Route path="/buy-sell" element={<BuySellScreen />} />
            <Route path="/p2p-orders" element={<OrdersScreen />} />
            <Route path="/add-funds" element={<AddFundsScreen />} />
            <Route path="/p2p-express" element={<P2PExpressScreen />} />
            <Route path="/deposit-crypto" element={<SelectCoinScreen />} />
            <Route path="/bank-transfer" element={<BankTransferScreen />} />
            <Route path="/deposit-history" element={<DepositHistoryScreen />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
