var CVContract = artifacts.require("./CVContract.sol");

contract('CVContract - Test Required Interface', function() {

  it("should return the correct address", function() {
    return CVContract.deployed().then(instance => {
      return instance.getAddress.call();
    }).then(address => {
        expectedAddress = "www.tweetegy.com";

        assert.equal(address, expectedAddress);
    })
  })

  it("should return the correct description", function() {
      return CVContract.deployed().then(instance => {
          return instance.getDescription.call();
      }).then(description => {
          expectedDescription = "This is an example";
          
          assert.equal(description, expectedDescription);
      })
  })

  it("should return the correct title", function() {
    return CVContract.deployed().then(instance => {
        return instance.getTitle.call();
    }).then(title => {
        expectedTitle = "SimpleExample";
        
        assert.equal(title, expectedTitle);
    })
  })

  it("should return the correct author", function() {
    return CVContract.deployed().then(instance => {
        return instance.getAuthor.call();
    }).then(author => {
        expectedAuthorName = "Thomas";
        expectedAuthorEmail = "thomas@example.org";
        
        assert.equal(author[0], expectedAuthorName);
        assert.equal(author[1], expectedAuthorEmail);
    })
  })
});