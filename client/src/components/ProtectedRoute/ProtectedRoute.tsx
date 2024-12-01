import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../Types/Routes";
import { Loader } from "../Loader/Loader";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    Navigate({
      to: ROUTES.LOGIN,
    });

    return null;
  }

  return <>{children}</>;
};
