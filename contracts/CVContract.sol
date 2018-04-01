pragma solidity ^0.4.18;

import "./CVExtender.sol";

contract CVContract is CVExtender {
    //Add experiences
    struct Experience {
        string title;
        string description;
        int fromDate;
        int toDate;
        string location;
    }

    event ExperienceAddedEvent(uint256 counter, string title, string description, int fromDate, int toDate, string location);

    mapping (uint256 => Experience) public experiences;

    uint256 public experienceCounter;

    function addNewExperience(string newTitle, string newDescription, int newFromDate, int newToDate, string newLocation) public {
        require(newToDate < newFromDate);

        Experience memory newExperience = Experience({title: newTitle, description: newDescription, fromDate: newFromDate, toDate: newToDate, location: newLocation});

        experienceCounter++;

        experiences[experienceCounter] = newExperience;

        ExperienceAddedEvent(experienceCounter, newTitle, newDescription, newFromDate, newToDate, newLocation);
    }

    /**
     * Below is for our CV!
     * */
    function getAddress() public view returns(string) {
        return "www.tweetegy.com";
    }

    function getDescription() public view returns(string) {
        return "This is an example";
    }
    function getTitle() public view returns(string) {
        return "SimpleExample";
    }
    function getAuthor() public view returns(string, string) {
        return ("Thomas", "thomas@example.org");
    }
}
