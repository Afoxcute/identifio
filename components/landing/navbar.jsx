"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignInWithMetamaskButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { DiamondPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";
import CoinbaseButton from "@/app/Components/CoinbaseButton";

export const LandingNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="">
      <div className="w-[90%] mx-auto flex justify-between items-center py-3.5  ">
        <Link
          href=""
          className="text-2xl font-semibold flex items-center gap-5"
        >
          <div>
            <DiamondPlus />
          </div>
          <div>Bob-ID-verify</div>
        </Link>

        <div>
          <CoinbaseButton />
        </div>
      </div>
    </div>
  );
};
