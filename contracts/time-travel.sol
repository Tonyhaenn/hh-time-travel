//SPDX-License-Identifier: ISC
pragma solidity >=0.5.8 <0.8.0;

contract Time {
  uint256 contractStartTime;

  constructor(){
      contractStartTime = block.timestamp;
  }

  function elapsed(string datepart) public view returns(uint256){
    uint256 secondsElapsed = block.timestamp - contractStartTime;
    if(datepart == 'DAY'){
        return ((secondsElapsed + 1 days) / 1 days);
    }  else if(datepart == 'HOUR'){
        return ((secondsElapsed + 1 hours) / 1 hours);
    } else if (datepart == 'MINUTE'){
        return ((secondsElapsed + 1 hours) / 1 hours);
    }
  }
  function daysElapsed() public view returns(uint256) {
    return elapsed('DAY');
  }
  function hoursElapsed() public view returns(uint256) {
      return elapsed('HOUR');
  }
  function minElapsed() public view returns(uint256) {
      return elapsed('MINUTE');
  }
}