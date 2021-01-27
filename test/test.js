const { expect } = require("chai");

const advanceTimeAndBlock_ONE = async function(forwardTime){
    const currentBlockNumber = await ethers.provider.getBlockNumber();
    const currentBlock = await ethers.provider.getBlock(currentBlockNumber);
    const currentTime = currentBlock.timestamp;
    const futureTime = currentTime + time;
    await ethers.provider.send('evm_setNextBlockTimestamp', [futureTime]);
    await ethers.provider.send('evm_mine',[]);

}
const advanceTimeAndBlock_TWO = async function ( forwardTime ) {
    const currentBlockNumber = await ethers.provider.getBlockNumber();
    const currentBlock = await ethers.provider.getBlock(currentBlockNumber);
    
    if(currentBlock === null ){
      /* Workaround for https://github.com/nomiclabs/hardhat/issues/1183
      */
      await ethers.provider.send('evm_increaseTime', [time]);
      await ethers.provider.send('evm_mine',[]);  
      await ethers.provider.send('evm_increaseTime',[15]);
      return;
    }
    const currentTime = currentBlock.timestamp;
    const futureTime = currentTime + time;
    await ethers.provider.send('evm_setNextBlockTimestamp', [futureTime]);
    await ethers.provider.send('evm_mine',[]);
    
  };

describe('Time Traveling Tests', function(){
    it()
});