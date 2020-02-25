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

  handleMoreDetailsUpdate = (flightDetail) => {
    const { flightDetails } = this.state;
    let foundIndex = flightDetails.findIndex(x => x.id === flightDetail.id);
    flightDetails[foundIndex] = flightDetail;
    this.setState({ flightDetails })
  }

  handleMoreDetailsDelete = (id) => {
    console.log(id)
    this.setState({
      flightDetails: this.state.flightDetails.filter((fd) => fd._id !== id)
    })
    console.log(this.state.flightDetails)
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
            handleMoreDetailsUpdate={this.handleMoreDetailsUpdate}
            handleMoreDetailsDelete={this.handleMoreDetailsDelete}
           />
        ))}
      </div>
    )
  }
}

export default App;
