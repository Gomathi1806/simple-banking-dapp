// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract SimpleBank {
    // The keyword "public" makes those variables readable from outside.
    address public owner;

    // balanceAmount is used to store customer balances
    mapping(address => uint) private balanceAmount;

    // Constructor is "payable" so it can receive the initial funding of 1, 2, ..., 10 ether
    constructor() payable {
        // msg.sender is the address of the creator
        owner = msg.sender;
    }

    // deposit Ether into bank, increment the balance of message sender, transaction should fail otherwise
    function deposit() public payable {
        require(
            (balanceAmount[msg.sender] + msg.value) >= balanceAmount[msg.sender]
        );
        balanceAmount[msg.sender] += msg.value;
    }

    // withdraw "amount" of Ether from the bank
    function withdraw(uint amount) public {
        require(balanceAmount[msg.sender] >= amount);
        balanceAmount[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    // check the customer balance
    function checkBalance() public view returns (uint) {
        return balanceAmount[msg.sender];
    }
}
