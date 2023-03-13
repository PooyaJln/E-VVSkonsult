import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import MainNavbar from "./Navbar";

function RootLayout() {
  return (
    <div className="data-overlay-container">
      <MainNavbar />
      <div className="root-layout">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;
