const { Web3 } = require("web3");

const web3 = new Web3("http://127.0.0.1:8545/");

(async () => {
  const privateKey =
    "0x1ba7ef57e32a970d58d1cc36b6f4ea85bfc074c4cba779465edd3c86a5139fef";
  const sender = "0x846563eB0F4361DF21cb6039da5F4C48d3FDAbfE";
  const receiverAddress = "0x4d7848f0f9aD56327aE9A0dff1AD6596EC9b83dF";

  const block = await web3.eth.getBlock("latest");

  const baseFeePerGas = BigInt(block.baseFeePerGas);
  const priorityFee = BigInt(web3.utils.toWei("0.0001", "ether")); // Convert priority fee to BigInt

  const maxFeePerGas = (baseFeePerGas + priorityFee).toString();
  const transaction = {
    from: sender,
    to: receiverAddress,
    value: web3.utils.toWei("0.0005", "ether"),
    maxFeePerGas: maxFeePerGas,
    maxPriorityFeePerGas: priorityFee.toString(),
    gas: 21000, // Gas limit
  };

  const signedTransaction = await web3.eth.accounts.signTransaction(
    transaction,
    privateKey
  );

  try {
    const receipt = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );
    console.log("Transaction successful:", receipt);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
})();
