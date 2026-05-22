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
import Assets from "../modules/account/assets/Assets.jsx";
import AddFundsScreen from "../modules/account/funds/AddFundsScreen";
import BuySellScreen from "../modules/exchange/components/BuySellScreen";

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
            <Route path="/assets" element={<Assets />} />
            <Route path="/blog" element={<ListBlog />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/blog-detail" element={<BlogDetail />} />
            <Route path="/buy-sell" element={<BuySellScreen />} />
            <Route path="/add-funds" element={<AddFundsScreen />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
