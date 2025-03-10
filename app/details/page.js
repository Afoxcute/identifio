import React from "react";
import AuthUser from "../Components/Auth";
import Background from "../Components/Background";
import { LandingNavbar } from "@/components/landing/navbar";

const page = () => {
  return (
    <div className="card-gradient ">
      <Background />
      <LandingNavbar />
      <AuthUser />
    </div>
  );
};

export default page;
