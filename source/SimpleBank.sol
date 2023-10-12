// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleBank {

    mapping(address => uint) private balances;
    
    address private owner;
    
    event LogDepositMade(address indexed accountAddress, uint amount);
    event LogWithdrawMade(address indexed accountAddress, uint amount);

    constructor() {
        owner = msg.sender;
    }

    
    modifier onlyOwner {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    
    modifier sufficientFunds(uint amount) {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        _;
    }

    
    function deposit(uint amount) public onlyOwner returns (uint) {
        balances[msg.sender] += amount;
        emit LogDepositMade(msg.sender, amount);
        
        return balances[msg.sender];
    }

   
    function withdraw(uint withdrawAmount) public sufficientFunds(withdrawAmount) returns (uint remainingBal) {
        balances[msg.sender] -= withdrawAmount;
        payable(msg.sender).transfer(withdrawAmount);
        emit LogWithdrawMade(msg.sender, withdrawAmount);

        return balances[msg.sender];
    }

    
    function balanceOf(address _owner) public view returns (uint balance) {
        return balances[_owner];
    }
}
