import React, { useState } from "react";
import { motion } from "framer-motion";

function PayForm({ balance }) {
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Wallet Address:", walletAddress);
    console.log("Amount:", amount);
    // Handle the form submission logic here
  };

  return (
    <div className="pay-form-container">
      <motion.div
        initial={{ y: -100, opacity: 0 }} // Start position above the screen
        animate={{ y: 0, opacity: 1 }} // End position in view
        transition={{ duration: 0.5, ease: "easeOut" }} // Animation settings
      >
        <h2>Pay</h2>
        <p>Current Balance: {balance} ETH</p> {/* Display the balance */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="walletAddress">Wallet Address</label>
            <input
              type="text"
              id="walletAddress"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <button type="submit">Send</button>
        </form>
      </motion.div>
    </div>
  );
}

export default PayForm;
