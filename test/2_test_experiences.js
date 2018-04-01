var CVContract = artifacts.require("./CVContract.sol");

contract('CVContract - Test Experiences', function(accounts) {

  it("should be deployed with zero experience counter value", function() {
    return CVContract.deployed().then(instance => {
      return instance.experienceCounter();
    }).then(experienceCounter => {
        assert.equal(experienceCounter, 0, "Experience list is empty");
    })
  })

  it("should be deployed with an empty experience list", function() {
    return CVContract.deployed().then(instance => {
      assert.equal(instance.experiences.length, 0, "Experience list is empty");
    })
  })

  // it("should only allow the contract owner to add experience", function() {
  //   return CVContract.deployed().then(instance => {
  //     var startDate = new Date(2016, 10, 1);
  //     var endDate = new Date(2016, 11, 31);

  //     instance.addNewExperience("Solidity Developer", "A Solidity Developer somewhere in the world", startDate.getTime(), endDate.getTime(), "Phnom Penh")
  //   })
  // })
});