
// const request = require('request');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
 //Use body-parser to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// List of transactions
const transactions = [];

// Function to create a new transaction
function createTransaction(amount, sender, receiver) {
  // Create a new transaction object with the given values
  const transaction = {
    amount: amount,
    from: sender,
    to: receiver,
    status: 'pending', // Set the initial status to pending
  };

  // Add the transaction to the list of transactions
  transactions.push(transaction);

  // Return the transaction
  return transaction;
}

// Function to send a transaction to the frontend for payment
function sendTransactionForPayment(transaction) {
  // Send the transaction to the frontend URL for payment
  request.post('/pay', { json: transaction }, (error, res, body) => {
    if (error) {
      console.error(error);
      return;
    }

    // Update the transaction status based on the response from the frontend
    if (res.statusCode === 200) {
      transaction.status = 'success';
    } else {
      transaction.status = 'failed';
    }
  });
}

// Function to get the status of a transaction
function getTransactionStatus(transaction) {
  return transaction.status;
}

// Endpoint to create a new transaction
app.post('/transaction', (req, res) => {
  // Create a new transaction with the request body
  const transaction = createTransaction(req.body.amount, req.body.sender, req.body.receiver);

  // Send the transaction to the frontend for payment
  sendTransactionForPayment(transaction);

  // Return the transaction
  res.json(transaction);
});

// Endpoint to get the status of a transaction
app.get('/transaction/:id', (req, res) => {
  // Find the transaction with the given ID
  const transaction = transactions.find(t => t.id === req.params.id);

  // Return the status of the transaction
  res.json({ status: getTransactionStatus(transaction) });
});

// Start the server
app.listen(5000, () => {
  console.log('Server listening on port 3000');
});