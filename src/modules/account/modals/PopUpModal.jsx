import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PopUpModal = () => {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");

  const blurActive = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  // =========================
  // SHOW ONLY IF NOT ACCEPTED
  // =========================
  useEffect(() => {
    const accepted = localStorage.getItem("bitclub_privacy_accepted");

    if (!accepted) {
      setTimeout(() => {
        const modal = window.bootstrap?.Modal.getOrCreateInstance(
          document.getElementById("modalNoti"),
        );
        modal?.show();
      }, 600);
    }
  }, []);

  // =========================
  // SAFE CLOSE (FIX ARIA-FOCUS BUG)
  // =========================
  const safeCloseModal = (id) => {
    const modalEl = document.getElementById(id);
    const instance = window.bootstrap?.Modal.getInstance(modalEl);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    instance?.hide();
    
    setTimeout(() => {
      document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, 300);
  };

  // =========================
  // NOTIFICATION MODAL
  // =========================
  const handleAllow = () => {
    blurActive(); 

    const modal = window.bootstrap?.Modal.getInstance(
      document.getElementById("modalNoti"),
    );
    modal?.hide();

    setTimeout(() => {
      const privacy = window.bootstrap?.Modal.getOrCreateInstance(
        document.getElementById("notiPrivacy"),
      );
      privacy?.show();
    }, 300);
  };

  const handleDeny = () => {
    blurActive(); 

    safeCloseModal("modalNoti");
  };

  // =========================
  // PRIVACY ACCEPT
  // =========================
  const handleAcceptPrivacy = () => {
    blurActive(); 

    if (!checked) {
      setError("⚠️ Please accept the Privacy Policy to continue.");
      return;
    }

    localStorage.setItem("bitclub_privacy_accepted", "true");
    safeCloseModal("notiPrivacy");
  };
  return (
    <div>
      {/* ================= NOTIFICATION MODAL ================= */}
      <div className="modal fade modalCenter" id="modalNoti">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content modal-sm">
            <div className="p-16 line-bt text-center">
              <h4>“BITCLUB” Would Like to Send You Notifications</h4>

              <p className="mt-8 text-large">
                Stay updated with real-time market alerts, trades, deposits,
                withdrawals, and security notifications.
              </p>
            </div>

            <div className="grid-2">
              <Link
                to="#"
                className="line-r text-center text-button fw-6 p-10 text-secondary"
                onClick={handleDeny}
              >
                Don’t Allow
              </Link>

              <Link
                to="#"
                className="text-center text-button fw-6 p-10 text-primary"
                onClick={handleAllow}
              >
                Allow
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PRIVACY MODAL ================= */}
      <div className="modal fade modalCenter" id="notiPrivacy">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-20">
            <div className="heading">
              <h3>BITCLUB Privacy & Security Policy</h3>

              <div className="mt-4 text-small">
                <p>
                  BITCLUB is a secure digital asset platform built to ensure
                  transparency, safety, and trust. We collect only essential
                  data such as email, transaction history, and device info
                  strictly for trading and account protection.
                </p>

                <p>
                  Your data is encrypted and never sold or shared. We comply
                  with global security and financial protection standards.
                </p>
              </div>

              <h3 className="mt-12">Authorized Usage</h3>

              <p className="mt-4 text-small">
                By continuing, you agree that BITCLUB may process your data for
                account operations, trade execution, fraud prevention, and
                system optimization.
              </p>

              {/* ================= CHECKBOX ================= */}
              <div className="cb-noti mt-12">
                <input
                  type="checkbox"
                  className="tf-checkbox"
                  id="cb-ip"
                  checked={checked}
                  onChange={(e) => {
                    setChecked(e.target.checked);
                    if (e.target.checked) setError("");
                  }}
                />

                <label htmlFor="cb-ip">
                  I agree to the Terms of Service and Privacy Policy
                </label>

                {/* ERROR MESSAGE */}
                {error && (
                  <p style={{ color: "#ff4d4f", marginTop: "8px" }}>{error}</p>
                )}
              </div>
            </div>

            <div className="mt-20">
              <button
                className="tf-btn md primary"
                onClick={handleAcceptPrivacy}
              >
                I Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpModal;
