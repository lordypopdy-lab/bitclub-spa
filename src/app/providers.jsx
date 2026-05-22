import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Providers = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      {children}

      <Toaster
        position="top-center"
        containerStyle={{
          top: "60%",
          left: "50%",
          width: "80%",
          transform: "translate(-50%, -50%)",
        }}
        toastOptions={{
          duration: 2000,

          style: {
            background: "#000000",
            color: "#d6d2d2",
            borderRadius: "8px",
            padding: "10px 11px",
            fontSize: "9px",
            fontWeight: "400",
            border: "1px solid #1f1f1f",
            boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
          },

          success: {
            style: {
              border: "1px solid rgba(30, 104, 60, 0.25)",
            },
            iconTheme: {
              primary: "#25c866",
              secondary: "#000000",
            },
          },

          error: {
            style: {
              border: "1px solid rgba(255,77,79,0.25)",
            },
            iconTheme: {
              primary: "#ff4d4f",
              secondary: "#000000",
            },
          },
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default Providers;
