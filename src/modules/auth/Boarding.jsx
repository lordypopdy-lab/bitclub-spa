import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Preloader from "../../components/ui/Preloader";
import boarding2 from "../../images/banner/boarding2.jpg";
import PrivacyModal from "../../components/ui/PrivacyModal";

const Boarding = () => {
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Preloader show={pageLoading} />
      <div className="wrap-boarding">
        <div className="tf-container">
          <div className="d-flex flex-column min-vh-100 justify-content-between">
            <div className="banner-boarding2 mt-20">
              <img src={boarding2} alt="img" />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="375"
                height="371"
                viewBox="0 0 390 371"
                fill="none"
              >
                <g opacity="0.8" filter="url(#filter0_f_1_12104)">
                  <path
                    d="M296.173 185.722C185.542 269.933 258.671 269.933 212.41 269.933C166.148 269.933 255.608 286.881 128.646 185.722C1.68354 84.5628 166.148 101.511 212.41 101.511C258.671 101.511 406.804 101.511 296.173 185.722Z"
                    fill="url(#paint0_linear_1_12104)"
                  />
                </g>

                <defs>
                  <filter
                    id="filter0_f_1_12104"
                    x="-18.5225"
                    y="0.443359"
                    width="454.85"
                    height="370.557"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />

                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />

                    <feGaussianBlur
                      stdDeviation="50"
                      result="effect1_foregroundBlur_1_12104"
                    />
                  </filter>

                  <linearGradient
                    id="paint0_linear_1_12104"
                    x1="304.471"
                    y1="100.443"
                    x2="199.186"
                    y2="312.56"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E250E5" /> 
                    <stop offset="1" stopColor="#4B50E6" /> 
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="content mb-32">
              <h2 className="text-center">Top-notch Security and Safety!</h2>

              <p className="mt-8 text-center text-large">
                With advanced encryption technology, your information and assets
                are protected with utmost security.
              </p>

              <Link to="/boarding2" className="tf-btn primary md mt-40">
                Next
              </Link>

              <p className="mt-20 text-center mb-35">
                By creating an account, you’re agree to out{" "}
                <Link
                  to="#notiPrivacy"
                  className="text-white"
                  data-bs-toggle="modal"
                >
                  Privacy policy
                </Link>{" "}
                and{" "}
                <Link
                  to="#notiPrivacy"
                  className="text-white"
                  data-bs-toggle="modal"
                >
                  Term of use
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <PrivacyModal />
    </>
  );
};

export default Boarding;
