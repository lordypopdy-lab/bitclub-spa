import Router from "./router";
import { useEffect } from "react";
import Providers from "./providers";
import { useUserStore } from "../store/userStore";
import { fetchTokens } from "../services/tokenService";

export default function App() {
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
    fetchTokens(); 
  }, []);
  return (
    <Providers>
      <Router />
    </Providers>
  );
}
