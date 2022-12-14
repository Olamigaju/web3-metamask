// // This function detects most providers injected at window.ethereum
// import detectEthereumProvider from '@metamask/detect-provider';

// const provider = await detectEthereumProvider();

// if (provider) {
//   // From now on, this should always be true:
//   // provider === window.ethereum
//   startApp(provider); // initialize your app
// } else {
//   console.log('Please install MetaMask!');
// }

const ethereumButton = document.querySelector('.enableEthereumButton');
const sendEthButton = document.querySelector('.sendEthButton');

let accounts = [];

//Sending Ethereum to an address


 sendEthButton.addEventListener('click', () => {
  ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: '0xe9BD4Bd3222f583F9Bb564C5cEE7d5C553bE81aa',//replace with your
          value: "0x" + Number(Web3.utils.toWei("13", "ether")).toString(16),
          gasPrice: '0x09184e72a000',
          gas: "0x" + (21000).toString(16)
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
});

ethereumButton.addEventListener('click', () => {
  getAccount();
  
});

async function getAccount() {
  accounts = await ethereum.request({ method: 'eth_requestAccounts' });
}