import Web3 from 'web3';

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  web3 = new Web3(window.ethereum);
  window.ethereum.request({ method: 'eth_requestAccounts' });
} else {
    throw new Error("User not running MetaMasj=k")
//   const provider = new Web3.providers.HttpProvider(
//     'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'
//   );
//   web3 = new Web3(provider);
}

export default web3;
