import logo144 from "../../images/logo/logo144.png";
const Preloader = ({ show }) => {
  if (!show) return null;

  return (
    <div className="preload preload-container">
      <div
        className="preload-logo"
        style={{ backgroundImage: `url(${logo144})` }}
      >
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default Preloader;