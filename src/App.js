import React, { Component } from 'react'
import CVContract from '../build/contracts/CVContract.json'
import getWeb3 from './utils/getWeb3'
import HeaderValue from './components/HeaderValue'
import Experience from './components/Experience'

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
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3,
        // address: "",
        // title: "",
        // description: "",
        // author_name: "",
        // author_email: "",
        // experience: {}
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  async instantiateContract() {
    //set contract vars
    const truffleContract = require('truffle-contract')
    const cvContract = truffleContract(CVContract)
    //set web3 provider to connect to blockchain
    cvContract.setProvider(this.state.web3.currentProvider)
    
    //wait for contract to be deployed and available
    let cv = await cvContract.deployed()
    
    //get data from contract
    let address = await cv.getAddress()
    let title = await cv.getTitle()
    let description = await cv.getDescription()
    let author = await cv.getAuthor()
    let experienceItem = await cv.getExperience(1)

    //set state in react
    this.setState({ address: address })
    this.setState({ title: title })
    this.setState({ description: description })
    this.setState({ author_name: author[0] })
    this.setState({ author_email: author[1] })

    //get experiences
    var experience = {
      title: experienceItem[0],
      location: experienceItem[1],
      from: experienceItem[2].c[0]
    }
    this.setState({ experience: experience })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">My CV on the Blockchain!</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Blockchain CV</h1>
              <p>This is an example application that publishes my CV on the Ethereum Blockchain.</p>
              <h2>Header Values</h2>
              <HeaderValue label="Address" value={this.state.address} />
              <HeaderValue label="Title" value={this.state.title} />
              <HeaderValue label="Description" value={this.state.description} />
              <HeaderValue label="Author Name" value={this.state.author_name} />
              <HeaderValue label="Author Email" value={this.state.author_email} />
            </div>
            <div className="pure-u-1-1">
              <h2>Professional Experience</h2>
              <Experience {...this.state.experience} />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
