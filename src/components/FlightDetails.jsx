import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "940px",
    margin: "10px auto"
  },
  paper: {
    padding: theme.spacing(1.7),
    margin: "auto",
    maxWidth: "auto"
  },
  button: {
    textTransform: "capitalize",
    color: "#1b5e20"
  },
  chip: {
    borderRadius: "4px",
    padding: "5px 0px 5px 0px",
    height: "auto"
  },
  primary: {
    background: "#2e7d32",
    color: "white"
  },
  secondary: {
    background: "#f9a825",
    color: "black"
  },
  leftBorder: {
    borderLeft: "1px solid lightgrey"
  }
}));

export default function FlightDetails() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={10}>
          <Grid item>
            <b>17:50</b>
          </Grid>
          <Grid item xs={5} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs align="left" className={classes.leftBorder}>
                <Typography gutterBottom variant="subtitle1">
                  <b>Frankfurt FRA</b>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  LH980A Lufthansa
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Chip
                className={classes.chip + " " + classes.primary}
                label="LANDED"
              />
            </Grid>
          </Grid>
          <Grid item xs={5} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs align="left" className={classes.leftBorder} m={1}>
                <Typography gutterBottom variant="subtitle1">
                  Terminal1
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant="text"
                className={classes.button}
                endIcon={<ArrowForwardIcon />}
              >
                More Details
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
