import { Suspense, useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useRoutes,
  Navigate,
} from "react-router-dom";

import { getLocalStorageItem } from "@/utils/helpers";
import Loader from "../theme/Loader";
import { getUserByAuthToken } from "../api/AuthApiCalls";
import Theme from "@/theme/Theme";
import Home from "@/screens/public/home/Home";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = getLocalStorageItem("authentication_token");

      if (token) {
        const valid = await getUserByAuthToken();
        if (!valid) {
          localStorage.removeItem("authentication_token");
          navigate("/signin");
        }
      } else {
        navigate("/signin");
      }

      setChecking(false);
    };

    verifyUser();
  }, [navigate, location.pathname]);

  return (
    <>
      {children}
      {checking && <Loader />}
    </>
  );
};

const Routes = () => {
  const appRoutes = [
    {
      path: "/",
      element: <Theme />,
      children: [
        {
          index: true, // shorthand for path: ""
          element: <Home />,
        },
        {
          path: "*",
          element: <Navigate to="/" />,
        },
      ],
    },
  ];

  return <Suspense fallback={<Loader />}>{useRoutes(appRoutes)}</Suspense>;
};

export default Routes;
