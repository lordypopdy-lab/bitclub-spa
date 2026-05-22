import { Link } from "react-router-dom";

const PrivacyModal = () => {
  return (
    <div className="modal fade modalCenter" id="notiPrivacy">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-20">
          <div className="heading">
            <h3>Privacy</h3>

            <div className="mt-4 text-small">
              <p>
                A mobile app privacy policy must clearly explain how user data
                is collected, stored, and used.
              </p>
              <p>
                This ensures compliance and protects both users and the company.
              </p>
            </div>

            <h3 className="mt-12">Authorized Users</h3>

            <p className="mt-4 text-small">
              Users must agree before using the application.
            </p>

            <div className="cb-noti mt-12">
              <input type="checkbox" className="tf-checkbox" id="cb-ip" />
              <label htmlFor="cb-ip">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>
          </div>

          <div className="mt-20">
            <Link
              to="#"
              className="tf-btn md primary"
              data-bs-dismiss="modal"
            >
              I Accept
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;