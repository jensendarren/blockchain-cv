import React, { Component } from 'react'
import CVContract from '../build/contracts/CVContract.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3,
        address: "",
        title: "",
        description: "",
        author_name: "",
        author_email: ""
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const cvContact = contract(CVContract)
    cvContact.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var cvInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      cvContact.deployed().then((instance) => {
        cvInstance = instance

        // Get the address from the contract
        return cvInstance.getAddress.call()
      }).then((address) => {
        // Update state with the address.
        console.log(address);
        this.setState({ address: address })
        return cvInstance.getTitle()
      }).then((title) => {
        // Update state with the address.
        console.log(title);
        this.setState({ title: title })
        return cvInstance.getDescription()
      }).then((description) => {
        // Update state with the description.
        console.log(description);
        this.setState({ description: description })
        return cvInstance.getAuthor()
      }).then((author) => {
        // Update state with the author.
        console.log(author);
        this.setState({ author_name: author[0] })
        this.setState({ author_email: author[1] })
      })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>CV Contract Example</h2>
              <p>The address value is: {this.state.address}</p>
              <p>The title value is: {this.state.title}</p>
              <p>The description value is: {this.state.description}</p>
              <p>The author name is: {this.state.author_name}</p>
              <p>The author email is: {this.state.author_email}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
