import React, { useState } from 'react'
import './App.css'
import LoginPage from './components/LoginPage'
import BankingOperations from './components/BankingOperations'
import web3 from '../web3' // Import the web3 instance

const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138' // Replace with your contract address
const contractAbi = [
  {
    inputs: [],
    stateMutability: 'payable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'checkBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] // Replace with your contract ABI

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
