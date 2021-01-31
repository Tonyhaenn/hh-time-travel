const { expect } = require("chai");

const advanceTimeAndBlock_ONE = async function(forwardTime){
    const currentBlockNumber = await ethers.provider.getBlockNumber();
    const currentBlock = await ethers.provider.getBlock(currentBlockNumber);
    const currentTime = currentBlock.timestamp;
    const futureTime = currentTime + forwardTime;
    await ethers.provider.send('evm_setNextBlockTimestamp', [futureTime]);
    await ethers.provider.send('evm_mine',[]);

}
const advanceTimeAndBlock_TWO = async function ( forwardTime ) {
    const currentBlockNumber = await ethers.provider.getBlockNumber();
    const currentBlock = await ethers.provider.getBlock(currentBlockNumber);
    
    if(currentBlock === null ){
      /* Workaround for https://github.com/nomiclabs/hardhat/issues/1183
      */
      await ethers.provider.send('evm_increaseTime', [forwardTime]);
      await ethers.provider.send('evm_mine',[]);  
      //Set the next blocktime back to 15 seconds
      await ethers.provider.send('evm_increaseTime',[15]);
      return;
    }
    const currentTime = currentBlock.timestamp;
    const futureTime = currentTime + forwardTime;
    await ethers.provider.send('evm_setNextBlockTimestamp', [futureTime]);
    await ethers.provider.send('evm_mine',[]);
    
  };

  describe('Time Traveling, v1 and no contract updates', function(){
    let snapshotId;
    const ONE_MINUTE = 60;
    const ONE_HOUR = 60 * ONE_MINUTE;
    const ONE_DAY = 24 * ONE_HOUR;

    before( async () => {
        signers = await ethers.getSigners();
        const TimeTravelFactory = await ethers.getContractFactory("Time", signers[0]);
        
        timeTravelInstance = await TimeTravelFactory.deploy();
        
    });

    beforeEach( async function() {
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    });
    
    afterEach( async function() {
        await ethers.provider.send('evm_revert', [snapshotId]);
    });

    it('Advances time by one day', async ()=>{
        const day1 = await timeTravelInstance.daysElapsed();
        await advanceTimeAndBlock_ONE(1*ONE_DAY);
        const day2 = await timeTravelInstance.daysElapsed(); 
        expect(day2.toNumber()).to.equal(day1.toNumber()+1);
    }); 

    it('Advances time by two days', async()=>{
        const day1 = await timeTravelInstance.daysElapsed();
        
        await advanceTimeAndBlock_ONE(2*ONE_DAY);
        
        const day2 = await timeTravelInstance.daysElapsed(); 
        expect(day2.toNumber()).to.equal(day1.toNumber()+2);
    })
    it('Advances time by three days', async ()=>{
        const day1 = await timeTravelInstance.daysElapsed();
        
        await advanceTimeAndBlock_ONE(3*ONE_DAY);
        
        const day2 = await timeTravelInstance.daysElapsed(); 
        expect(day2.toNumber()).to.equal(day1.toNumber()+3);
    })
    it('Advances time by one hour', async ()=>{
        const hour1 = await timeTravelInstance.hoursElapsed();
        
        await advanceTimeAndBlock_ONE(1*ONE_HOUR);
        
        const hour2 = await timeTravelInstance.hoursElapsed(); 
        expect(hour2.toNumber()).to.equal(hour1.toNumber()+1);
    })
    it('Advances time by two hours',async ()=>{
        const hour1 = await timeTravelInstance.hoursElapsed();
        
        await advanceTimeAndBlock_ONE(2*ONE_HOUR);
        
        const hour2 = await timeTravelInstance.hoursElapsed(); 
        expect(hour2.toNumber()).to.equal(hour1.toNumber()+2);
    })
    it('Advances time by three hours', async ()=>{
        const hour1 = await timeTravelInstance.hoursElapsed();
        
        await advanceTimeAndBlock_ONE(3*ONE_HOUR);
        
        const hour2 = await timeTravelInstance.hoursElapsed(); 
        expect(hour2.toNumber()).to.equal(hour1.toNumber()+3);
    })
   
});
  describe('Time Traveling, v1 and with contract updates', function(){
    let snapshotId;
    const ONE_MINUTE = 60;
    const ONE_HOUR = 60 * ONE_MINUTE;
    const ONE_DAY = 24 * ONE_HOUR;

    before( async () => {
        signers = await ethers.getSigners();
        const TimeTravelFactory = await ethers.getContractFactory("Time", signers[0]);
        
        timeTravelInstance = await TimeTravelFactory.deploy();
        
    });

    beforeEach( async function() {
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    });
    
    afterEach( async function() {
        await ethers.provider.send('evm_revert', [snapshotId]);
    });

    it('Advances time by one day', async ()=>{
        const day1 = await timeTravelInstance.daysElapsed();
        await timeTravelInstance.incCounter(1);
        await advanceTimeAndBlock_ONE(1*ONE_DAY);
        await timeTravelInstance.incCounter(1);
        const day2 = await timeTravelInstance.daysElapsed(); 
        expect(day2.toNumber()).to.equal(day1.toNumber()+1);
    }); 

    it('Advances time by two days', async()=>{
        const day1 = await timeTravelInstance.daysElapsed();git 
        await timeTravelInstance.incCounter(1);
        await advanceTimeAndBlock_ONE(2*ONE_DAY);
        await timeTravelInstance.incCounter(1);
        const day2 = await timeTravelInstance.daysElapsed(); 
        expect(day2.toNumber()).to.equal(day1.toNumber()+2);
    })
    it('Advances time by three days', async ()=>{
        const day1 = await timeTravelInstance.daysElapsed();
        await timeTravelInstance.incCounter(1);
        await advanceTimeAndBlock_ONE(3*ONE_DAY);
        await timeTravelInstance.incCounter(1);
        const day2 = await timeTravelInstance.daysElapsed(); 
        expect(day2.toNumber()).to.equal(day1.toNumber()+3);
    })
    it('Advances time by one hour', async ()=>{
        const hour1 = await timeTravelInstance.hoursElapsed();
        await timeTravelInstance.incCounter(1);
        await advanceTimeAndBlock_ONE(1*ONE_HOUR);
        await timeTravelInstance.incCounter(1);
        const hour2 = await timeTravelInstance.hoursElapsed(); 
        expect(hour2.toNumber()).to.equal(hour1.toNumber()+1);
    })
    it('Advances time by two hours',async ()=>{
        const hour1 = await timeTravelInstance.hoursElapsed();
        await timeTravelInstance.incCounter(1);
        await timeTravelInstance.incCounter(1);
        await advanceTimeAndBlock_ONE(2*ONE_HOUR);
        await timeTravelInstance.incCounter(1);
        const hour2 = await timeTravelInstance.hoursElapsed(); 
        expect(hour2.toNumber()).to.equal(hour1.toNumber()+2);
    })
    it('Advances time by three hours', async ()=>{
        const hour1 = await timeTravelInstance.hoursElapsed();
        await timeTravelInstance.incCounter(1);
        await advanceTimeAndBlock_ONE(3*ONE_HOUR);
        await timeTravelInstance.incCounter(1);
        const hour2 = await timeTravelInstance.hoursElapsed(); 
        expect(hour2.toNumber()).to.equal(hour1.toNumber()+3);
    })
   
});

describe('Time Traveling, v2 and with contract updates', function(){
    let snapshotId;
    const ONE_MINUTE = 60;
    const ONE_HOUR = 60 * ONE_MINUTE;
    const ONE_DAY = 24 * ONE_HOUR;

    before( async () => {
        signers = await ethers.getSigners();
        const TimeTravelFactory = await ethers.getContractFactory("Time", signers[0]);
        
        timeTravelInstance = await TimeTravelFactory.deploy();
        
    });

    beforeEach( async function() {
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    });
    
    afterEach( async function() {
        await ethers.provider.send('evm_revert', [snapshotId]);
    });

    it('Advances time by one day', async ()=>{
        const day1 = await timeTravelInstance.daysElapsed();
        await timeTravelInstance.incCounter(1);
        await advanceTimeAndBlock_TWO(1*ONE_DAY);
        await timeTravelInstance.incCounter(1);
        const day2 = await timeTravelInstance.daysElapsed(); 
        expect(day2.toNumber()).to.equal(day1.toNumber()+1);
    }); 

    it('Advances time by two days', async()=>{
        const day1 = await timeTravelInstance.daysElapsed();
        await timeTravelInstance.incCounter(1);
        await advanceTimeAndBlock_TWO(2*ONE_DAY);
        await timeTravelInstance.incCounter(1);
        const day2 = await timeTravelInstance.daysElapsed(); 
        expect(day2.toNumber()).to.equal(day1.toNumber()+2);
    })
    it('Advances time by three days', async ()=>{
        const day1 = await timeTravelInstance.daysElapsed();
        await timeTravelInstance.incCounter(1);
        await advanceTimeAndBlock_TWO(3*ONE_DAY);
        await timeTravelInstance.incCounter(1);
        const day2 = await timeTravelInstance.daysElapsed(); 
        expect(day2.toNumber()).to.equal(day1.toNumber()+3);
    })
    it('Advances time by one hour', async ()=>{
        const hour1 = await timeTravelInstance.hoursElapsed();
        await timeTravelInstance.incCounter(1);
        await advanceTimeAndBlock_TWO(1*ONE_HOUR);
        await timeTravelInstance.incCounter(1);
        const hour2 = await timeTravelInstance.hoursElapsed(); 
        expect(hour2.toNumber()).to.equal(hour1.toNumber()+1);
    })
    it('Advances time by two hours',async ()=>{
        const hour1 = await timeTravelInstance.hoursElapsed();
        await timeTravelInstance.incCounter(1);
        await timeTravelInstance.incCounter(1);
        await advanceTimeAndBlock_TWO(2*ONE_HOUR);
        await timeTravelInstance.incCounter(1);
        const hour2 = await timeTravelInstance.hoursElapsed(); 
        expect(hour2.toNumber()).to.equal(hour1.toNumber()+2);
    })
    it('Advances time by three hours', async ()=>{
        const hour1 = await timeTravelInstance.hoursElapsed();
        await timeTravelInstance.incCounter(1);
        await advanceTimeAndBlock_TWO(3*ONE_HOUR);
        await timeTravelInstance.incCounter(1);
        const hour2 = await timeTravelInstance.hoursElapsed(); 
        expect(hour2.toNumber()).to.equal(hour1.toNumber()+3);
    })
   
});