import React from "react";
import { currentUser } from "@clerk/nextjs/server";

const WelcomeBack = async () => {
  const user = await currentUser();
  //   const email = user.emailAddresses[0].emailAddress;
  const Name = user.firstName;
  console.log(Name, "email address");

  return <div>Welcome Back {Name} !</div>;
};

export default WelcomeBack;
