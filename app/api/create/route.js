import { NextResponse } from "next/server";
import { Client, Databases, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66c693750000c6c56590");

const databases = new Databases(client);

export async function POST(request) {
  try {
    const { Matric_Number, Full_Name, Passport, Phone, Wallet, Private_Key } =
      await request.json();

    const response = await databases.createDocument(
      "66c697500037408588ce",
      "66c8165400080ed249cf",
      ID.unique(),
      { Matric_Number, Full_Name, Passport, Phone, Wallet, Private_Key }
    );

    return NextResponse.json(
      { message: "Topic Created", data: response },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating document:", error);
    return NextResponse.json(
      { error: "Failed to create document" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await databases.listDocuments(
      "66c697500037408588ce",
      "66c8165400080ed249cf"
    );

    return NextResponse.json(
      { message: "Documents retrieved successfully", data: response.documents },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving documents:", error);
    return NextResponse.json(
      { error: "Failed to retrieve documents" },
      { status: 500 }
    );
  }
}

// "use client";
// import { useUser } from "@clerk/nextjs";
// import React, { useState } from "react";
// // import { useRouter } from "next/router";
// import { motion } from "framer-motion";
// import Web3 from "web3";
// import Loader from "./Loader";
// import Background from "./Background";
// import { UploadButton } from "@uploadthing/react";
// import { useRouter } from "next/navigation";

// function AuthUser() {
//   const { user } = useUser();
//   const router = useRouter();

//   const [matricNumber, setMatricNumber] = useState("");
//   const [hashedAddress, setHashedAddress] = useState("");
//   const [image, setImage] = useState("");
//   const [name, setName] = useState("");
//   const [balance, setBalance] = useState("");
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleMatricNumberChange = async (e) => {
//     const value = e.target.value;
//     setMatricNumber(value);

//     if (!value) {
//       setHashedAddress("");
//       setBalance("");
//       return;
//     }

//     const web3 = new Web3();
//     const hashedMatricNumber = web3.utils.sha3(value);
//     console.log(hashedMatricNumber, "hashed matric number");

//     try {
//       const account = web3.eth.accounts.privateKeyToAccount(hashedMatricNumber);
//       setHashedAddress(account.address);

//       const balanceWei = await web3.eth.getBalance(account.address);
//       const balanceEth = web3.utils.fromWei(balanceWei, "ether");
//       setBalance(balanceEth);
//       console.log(balanceEth, "balance");
//     } catch (error) {
//       console.error("Error fetching balance:", error);
//       setHashedAddress("");
//       setBalance("");
//     }
//   };

//   const inputVariants = {
//     hidden: { x: -100, opacity: 0 },
//     visible: (i) => ({
//       x: 0,
//       opacity: 1,
//       transition: {
//         delay: i * 0.3,
//         duration: 0.5,
//       },
//     }),
//   };

//   const textVariants = {
//     hidden: { y: -50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.8,
//       },
//     },
//   };

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center">
//         <Loader />
//       </div>
//     );
//   }

//   const handleCreateId = async (e) => {
//     e.preventDefault();

//     setLoading(true); // Start loading

//     const payload = {
//       Matric_Number: matricNumber,
//       Full_Name: name,
//       Passport: image,
//       Phone: phone,
//       Wallet: hashedAddress,
//     };

//     try {
//       const response = await fetch("/api/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log("Success:", result);

//         setTimeout(() => {
//           router.push("/card");
//         }, 1500);
//       } else {
//         console.error("Failed to create document:", await response.json());
//         setSuccess(false);
//       }
//     } catch (error) {
//       console.error("Error creating document:", error);
//       setSuccess(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div className="mt-[100px] flex justify-center">
//       <div className="border-2 border-[#7DD3FCB3] p-6 rounded-lg max-w-4xl w-full">
//         <Background />
//         <motion.form
//           className="flex flex-col items-center"
//           initial="hidden"
//           animate="visible"
//           onSubmit={handleCreateId}
//         >
//           <motion.div
//             className="flex flex-col items-center"
//             variants={textVariants}
//           >
//             <p>Welcome, {user.firstName}!!!</p>
//             <p className="text-center text-[#7DD3FCB3]">
//               Fill The Form To Request For Your University ID
//             </p>
//           </motion.div>

//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
//             variants={textVariants}
//           >
//             {/* Matric Number Input */}
//             <motion.div
//               className="flex flex-col space-y-2"
//               variants={inputVariants}
//               custom={0}
//             >
//               <label className="text-[#7DD3FCB3]">Matric Number</label>
//               <small>must be in capital letters</small>
//               <motion.input
//                 className="border-b-2 border-[#7DD3FCB3] focus:outline-none text-black w-full max-w-xs"
//                 type="text"
//                 placeholder="BCH/2019/097"
//                 value={matricNumber}
//                 onChange={handleMatricNumberChange}
//                 whileFocus={{ scale: 1.05 }}
//               />
//             </motion.div>

//             {/* Name Input */}
//             <motion.div
//               className="flex flex-col space-y-2"
//               variants={inputVariants}
//               custom={2}
//             >
//               <label className="text-[#7DD3FCB3]">Name</label>
//               <motion.input
//                 className="border-b-2 border-[#7DD3FCB3] focus:outline-none text-black w-full max-w-xs"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 whileFocus={{ scale: 1.05 }}
//               />
//             </motion.div>

//             {/* Wallet Address Input */}
//             <motion.div
//               className="flex flex-col space-y-2"
//               variants={inputVariants}
//               custom={2}
//             >
//               <label className="text-[#7DD3FCB3]">Wallet Address</label>
//               <motion.input
//                 className="border-b-2 border-[#7DD3FCB3] focus:outline-none text-black w-full max-w-xs"
//                 value={hashedAddress}
//                 readOnly
//                 type="text"
//                 whileFocus={{ scale: 1.05 }}
//               />
//             </motion.div>

//             {/* Balance Input */}
//             <motion.div
//               className="flex flex-col space-y-2"
//               variants={inputVariants}
//               custom={3}
//             >
//               <label className="text-[#7DD3FCB3]">Balance</label>
//               <motion.input
//                 className="border-b-2 border-[#7DD3FCB3] focus:outline-none text-black w-full max-w-xs"
//                 value={balance}
//                 readOnly
//                 type="text"
//                 whileFocus={{ scale: 1.05 }}
//               />
//             </motion.div>

//             {/* Phone Number Input */}
//             <motion.div
//               className="flex flex-col space-y-2"
//               variants={inputVariants}
//               custom={5}
//             >
//               <label className="text-[#7DD3FCB3]">Phone Number</label>
//               <motion.input
//                 className="border-b-2 border-[#7DD3FCB3] focus:outline-none text-black w-full max-w-xs"
//                 type="text"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 whileFocus={{ scale: 1.05 }}
//               />
//             </motion.div>

//             {/* Image Upload */}
//             <motion.div
//               className="flex flex-col space-y-2"
//               variants={inputVariants}
//               custom={4}
//             >
//               <label className="text-[#7DD3FCB3]">Image (passport photo)</label>
//               <UploadButton
//                 endpoint="imageUploader"
//                 onClientUploadComplete={(res) => {
//                   console.log("Files: ", res);
//                   if (res && Array.isArray(res) && res.length > 0) {
//                     setImage(res[0].url);
//                   }
//                 }}
//                 onUploadError={(error) => {
//                   alert(`ERROR! ${error.message}`);
//                 }}
//               />
//             </motion.div>
//           </motion.div>

//           {/* Submit Button */}
//           <motion.button
//             className="mt-6 px-4 py-2 bg-[#7DD3FCB3] text-white rounded-lg hover:bg-[#7dd3fc] transition-colors duration-300 w-full max-w-xs"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             disabled={loading} // Disable the button while loading
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </motion.button>

//           {/* Success Message */}
//           {success && !loading && (
//             <p className="text-green-500 mt-4">
//               Submission Successful! Redirecting...
//             </p>
//           )}
//         </motion.form>
//       </div>
//     </motion.div>
//   );
// }

// export default AuthUser;
