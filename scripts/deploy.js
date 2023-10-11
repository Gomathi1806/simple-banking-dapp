async function main () {
  const BankContract = await ethers.getContractFactory('BankContract')
  const bankContract = await BankContract.deploy()

  await bankContract.deployed()

  console.log('BankContract deployed to:', bankContract.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
