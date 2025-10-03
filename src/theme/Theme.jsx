import { Outlet } from "react-router-dom";
import Header from "./Header";

const Theme = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Outlet />
    </div>
  );
};

export default Theme;
