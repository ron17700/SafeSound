import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./LoginButton.scss";

export const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="shop-now-button" onClick={() => loginWithRedirect()}>START EXPLORING</button>;
};
