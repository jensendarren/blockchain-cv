var CVContract = artifacts.require("./CVContract.sol");

module.exports = function(deployer) {
  deployer.deploy(CVContract);
};
