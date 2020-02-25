import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { Alert, AlertTitle } from '@material-ui/lab';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  selectWidth: {
    width: 250
  },
  timeInput: {
    width: 250,
    marginTop: 10
  },
  marginTop: {
    marginTop: 10
  }
}));

export default function AddDetails(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [showError, toggleShowError] = React.useState(false);
  const [flightCode, setFlightCode] = React.useState("");
  const [flightProvider, setFlightProvider] = React.useState("");
  const [sourcePortName, setSourcePortName] = React.useState("");
  const [sourcePortCode, setSourcePortCode] = React.useState("");
  const [destinationPortName, setDestinationPortName] = React.useState("");
  const [destinationPortCode, setDestinationPortCode] = React.useState("");
  const [scheduledArrival, setScheduledArrival] = React.useState("");
  const [scheduledDeparture, setScheduledDeparture] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  let handleAddDetails  = props.handleAddDetails;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    axios({
      method: "post",
      url: "http://localhost:5000/flight-details",
      data: {
        flightCode: flightCode,
        flightProvider: flightProvider,
        sourcePortName: sourcePortName,
        sourcePortCode: sourcePortCode,
        destinationPortName: destinationPortName,
        destinationPortCode: destinationPortCode,
        scheduledArrival: scheduledArrival,
        scheduledDeparture: scheduledDeparture,
        status: status
        }
      }).then((response) => {
        if (showError) {
          toggleShowError(!showError)
        }
        handleAddDetails(response.data.flightDetail)
      }).catch(function (error) {
        setErrorMessage(error.response.data.message[0])
        toggleShowError(!showError)
      })
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Flight Details
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        {showError && <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>}
        <DialogTitle id="form-dialog-title">Flight Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter flight details
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="flightCode"
            label="Flight Code"
            type="text"
            value={flightCode} onInput={e => setFlightCode(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="flightProvider"
            label="Flight Provider"
            type="text"
            value={flightProvider} onInput={e => setFlightProvider(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="sourcePortName"
            label="Source Port Name"
            type="text"
            value={sourcePortName} onInput={e => setSourcePortName(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="sourcePortCode"
            label="Source Port Code"
            type="text"
            value={sourcePortCode} onInput={e => setSourcePortCode(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="destinationPortName"
            label="Desitination Port Name"
            type="text"
            value={destinationPortName} onInput={e => setDestinationPortName(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="destinationPortCode"
            label="Desitination Port Code"
            type="text"
            value={destinationPortCode} onInput={e => setDestinationPortCode(e.target.value)}
            fullWidth
          />
          <TextField
            id="scheduledArrival"
            label="Scheduled Arrival"
            type="datetime-local"
            className={classes.timeInput}
            InputLabelProps={{
              shrink: true
            }}
            value={scheduledArrival} onChange={e => setScheduledArrival(e.target.value)}
          />
          <TextField
            id="scheduledDeparture"
            label="Scheduled Departure"
            type="datetime-local"
            className={classes.timeInput}
            InputLabelProps={{
              shrink: true
            }}
            value={scheduledDeparture} onChange={e => setScheduledDeparture(e.target.value)}
          />
          <InputLabel id="status" className={classes.marginTop}>Status</InputLabel>
          <Select
            labelId="Status"
            id="status"
            value={status}
            className={classes.selectWidth}
            onChange={e => setStatus(e.target.value)}
          >
            <MenuItem value="DELAYED">DELAYED</MenuItem>
            <MenuItem value="ON SCHEDULE">ON SCHEDULE</MenuItem>
            <MenuItem value="LANDED">LANDED</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
