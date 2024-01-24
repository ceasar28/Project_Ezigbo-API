const { ethers } = require("ethers");
const ContractAbi = require("../utils/abi.json");

module.exports = async function () {
  const CONTRACT_ADDRESS = "0x6439B124574BC91A45575F7a111745CFe59b2A17";
  const RPC_URL = "https://testnet.toronet.org/rpc/"; // Replace with your Ethereum node's RPC URL

  // using RPC method
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

  // If you need to interact as a wallet holder
  // const privateKey = "YOUR_PRIVATE_KEY"; // Add your private key
  // const wallet = new ethers.Wallet(privateKey, provider);

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ContractAbi,
    provider
    // If interacting as a wallet holder, use 'wallet' instead of 'provider' above
  );

  return contract;
};
