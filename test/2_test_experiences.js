var CVContract = artifacts.require("./CVContract.sol");

contract('CVContract - Test Experiences', async(accounts) => {
  var startDate = new Date(2014, 1, 1);
  var endDate = new Date(2014, 12, 1);
  var cv;

  beforeEach('Before', async() => {
    cv = await CVContract.deployed();
  })

  it("should be deployed with zero experience counter value", async() => {
    let counter = await cv.experienceCounter();

    assert.equal(counter, 0, "Experience counter starts at 0");
  })

  it("should be deployed with an empty experience list", async() => {
    assert.equal(cv.experiences.length, 0, "Experience list is empty");
  })

  it("should reject adding a new experience by non-owner", async() => {
    let tx = await cv.addNewExperience("Solidity Developer", "A Solidity Developer somewhere in the world", startDate.getTime(), endDate.getTime(), "Phnom Penh", {from: accounts[1]});

    assert.equal(tx.logs.length, 0, "Experience was added by a non-owner");
  })

  it("should allow the contract owner to add experience and emit as an event", async() => {
    let tx = await cv.addNewExperience("Solidity Developer", "A Solidity Developer somewhere in the world", startDate.getTime(), endDate.getTime(), "Phnom Penh", {from: accounts[0]});

    assert.equal(tx.logs.length, 1, "owner unable to add experience");
    assert.equal(tx.logs[0].event, "ExperienceAddedEvent", "expected event, ExperienceAddedEvent, not fired");
  })

  it("should not allow the end date to be before the state date", async() => {
    return CVContract.deployed().then(instance => {

      //NOTE: startDate and endDate have been swapped in the call below!
      return instance.addNewExperience("Solidity Developer", "A Solidity Developer somewhere in the world", endDate.getTime(), startDate.getTime(), "Phnom Penh", {from: accounts[0]});

    }).then(assert.fail)
      .catch(error => {
          assert.include(
              error.message,
              'revert',
              'Start date should be before the end date'
          )
    })
  })

  it("should be able to get a list of experience ids", async() => {
    await cv.addNewExperience("Solidity Developer", "A Solidity Developer somewhere in the world", startDate.getTime(), endDate.getTime(), "Phnom Penh", {from: accounts[0]});
    let experiences = await cv.listExperiences();

    assert.equal(experiences.length > 0, true, "The experience list is empty when it should contain ids");
    assert.equal(experiences[0].toNumber(), 1, "The first experience ID is not 1");
  })

  it("should be possible to fetch an experience by ID", async() => {
    let experience = await cv.getExperience(1);

    console.log(experience);
  })
});