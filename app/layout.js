import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import SignIn from "./Components/SignIn";
import "@uploadthing/react/styles.css";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Identifio",
  description: "Seamless Institution Experience: Identity, Payments, and Access",
};

export default function RootLayout({ children }) {
  return (

      <html lang="en">
        <body className={inter.className}>
          {/* <SignIn /> */}

          <div className="max-w-screen-2xl mx-auto">
            <Providers>{children}</Providers>
          </div>
        </body>
      </html>
    
  );
}
