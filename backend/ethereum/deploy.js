const mnemonic = "express clean uncover tumble strike account crush paddle whale cushion film pioneer";

const HDWalletProvider = require("truffle-hdwallet-provider");
const provider = new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/e090ab77bbe446e597ee121b9e4e2cc0');

const Web3 = require("web3");
const web3 = new Web3(provider);

const contract = require('truffle-contract');
let TokenContract = require('./build/Token.json');

let newToken = contract(TokenContract);
newToken.setProvider(provider);

(async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Account 1:', accounts[0]);
  console.log('Account 2:', accounts[1]);

  // set contract owner address
  // must use lowercase or will get "private key should be a Buffer" error
  newToken.defaults({from: accounts[0].toLowerCase()}); 

  // deploy a new version of this contract to the network
  let deployed = await newToken.new('TEST','TestToken', 0, 1000000, accounts[0]);

  let owner = await deployed.owner();
  console.log('Contract owner:', owner);

  let balance = await deployed.balanceOf(accounts[0]);
  console.log('Balance of genesis address: ', balance);

  // let newContractAddress = await deployed.this();
  // console.log('Address of newly deployed token', newContractAddress);
})()
