import React, { Component } from 'react';
import FlightDetails from "./components/FlightDetails";

import axios from 'axios';

class App extends Component {

  state = {
    flightDetails: []
  }

  callAPI() {
    axios.get(`http://localhost:5000/flight-details`)
      .then(res => {
        let { flightDetails } = res.data
        this.setState({ flightDetails })
      })
  }

  componentDidMount() {
    this.callAPI()
  }

  render() {
    return (
      <div>
        { this.state.flightDetails.map((fd, i) =>
          <FlightDetails data={fd} key={i} />
          )
        }
      </div>
    )
  }
}

export default App;
