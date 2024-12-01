import React from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { colors } from "../../styles/colors";
import "./loader.scss";

type AuthLoaderProps = {};

export const Loader: React.FC<AuthLoaderProps> = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <ShoppingBagIcon
          color={colors.blue05}
          height={96}
          width={96}
          className="loader-logo"
        />
        <div className="loader-circle"></div>
      </div>
    </div>
  );
};
