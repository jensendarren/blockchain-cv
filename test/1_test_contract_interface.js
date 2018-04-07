var CVContract = artifacts.require("./CVContract.sol");

contract('CVContract - Test Required Interface', async() => {

  it("should return the correct address", async() => {
    let cv = await CVContract.deployed();
    let address = await cv.getAddress();

    expectedAddress = "www.tweetegy.com";
    assert.equal(address, expectedAddress);
  })

  it("should return the correct description", async() => {
    let cv = await CVContract.deployed();
    let description = await cv.getDescription();

    expectedDescription = "This is an example";
    assert.equal(description, expectedDescription);
  })

  it("should return the correct title", async() => {
    let cv = await CVContract.deployed();
    let title = await cv.getTitle();

    expectedTitle = "SimpleExample";
    assert.equal(title, expectedTitle);
  })

  it("should return the correct author", async() => {
    let cv = await CVContract.deployed();
    let author = await cv.getAuthor();

    expectedAuthorName = "Darren Jensen";
    expectedAuthorEmail = "darren.jensen@gmail.com";

    assert.equal(author[0], expectedAuthorName);
    assert.equal(author[1], expectedAuthorEmail);
  })
});