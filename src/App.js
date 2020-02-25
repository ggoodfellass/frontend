import React, { Component } from 'react';
import FlightDetails from "./components/FlightDetails";
import AddDetails from "./components/AddDetails";

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

  handleAddDetails = (flightDetail) => {
    const { flightDetails } = this.state;
    flightDetails.push(flightDetail)
    this.setState({ flightDetails })
  }

  componentDidMount() {
    this.callAPI()
  }

  render() {
    return (
      <div className="app-style">
        <AddDetails handleAddDetails = {this.handleAddDetails}  />
        {this.state.flightDetails.map((item)=>(
          <FlightDetails
            key={item._id}
            id={item._id}
            flightCode={item.flightCode}
            flightProvider={item.flightProvider}
            sourcePortName={item.sourcePortName}
            sourcePortCode={item.sourcePortCode}
            destinationPortName={item.destinationPortName}
            destinationPortCode={item.destinationPortCode}
            scheduledArrival={item.scheduledArrival}
            scheduledDeparture={item.scheduledDeparture}
            status={item.status}
           />
        ))}
      </div>
    )
  }
}

export default App;
