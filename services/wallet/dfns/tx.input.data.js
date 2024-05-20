const ethers = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(
  `https://staging-v2.skalenodes.com/v1/fit-graffias`
);

// const ERC20_ABI = [
//   "function name() view returns (string)",
//   "function symbol() view returns (string)",
//   "function totalSupply() view returns (uint256)",
//   "function balanceOf(address) view returns (uint)",
//   "function transfer(address dst, uint rawAmount) external returns (bool)",
//   "function transferFrom(address src, address dst, uint rawAmount) external returns (bool)",
// ];

// const address = "0xCF487EFd00B70EaC8C28C654356Fb0E387E66D62";
// const contract = new ethers.Contract(address, ERC20_ABI, provider);

const main = async () => {
  // const tx = await contract.populateTransaction.transfer(
  //   "0xe01d1541E855A75403f8cAff24c3b2A7e54FA412",
  //   ethers.utils.parseEther("0.002")
  // );
  // console.log(tx);

  const balance = await provider.getBalance(
    "0x81e02775144DCC13D28cA58d947926d5FE60ad98"
  );

  console.log(ethers.utils.formatEther(balance));
};

main();
