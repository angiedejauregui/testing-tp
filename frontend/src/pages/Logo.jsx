import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <>
      <img
        className="logo"
        onClick={() => navigate("/")}
        src={logo}
        alt="Logo"
      />
    </>
  );
};

export default Logo;
