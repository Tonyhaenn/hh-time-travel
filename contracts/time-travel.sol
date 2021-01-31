//SPDX-License-Identifier: ISC
pragma solidity >=0.5.8 <0.8.0;

contract Time {
  uint256 public contractStartTime;
  uint256 public counter;

  constructor(){
      contractStartTime = block.timestamp;
  }

  function incCounter(uint256 increment) public {
    counter += increment; 
  }
  
  function daysElapsed() public view returns(uint256) {
    uint256 secondsElapsed = block.timestamp - contractStartTime;
    return ((secondsElapsed + 1 days) / 1 days);
  }
  function hoursElapsed() public view returns(uint256) {
    uint256 secondsElapsed = block.timestamp - contractStartTime;
    return ((secondsElapsed + 1 hours) / 1 hours);
  }
}