import React from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";

const SignIn = () => {
  return (
    <div className="flex justify-between bg-blue-300/70 p-3">
      <div>
        <a href="/">
          <img src="/logo.png" width={70} height={70} />
        </a>
      </div>

      <SignedIn>
        <UserButton
          className=" text-[70px] text-white"
          showName
          appearance={{
            elements: {
              userButtonAvatarBox: {
                width: "50px",
                height: "50px",
              },
              userButtonText: {
                fontSize: "16px",
                color: "#FFFFFF",
              },
            },
          }}
        />
      </SignedIn>
    </div>
  );
};

export default SignIn;
