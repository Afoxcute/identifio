const { web3 } = require("hardhat");
const artifacts = require("../artifacts/contracts/Lock.sol/Lock.json");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = web3.utils.toWei("0.001", "ether");

  const [deployer] = await web3.eth.getAccounts();
  const lockContract = new web3.eth.Contract(artifacts.abi);
  const rawContract = lockContract.deploy({
    data: artifacts.bytecode,
    arguments: [unlockTime],
  });

  const lock = await rawContract.send({
    from: deployer,
    gasPrice: "10000000000",
    value: lockedAmount.toString(),
  });

  console.log(
    `Lock with ${web3.utils.toWei(
      lockedAmount,
      "ether"
    )}ETH and unlock timestamp ${unlockTime} deployed to ${
      lock.options.address
    }`
  );
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
