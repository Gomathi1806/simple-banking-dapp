import React, { useState } from 'react'
import './App.css'
import LoginPage from './components/LoginPage'
import BankingOperations from './components/BankingOperations'
import web3 from '../web3' // Import the web3 instance

const contractAddress = '0x0d1b79c59d4d532fadE752E6F7A18842C909A853' // Replace with your contract address
const contractAbi = [
  [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "accountAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "LogDepositMade",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "accountAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "LogWithdrawMade",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "withdrawAmount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "remainingBal",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

function App () {
  const [loggedIn, setLoggedIn] = useState(false)
  const [accountNumber, setAccountNumber] = useState('')

  const handleLogin = account => {
    setLoggedIn(true)
    setAccountNumber(account)
  }

  const handleDeposit = async amount => {
    // Interact with the deposit function of your smart contract
    const contract = new web3.eth.Contract(contractAbi, contractAddress)
    await contract.methods.deposit().send({
      from: accountNumber,
      value: web3.utils.toWei(amount, 'ether')
    })
  }

  const handleWithdraw = async amount => {
    // Interact with the withdraw function of your smart contract
    const contract = new web3.eth.Contract(contractAbi, contractAddress)
    await contract.methods.withdraw(web3.utils.toWei(amount, 'ether')).send({
      from: accountNumber
    })
  }

  return (
    <div className='App'>
      {!loggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <BankingOperations
          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
          getBalance={() => balance}
          contractAddress={contractAddress}
          contractAbi={contractAbi}
        />
      )}
    </div>
  )
}

export default App
