import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";
import { jwtDecode } from "jwt-decode";
import { FiEye, FiEyeOff } from "react-icons/fi"; 
import { useNavigate, Link } from "react-router-dom";

import { loginApi, googleLoginApi } from "./authService";
import { useUserStore } from "../../store/userStore";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("password");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const initGoogle = () => {
      if (!window.gapi) return;

      gapi.load("client:auth2", () => {
        window.gapi.client.init({
          clientId: import.meta.env.VITE_CLIENT_ID,
          plugin_name: "chat",
          scope: "email",
        });
      });
    };

    initGoogle();
  }, []);

  // =========================
  // EMAIL LOGIN
  // =========================
  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginApi(data.email, data.password);

      if (!res.error) {
        toast.success("Login successful. Welcome!");

        localStorage.setItem("email", data.email);
        localStorage.setItem("pin", res._id);

        setUser(res);

        setTimeout(() => {
          navigate("/Home");
        }, 1000);
      } else {
        toast.error(res.error);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  // =========================
  // GOOGLE LOGIN
  // =========================
  const login = async (credentialResponse) => {
    setLoading(true);

    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { email, name, picture, email_verified } = decoded;

      if (email_verified) {
        const res = await googleLoginApi({ email, name, picture });

        toast.success("Login Successfully, Welcome!");

        localStorage.setItem("email", email);
        localStorage.setItem("pin", res._id);

        setUser(res);

        setTimeout(() => {
          navigate("/Home");
        }, 1000);
      }
    } catch (error) {
      toast.error("Login failed");
      setLoading(false);
    }
  };

  // =========================
  // PASSWORD TOGGLE
  // =========================
  const handleToggle = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <>
      <div className="header fixed-top bg-surface">
        <Link to="/Boarding2" className="left back-btn">
          <i className="icon-left-btn"></i>
        </Link>
      </div>

      <div className="pt-45 pb-20">
        <div className="tf-container">
          <div className="mt-32">
            <h2 className="text-center">Login Bitclub.</h2>

            <ul className="mt-40 socials-login">
              <li className="mt-12">
                <Link className="tf-btn md p-2 social dark">
                  <GoogleLogin
                    theme="filled_black"
                    onSuccess={login}
                    onError={() => console.log("Login Failed")}
                  />
                </Link>
              </li>
            </ul>
          </div>

          <div className="auth-line mt-12">Or</div>

          <form onSubmit={loginUser} className="mt-16">

            <fieldset className="mt-16">
              <label className="label-ip">
                <p className="mb-8 text-small"> Email</p>
                <input
                  type="email"
                  placeholder="Example@gmail"
                  value={data.email}
                  onChange={(e) =>
                    setData({ ...data, email: e.target.value })
                  }
                />
              </label>
            </fieldset>

            <fieldset className="mt-16 mb-12">
              <label className="label-ip">
                <p className="mb-8 text-small">Password</p>

                <div className="box-auth-pass">
                  <input
                    type={type}
                    required
                    placeholder="Your password"
                    className="password-field"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />

                  <span className="show-pass" onClick={handleToggle}>
                    {type === "password" ? (
                      <FiEyeOff size={15} />
                    ) : (
                      <FiEye size={15} />
                    )}
                  </span>
                </div>
              </label>
            </fieldset>

            <Link to="/RessetPassword" className="text-secondary">
              Forgot Password?
            </Link>

            <button className="mt-20">Login</button>

            <p className="mt-20 text-center text-small">
              Already have a Account? &ensp;
              <Link to="/Register">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;