import { useState } from "react";
import toast from "react-hot-toast";
import FadeLoader from "react-spinners/FadeLoader";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PrivacyModal from "../../components/ui/PrivacyModal";

import { registerApi, googleLoginApi } from "./authService";
import { useUserStore } from "../../store/userStore"; 

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const [type, setType] = useState("password");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    comfirmPassword: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await registerApi(data);

      if (res.error) {
        toast.error(res.error);
        setLoading(false);
        return;
      }

      toast.success("Register successful!");

      localStorage.setItem("email", data.email);
      localStorage.setItem("pin", res._id);

      setUser(res); 

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const signup = async (credentialResponse) => {
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

        navigate("/Home");
      }
    } catch (error) {
      toast.error("Login failed");
      setLoading(false);
    }
  };

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="header fixed-top bg-surface">
        <Link to="/login" className="left back-btn">
          <i className="icon-left-btn"></i>
        </Link>
      </div>

      <div className="pt-45">
        <div className="tf-container">
          <form onSubmit={registerUser} className="mt-32 mb-16">
            <h2 className="text-center">Register Bitclub.</h2>

            <ul className="mt-40 socials-login">
              <li className="mt-12">
                <div className="tf-btn md p-2 social dark">
                  <GoogleLogin
                    theme="filled_black"
                    onSuccess={signup}
                    onError={() => console.log("Google SignUp Failed")}
                  />
                </div>
              </li>
            </ul>

            <fieldset className="mt-40">
              <label className="label-ip">
                <p className="mb-8 text-small">Name</p>
                <input
                  type="text"
                  value={data.name}
                  placeholder="enter name"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </label>
            </fieldset>

            <FadeLoader
              color="#36d7b7"
              loading={loading}
              speedMultiplier={3}
              style={{
                textAlign: "center",
                position: "relative",
                marginLeft: "50%",
              }}
            />

            <fieldset className="mt-16">
              <label className="label-ip">
                <p className="mb-8 text-small">Email</p>
                <input
                  type="text"
                  placeholder="Example@gmail"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </label>
            </fieldset>

            <fieldset className="mt-16">
              <label className="label-ip">
                <p className="mb-8 text-small">Password</p>

                <div className="box-auth-pass">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Your password"
                    className="password-field"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />

                  <span className="show-pass" onClick={handleToggle}>
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </span>
                </div>
              </label>
            </fieldset>

            <fieldset className="mt-16">
              <label className="label-ip">
                <p className="mb-8 text-small">Confirm Password</p>

                <div className="box-auth-pass">
                  <input
                    type={type}
                    required
                    placeholder="confirm password"
                    className="password-field2"
                    value={data.comfirmPassword}
                    onChange={(e) =>
                      setData({
                        ...data,
                        comfirmPassword: e.target.value,
                      })
                    }
                  />

                  <span className="show-pass" onClick={handleToggle}>
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </span>
                </div>
              </label>
            </fieldset>

            <fieldset className="group-cb cb-signup mt-12">
              <input
                type="checkbox"
                className="tf-checkbox"
                id="cb-ip"
                defaultChecked
              />

              <label htmlFor="cb-ip">
                I agree to{" "}
                <a
                  href="#notiPrivacy"
                  style={{ color: "#fff" }}
                  data-bs-toggle="modal"
                >
                  Terms and condition
                </a>
              </label>
            </fieldset>

            <button className="mt-20">Create an account</button>

            <p className="mt-10 text-center mb-30">
              By creating an account, you’re agree to out{" "}
              <a
                href="#notiPrivacy"
                style={{ color: "#25c866" }}
                data-bs-toggle="modal"
              >
                Privacy policy
              </a>{" "}
              and{" "}
              <a
                href="#notiPrivacy"
                style={{ color: "#25c866" }}
                data-bs-toggle="modal"
              >
                Term of use
              </a>
            </p>
          </form>
        </div>
        <PrivacyModal />
      </div>
    </>
  );
};

export default Register;
