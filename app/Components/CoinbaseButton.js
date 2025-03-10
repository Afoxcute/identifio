import React, { useEffect, useState } from "react";
import { CoinbaseWalletLogo } from "./CoinbaseWalletLogo";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";

const buttonStyles = {
  background: "#4c1d95",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontFamily: "Arial, sans-serif",
  fontWeight: "bold",
  fontSize: "16px",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background 0.3s",
};

const connectedContainerStyles = {
  display: "flex",
  alignItems: "center",
  fontFamily: "Arial, sans-serif",
  padding: "10px",
  backgroundColor: "#F0F4FF",
  borderRadius: "8px",
  color: "#333",
  fontSize: "16px",
  marginTop: "10px",
  gap: "10px",
};

const copyButtonStyles = {
  marginLeft: "10px",
  backgroundColor: "#4c1d95",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
};

export default function CoinbaseButton() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [copySuccess, setCopySuccess] = useState("");

  function connectToSmartWallet() {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK"
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  }

  function handleDisconnect() {
    disconnect();
    router.push("/");
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(address);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 2000); // Reset after 2 seconds
  }

  if (isConnected)
    return (
      <>
        <div style={connectedContainerStyles}>
          <p>
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
          <button style={copyButtonStyles} onClick={copyToClipboard}>
            {copySuccess ? copySuccess : "Copy Address"}
          </button>
          <button style={buttonStyles} onClick={handleDisconnect}>
            <CoinbaseWalletLogo />
            <span style={{ marginLeft: "10px" }}>Disconnect</span>
          </button>
        </div>
      </>
    );

  return (
    <button style={buttonStyles} onClick={connectToSmartWallet}>
      <CoinbaseWalletLogo />
      <span style={{ marginLeft: "10px" }}>Connect Wallet</span>
    </button>
  );
}
