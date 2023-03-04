/** @type import('hardhat/config').HardhatUserConfig */
// hardhat.config.js
const { alchemyApiKey, mnemonic } = require('./secrets.json');
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-truffle5")
module.exports = {
      networks: {
         goerli: {
           url: `https://eth-goerli.alchemyapi.io/v2/${alchemyApiKey}`,
           accounts: { mnemonic: mnemonic },
         },
      },
  solidity: "0.8.17",
};
