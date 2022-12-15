const Web3 = require("web3");
const express = require("express");

// Replace with the actual values of your Ethereum network
const RPC_URL = "http://localhost:7545";
const FROM_ADDRESS = "0x...";
const TO_ADDRESS = "0x...";

// Initialize the web3 instance
const web3 = new Web3(RPC_URL);

// Initialize the express app
const app = express();

// Create a new transaction
app.post("/create-transaction", (req, res) => {
  // Read the values from the request body
  const { value, gasLimit, gasPrice } = req.body;

  // Create the raw transaction object
  const rawTransaction = {
    from: FROM_ADDRESS,
    to: TO_ADDRESS,
    value: web3.utils.toWei(value, "ether"),
    gasLimit,
    gasPrice,
  };

  // Send the raw transaction to the specified frontend URL
  fetch(`${req.body.frontendUrl}/send-transaction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rawTransaction),
  });

  // Return a success message
  return res.send("Transaction created and sent to frontend");
});

// Check the status of a transaction
app.get("/transaction-status/:transactionHash", (req, res) => {
  // Get the transaction hash from the URL parameters
  const { transactionHash } = req.params;

  try {
    // Check the transaction receipt to determine the status
    const receipt = web3.eth.getTransactionReceipt(transactionHash);

    // Return the transaction receipt
    return res.send(receipt);
  } catch (error) {
    // Return an error if the transaction receipt is not found
    return res.send(error.message);
  }
});
