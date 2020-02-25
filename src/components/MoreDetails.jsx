import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from "@material-ui/core/styles";
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import moment from "moment";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: "capitalize",
    color: "#1b5e20"
  },
  textFieldWidth: {
    width: "100%"
  },
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

export default function FormDialog(props) {
  let handleMoreDetailsUpdate  = props.handleMoreDetailsUpdate;
  let handleMoreDetailsDelete  = props.handleMoreDetailsDelete;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(true);
  const [statusUpdate, setStatusUpdate] = React.useState(props.status);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleUpdate = () => {
    console.log(props)
    axios({
      method: "patch",
      url: `http://localhost:5000/flight-details/${props.id}`,
      data: {
        status: statusUpdate
        }
      }).then((response) => {
        handleMoreDetailsUpdate(response.data.flightDetail)
      }).catch(function (error) {
      })
  }

  const handleDelete = () => {
    handleMoreDetailsDelete("C")
  }

  const statusUpdated = (e) => {
    setUpdate(false)
    setStatusUpdate(e)
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="text"
        className={classes.button}
        endIcon={<ArrowForwardIcon />}
        onClick={handleClickOpen}>
        More Details
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Flight Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Brief details about flight.
          </DialogContentText>
          <TextField
            disabled
            className={classes.textFieldWidth}
            id="flightCode"
            label="Flight Code"
            value={props.flightCode}
            fullWidth
            autoFocus
            margin="dense"
          />
          <TextField
            disabled
            className={classes.textFieldWidth}
            id="flightProvider"
            label="Flight Provider"
            value={props.flightProvider}
            fullWidth
            autoFocus
            margin="dense"
          />
          <TextField
            disabled
            className={classes.textFieldWidth}
            id="sourcePortName"
            label="Source Port Name"
            value={props.sourcePortName}
            fullWidth
            autoFocus
            margin="dense"
          />
          <TextField
            disabled
            className={classes.textFieldWidth}
            id="sourcePortCode"
            label="Source Port Code"
            value={props.sourcePortCode}
            fullWidth
            autoFocus
            margin="dense"
          />
          <TextField
            disabled
            className={classes.textFieldWidth}
            id="destinationPortName"
            label="Destination Port Name"
            value={props.destinationPortName}
            fullWidth
            autoFocus
            margin="dense"
          />
          <TextField
            disabled
            className={classes.textFieldWidth}
            id="destinationPortCode"
            label="Destination Port Code"
            value={props.destinationPortCode}
            fullWidth
            autoFocus
            margin="dense"
          />
          <TextField
            disabled
            className={classes.textFieldWidth}
            id="scheduledArrival"
            label="Scheduled Arrival"
            value={moment(props.scheduledArrival).format("HH:mm")}
            fullWidth
            autoFocus
            margin="dense"
          />
          <TextField
            disabled
            className={classes.textFieldWidth}
            id="scheduledDeparture"
            label="Scheduled Departure"
            value={moment(props.scheduledDeparture).format("HH:mm")}
            fullWidth
            autoFocus
            margin="dense"
          />
          <InputLabel id="status" className={classes.marginTop}>Status</InputLabel>
          <Select
            labelId="Status"
            id="status"
            value={statusUpdate}
            className={classes.selectWidth}
            onChange={e => statusUpdated(e.target.value)}
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
          <Button
            onClick={handleUpdate}
            color="primary"
            disabled={update}
          >
            Update
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
