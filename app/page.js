import React from "react";
import Background from "./Components/Background";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { LandingNavbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero";
import { Coins, DiamondPlus, ShieldPlus, Wallet } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="card-gradient">
      <Background />
      <LandingNavbar />
      <Hero />

      <div>
        <div className="w-[90%] mx-auto py-16">
          <div className="text-center text-3xl font-medium">
            <h4>Why Choose Identifio</h4>
          </div>

          <div className="grid lg:grid-cols-3 gap-10 pt-10">
            <div className="bg-glass rounded-lg p-4 flex flex-col items-center ">
              <div className="mb-3 text-purple-800">
                <ShieldPlus size={64} />
              </div>
              <div className="text-center text-purple-300 font-medium">
              Verify your identity anywhere like library access, labs, and more using cutting-edge decentralized technology.
              </div>
            </div>

            <div className="bg-glass rounded-lg p-4 flex flex-col items-center ">
              <div className="mb-3 text-purple-800">
                <Coins size={64} />
              </div>
              <div className="text-center text-purple-300 font-medium">
              Make quick and secure payments at Institution shops using crypto or fiat through your connected wallet.
              </div>
            </div>

            <div className="bg-glass rounded-lg p-4 flex flex-col items-center ">
              <div className="mb-3 text-purple-800">
                <Wallet size={64} />
              </div>
              <div className="text-center text-purple-300 font-medium">
              Browse and shop from your favorite Institution stores, all in one place.
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-5 bg-black border-t border-purple-600/50 ">
        <div className="w-[90%] mx-auto">
          <Link href="" className='text-2xl font-semibold flex items-center gap-5'>
                <div>
                    <DiamondPlus />
                </div>
                <div>Identifio</div>
          </Link>

          {/* <div>
            <h6></h6>
          </div> */}
        </div>
      </footer>
    </div>
  );
};

export default page;
