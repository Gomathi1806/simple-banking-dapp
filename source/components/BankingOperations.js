// src/components/BankingOperations.js
import React, { useState } from 'react'

const BankingOperations = ({ onDeposit, onWithdraw, getBalance }) => {
  const [amount, setAmount] = useState('')

  const handleDeposit = () => {
    if (amount) {
      onDeposit(amount)
      setAmount('')
    }
  }

  const handleWithdraw = () => {
    if (amount) {
      onWithdraw(amount)
      setAmount('')
    }
  }

  return (
    <div>
      <h1>Banking Operations</h1>
      <p>Balance: {getBalance()} ETH</p>
      <label htmlFor='amount'>Amount:</label>
      <input
        type='text'
        id='amount'
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  )
}

export default BankingOperations
