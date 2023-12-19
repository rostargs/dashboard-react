import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import "./Layout.scss";
import Information from "../../components/Information/Information";

const Layout: React.FC = () => {
  

  return (
    <div className="container">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Information />
    </div>
  );
};

export default Layout;
