"use client";

import React, { useEffect, useState, useRef } from "react";
import Background from "../Components/Background";
import Loader from "../Components/Loader";
import QRCode from "react-qr-code";
import { LandingNavbar } from "@/components/landing/navbar";
import ReactCardFlip from "react-card-flip";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useAccount, useConnect } from "wagmi";
import { ThirdwebProvider, PayEmbed } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";

// Replace with your actual Thirdweb client ID
const client = createThirdwebClient({ 
  clientId: "01649e8c79064059387c12a0d06de368" 
});

const Page = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const reportRef = useRef();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const account = useAccount();
  const { address, isConnected } = useAccount();

  // const {
  //   data: hash,
  //   error,
  //   isPending,
  //   sendTransaction,
  // } = useSendTransaction();

  // const { isLoading: isConfirming, isSuccess: isConfirmed } =
  //   useWaitForTransactionReceipt({
  //     hash,
  //   });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  const openPayModal = () => {
    setIsPayModalOpen(true);
  };

  const closePayModal = () => {
    setIsPayModalOpen(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const [latestData, setLatestData] = useState({
    Full_Name: "Yinka",
    Matric_Number: "CSC/2022/097",
    Passport: "",
    Phone: "09222223",
    Wallet: "0x3D39D68D2B2fBd98C40a228d56F5205218B9a33D",
  });

  useEffect(() => {
    const handleData = async () => {
      try {
        const response = await fetch("/api/create");
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Data:", data);

          setFetchedData(data.data);

          // Get the latest user data (most recently added)
          if (data.data && data.data.length > 0) {
            // Sort by creation date if available, otherwise use the last item
            const sortedData = [...data.data].sort((a, b) => {
              if (a.$createdAt && b.$createdAt) {
                return new Date(b.$createdAt) - new Date(a.$createdAt);
              }
              return 0;
            });
            
            const lastUser = sortedData[0];
            
            if (lastUser) {
              setLatestData({
                Full_Name: lastUser.Full_Name || "",
                Matric_Number: lastUser.Matric_Number || "",
                Passport: lastUser.Passport || "",
                Phone: lastUser.Phone || "",
                Wallet: lastUser.Wallet || "",
              });
              
              // Store the data in localStorage for persistence
              localStorage.setItem('userIdCardData', JSON.stringify({
                Full_Name: lastUser.Full_Name || "",
                Matric_Number: lastUser.Matric_Number || "",
                Passport: lastUser.Passport || "",
                Phone: lastUser.Phone || "",
                Wallet: lastUser.Wallet || "",
              }));
            }
          }
        } else {
          console.error("Error fetching data:", response.statusText);
          
          // Try to get data from localStorage if API fails
          const storedData = localStorage.getItem('userIdCardData');
          if (storedData) {
            setLatestData(JSON.parse(storedData));
          }
        }
      } catch (error) {
        console.error("Fetch error:", error);
        
        // Try to get data from localStorage if API fails
        const storedData = localStorage.getItem('userIdCardData');
        if (storedData) {
          setLatestData(JSON.parse(storedData));
        }
      } finally {
        setLoading(false);
      }
    };

    handleData();
  }, []);

  const downloadPDF = async () => {
    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    const logo = new Image();
    logo.src = "/oaulogo.png";
    logo.onload = () => {
      const logoWidth = 70;
      const logoHeight = 30;
      const logoX = (imgWidth - logoWidth) / 2;
      const logoY = 10;

      pdf.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);

      const date = new Date();
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      const dateTimeText = `Generated on: ${formattedDate} at ${formattedTime}`;
      const disclaimer =
        "Tender the QRcode in the ICT center for Physical ID card Collection";

      pdf.setFontSize(12);
      pdf.text(dateTimeText, imgWidth / 2, logoY + logoHeight + 10, {
        align: "center",
      });
      pdf.text(disclaimer, imgWidth / 2, logoY + logoHeight + 20, {
        align: "center",
      });

      // Add user information to the PDF
      position = logoY + logoHeight + 30;
      
      pdf.setFontSize(16);
      pdf.setTextColor(128, 0, 128); // Purple color
      pdf.text("DIGITAL ID CARD INFORMATION", imgWidth / 2, position, {
        align: "center",
      });
      
      position += 15;
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0); // Black color
      
      // Add user details
      pdf.text(`Full Name: ${latestData.Full_Name}`, 20, position);
      position += 10;
      pdf.text(`ID Number: ${latestData.Matric_Number}`, 20, position);
      position += 10;
      pdf.text(`Phone Number: ${latestData.Phone}`, 20, position);
      position += 10;
      pdf.text(`Wallet Address: ${latestData.Wallet}`, 20, position);
      position += 20;

      // Add QR code image
      pdf.addImage(imgData, "PNG", (imgWidth - imgHeight) / 2, position, imgHeight, imgHeight);
      position += imgHeight + 10;
      
      pdf.setFontSize(10);
      pdf.text("This digital ID card contains a QR code that can be scanned to verify your identity.", 20, position);
      position += 5;
      pdf.text("Please keep this document safe and present it when required.", 20, position);

      const pdfName = `${latestData.Full_Name.replace(/\s+/g, "_")}_ID_Card_${formattedDate.replace(
        /\//g,
        "-"
      )}.pdf`;
      pdf.save(pdfName);
    };
  };

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const to = formData.get("address");
    const value = formData.get("value");
    sendTransaction({ to, value: parseEther(value) });
  }

  return (
    <ThirdwebProvider>
      <div className="min-h-screen card-gradient ">
        <Toaster position="top-right" reverseOrder={false} />
        <LandingNavbar />

        <div className="  flex items-center justify-center min-h-[70vh]   ">
          <Background />
          {loading ? (
            <Loader />
          ) : latestData ? (
            <div className="w-full max-w-md px-4">
              <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                {/* Front Side of the Card */}
                <div className="items-center flex flex-col justify-center">
                  <div className="bg-black rounded-lg p-6 w-fit min-w-[320px] h-[380px] relative border border-purple-500 shadow-lg shadow-purple-500/20">
                    <div className="absolute top-2 left-2 text-xs text-purple-300">ID CARD</div>
                    <div className="absolute top-2 right-2 text-xs text-purple-300">STUDENT</div>
                    
                    <div className="flex justify-center mb-4 mt-4">
                      {latestData.Passport ? (
                        <img
                          src={latestData.Passport}
                          alt={latestData.Full_Name}
                          className="rounded-lg border-2 border-purple-500 shadow-md"
                          style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        />
                      ) : (
                        <div className="w-[120px] h-[120px] bg-gray-800 rounded-lg border-2 border-purple-500 flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center mb-6">
                      <p className="text-xl text-white font-bold mb-2">
                        {latestData.Full_Name}
                      </p>
                      <div className="space-y-2 mt-4">
                        <div className="bg-purple-900/30 rounded-md p-2">
                          <p className="text-sm text-white/70">
                            <span className="font-medium text-purple-300">ID: </span>
                            <span className="font-medium text-white">{latestData.Matric_Number || "N/A"}</span>
                          </p>
                        </div>
                        <div className="bg-purple-900/30 rounded-md p-2">
                          <p className="text-sm text-white/70">
                            <span className="font-medium text-purple-300">Phone: </span>
                            <span className="font-medium text-white">{latestData.Phone || "N/A"}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-2">
                      <img
                        src="/chip.png"
                        alt="Chip Icon"
                        className="rounded-full"
                        style={{ width: "40px", height: "40px" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Back Side of the Card */}
                <div className="items-center flex flex-col justify-center">
                  <div className="bg-black rounded-lg p-6 w-fit min-w-[320px] h-[380px] relative border border-purple-500 shadow-lg shadow-purple-500/20">
                    <div className="absolute top-2 left-2 text-xs text-purple-300">DIGITAL ID</div>
                    <div className="absolute top-2 right-2 text-xs text-purple-300">BLOCKCHAIN SECURED</div>
                    
                    <div className="flex flex-col items-center">
                      <div
                        className="flex justify-center mb-4 bg-white p-2 rounded-md w-fit items-center mx-auto mt-4"
                        ref={reportRef}
                      >
                        <QRCode
                          value={`Name: ${latestData.Full_Name}, ID: ${latestData.Matric_Number}, Wallet: ${
                            latestData.Wallet || "N/A"
                          }, Phone: ${latestData.Phone || "N/A"}`}
                          size={120}
                        />
                      </div>
                      
                      <div className="text-white text-sm space-y-3 w-full mt-2 bg-purple-900/20 p-3 rounded-md">
                        <p className="flex flex-col">
                          <span className="text-purple-300 font-medium">Wallet Address:</span>
                          <span className="font-medium text-xs break-all">{latestData.Wallet || "N/A"}</span>
                        </p>
                        <p className="flex flex-col">
                          <span className="text-purple-300 font-medium">Phone:</span>
                          <span className="font-medium">{latestData.Phone || "N/A"}</span>
                        </p>
                      </div>
                      
                      <div className="mt-4 text-center">
                        <p className="text-center text-white text-sm">
                          Valid till: <span className="text-purple-300">20/09/25</span>
                        </p>
                        <small className="text-center block text-white/70 px-1 mt-2 text-xs">
                          This ID should be returned to the Institution ICT center
                          if found
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </ReactCardFlip>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mt-6">
                <button
                  className="bg-[#471d47] border border-gray-500 text-white w-full sm:w-auto h-[48px] px-6 rounded-md hover:bg-[#5e235e] transition-colors"
                  onClick={handleFlip}
                >
                  Flip Card
                </button>
                <button
                  className="bg-[#5e235e] border border-gray-500 text-white w-full sm:w-auto h-[48px] px-6 rounded-md hover:bg-[#471d47] transition-colors"
                  onClick={downloadPDF}
                >
                  Download ID
                </button>
              </div>

              <div className="flex justify-center items-center mt-4">
                <button
                  className="bg-[#220c22] border border-gray-500 text-white w-full sm:w-auto h-[48px] px-8 rounded-md hover:bg-[#471d47] transition-colors"
                  onClick={openPayModal}
                >
                  Pay for Physical ID
                </button>
              </div>
              <div className="mt-4 text-center">
                <small>
                  <i className="text-white text-xs sm:text-sm">
                    The QR code will be used to confirm your identity in the
                    institution's ICT Center
                  </i>
                </small>
              </div>
            </div>
          ) : (
            <p className="text-white">No data available. Please create an ID first.</p>
          )}
        </div>

        <div className="flex justify-center items-center h-screen">
          <AnimatePresence>
            {isModalOpen && (
              <div
                className="fixed inset-0 bg-gray-400 bg-opacity-40 flex justify-center items-center z-50"
                onClick={closeModal}
              >
                <motion.div
                  className="bg-black p-6 rounded-lg shadow-lg max-w-[500px] w-full"
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  style={{ overflow: "hidden", wordBreak: "break-word" }}
                >
                  <div className="text-white">
                    <h2>Account</h2>
                    <div>status: {account.status}</div>
                  </div>

                  <small className="mb-8">
                    Wallet Address: {latestData.Wallet}
                  </small>

                  <form onSubmit={submit}>
                    <div className="form-group my-8">
                      <label
                        htmlFor="walletAddress"
                        className="block text-purple-700"
                      >
                        Receiver Wallet Address
                      </label>
                      <input
                        type="text"
                        className="mt-1 w-full p-2 border border-gray-300 rounded text-black"
                        name="address"
                        placeholder="0xA0Cf…251e"
                        required
                        style={{ overflow: "hidden", wordBreak: "break-word" }}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="amount" className="block text-purple-700">
                        Amount
                      </label>
                      <input
                        type="number"
                        className="mt-1 w-full p-2 border border-gray-300 rounded text-black"
                        name="value"
                        placeholder="0.05"
                        step="any"
                        required
                      />
                    </div>

                    {isConnected ? (
                      <div className="text-white">
                        <button
                          disabled={isPending}
                          type="submit"
                          className="mt-4 w-full text-center text-white bg-purple-700 hover:underline p-2 no-underline"
                        >
                          {isPending ? "Confirming..." : "Send"}
                        </button>
                      </div>
                    ) : null}
                  </form>

                  {hash && <div>Transaction Hash: {hash}</div>}
                  {isConfirming && <div>Waiting for confirmation...</div>}
                  {isConfirmed && <div>Transaction confirmed.</div>}
                  {error && <div>Error: {error.message}</div>}

                  <button
                    onClick={closeModal}
                    className="mt-4 w-full text-center text-purple-700 hover:underline border-2 p-2 no-underline"
                  >
                    Cancel
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Thirdweb PayEmbed Modal */}
          <AnimatePresence>
            {isPayModalOpen && (
              <div
                className="fixed inset-0 bg-gray-400 bg-opacity-40 flex justify-center items-center z-50"
                onClick={closePayModal}
              >
                <motion.div
                  className="bg-black p-6 rounded-lg shadow-lg max-w-[500px] w-full"
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <PayEmbed 
                    client={client}
                    onClose={closePayModal}
                    // Optional: customize PayEmbed as needed
                  />
                  <button
                    onClick={closePayModal}
                    className="mt-4 w-full text-center text-purple-700 hover:underline border-2 p-2 no-underline"
                  >
                    Cancel
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ThirdwebProvider>
  );
};

export default Page;