# Blockchain CV App

## Development mode

In one terminal window run `truffle develop`
In the truffle develop console run `migrate --reset`
In a second terminal window run `npm run start`

## Migrate and interact with contracts in Truffle development console

Open a truffle develop console: `truffle develop`
Now in the truffle develop console window run `migrate --reset`
Make a note of the deployed address of the contract and get an instance of it by running the following (replacing the address with the address that you see in the console for the deployed contract):
`cv = CVContract.at("0xf204a4ef082f5c04bb89f7d5e6568b796096735a")`
Now it's possible to interact with the contract like so:
`cv.getAddress()`
We can even create new transactions. In our contract we can create a new experience like so:
```
startDate = new Date(2014, 1, 1)
endDate = new Date(2014, 12, 1)
cv.addNewExperience("Solidity Developer", "A Solidity Developer somewhere in the world", startDate.getTime(), endDate.getTime(), "Phnom Penh", {from: web3.eth.accounts[0]})
cv.getExperience(1)`
```