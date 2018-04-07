pragma solidity ^0.4.17;

import "./CVExtender.sol";
import "./mortal.sol";

contract CVContract is CVExtender, mortal {
  //Add experiences
  struct Experience {
    string title;
    string description;
    int startDate;
    int endDate;
    string location;
  }

  event ExperienceAddedEvent(uint256 counter, string title, string description, int startDate, int endDate, string location);

  mapping (uint256 => Experience) public experiences;

  uint256 public experienceCounter;

  function addNewExperience(string newTitle, string newDescription, int newStartDate, int newEndDate, string newLocation) onlyowner public returns(uint256 experienceId) {
    require(newStartDate < newEndDate);

    Experience memory newExperience = Experience({title: newTitle, description: newDescription, startDate: newStartDate, endDate: newEndDate, location: newLocation});

    experienceCounter++;

    experiences[experienceCounter] = newExperience;

    emit ExperienceAddedEvent(experienceCounter, newTitle, newDescription, newStartDate, newEndDate, newLocation);

    return experienceCounter;
  }

  function listExperiences() public view returns(uint256[] ids) {
    assert(experienceCounter > 0);
    ids = new uint256[](experienceCounter);
    
    // titles = new string[](experienceCounter);
    // descriptions = new string[](experienceCounter);
    // startDates = new int[](experienceCounter);
    // endDates = new int[](experienceCounter);

    for (uint i = 1; i <= experienceCounter; i++) {
      ids[i - 1] = i;
      // titles[i - 1] = experiences[i].title;
      // descriptions[i - 1] = experiences[i].description;
      // startDates[i - 1] = experiences[i].startDate;
      // endDates[i - 1] = experiences[i].endDate;
    }

    return (ids); //, startDates, endDates);
  }

  function getExperience(uint256 id) public view returns(string title, string location, int startDate, int endDate, string description) {
    Experience memory experience = experiences[id];
    title = experience.title;
    location = experience.location;
    startDate = experience.startDate;
    endDate = experience.endDate;
    description = experience.description;
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
    return ("Darren Jensen", "darren.jensen@gmail.com");
  }
}
