import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Buttons from "../General/Buttons";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import TextBox from "../General/TextBox";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { fabClasses } from "@mui/material";

const useStyles = makeStyles({
  //   space: {
  //     marginTop: "2vw !important",
  //     marginLeft: "1vw",
  //   },
  root: {
    display: "flex",
  },
  updatebutton: {
    // width: "3vw !important",
    // height: "1vw !important",
    marginLeft: "1.5 vw !important",
  },
  t1: {
    marginLeft: "2vw",
    marginTop: "2vw",
  },
  t2: {
    marginRight: "2vw",
    marginLeft: "2vw",
    marginTop: "2vw",
  },
  update: {
    marginTop: "1vw",
    width: "15vw",
    height: "0.5vw",
    marginLeft: "1vw",
    marginBottom: "5vw",
  },
  delete: {
    marginTop: "1vw",
    width: "15vw",
    height: "1vw",
    marginLeft: "3vw",
    marginBottom: "5vw",
  },
});

export default function PopUp(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const [open1, setOpen1] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const flightnumbers = window.localStorage.getItem("flightnumber");
  const depDate = window.localStorage.getItem("departureDate");
  const arrDate = window.localStorage.getItem("arrivalDate");
  const depTime = window.localStorage.getItem("departureTime");
  const arrTime = window.localStorage.getItem("arrivaltime");

  const arrAirport = window.localStorage.getItem("arivalairport");
  const depAirport = window.localStorage.getItem("departureairport");
  const flightnumber = window.localStorage.getItem("flightnumber");

  const buisseats = window.localStorage.getItem("buisseats");
  const econ = window.localStorage.getItem("econseat");

  useEffect(async () => {
    props.setdeptime(depTime);
    props.setdepairport(depAirport);
    props.setdepdate(depDate);
    props.setarrtime(arrTime);
    props.setarrdate(arrDate);
    props.setarrairport(arrAirport);
    props.flightnumber(flightnumber);
    props.setecon(econ);
    props.setbuis(buisseats);
  }, []);

  const onChangeflight = (e) => {
    props.flightnumber(e.target.value);
  };
  const onChangedeptime = (e) => {
    props.setdeptime(e.target.value);
  };
  const onChangearrtime = (e) => {
    props.setarrtime(e.target.value);
  };
  const onChangedepdate = (e) => {
    props.setdepdate(e.target.value);
  };
  const onChangearrdate = (e) => {
    props.setarrdate(e.target.value);
  };
  const onChangeeconseats = (e) => {
    props.setecon(e.target.value);
  };
  const onChangebuisseats = (e) => {
    props.setbuis(e.target.value);
  };

  // const handleOpen1 = () => {
  //   setOpen1(true);
  // };
  const onChangeairportarrival = (e) => {
    props.setarrairport(e.target.value);
  };
  const onChangeairportdep = (e) => {
    props.setdepairport(e.target.value);
  };
  // const onChangebuisness = (e) => {
  //   setdepartureair(e.target.value);
  // };

  const handleClose1 = () => {
    props.setOpen1(false);
  };
  const handleClose1agree = () => {
    setOpen1(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        width="100vw"
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {" "}
        <div className={classes.root}>
          <div className={classes.t1}>
            <TextBox
              title="Flight Number"
              onChange={onChangeflight}
              defaultValue={flightnumber}
              style={{ width: "10vw" }}
            />
          </div>
          <div className={classes.t1}>
            <TextBox
              onChange={onChangedepdate}
              defaultValue={depDate}
              title="Departure Date"
              style={{ width: "10vw" }}
            />
          </div>
          <div className={classes.t2}>
            <TextBox
              onChange={onChangearrdate}
              defaultValue={arrDate}
              title="Arrival Date"
              style={{ width: "10vw" }}
            />
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.t1}>
            <TextBox
              onChange={onChangeairportdep}
              title="Departure Airport"
              defaultValue={depAirport}
              style={{ width: "10vw" }}
            />
          </div>
          <div className={classes.t1}>
            <TextBox
              title="Arrival Airport"
              defaultValue={arrAirport}
              onChange={onChangeairportarrival}
              style={{ width: "10vw" }}
            />
          </div>
          <div className={classes.t2}>
            <TextBox
              title="Buisness Seats"
              defaultValue={buisseats}
              onChange={onChangebuisseats}
              style={{ width: "10vw" }}
            />
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.t1}>
            <TextBox
              title="Departure Time"
              defaultValue={depTime}
              onChange={onChangedeptime}
              style={{ width: "10vw" }}
            />
          </div>
          <div className={classes.t1}>
            <TextBox
              onChange={onChangearrtime}
              title="Arrival Time"
              defaultValue={arrTime}
              style={{ width: "10vw" }}
            />
          </div>

          <div className={classes.t2}>
            <TextBox
              title="Economy Seats"
              defaultValue={econ}
              onChange={onChangeeconseats}
              style={{ width: "10vw" }}
            />
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.update}>
            <Buttons
              title="Update"
              onClick={props.handleOpenagree}
              size="small"
              fullWidth={"true"}
              style={{
                borderRadius: "2vw",
                backgroundColor: "rgb(0, 93, 173)",
                fontSize: "1vw",
              }}
            />
          </div>
          <div className={classes.delete}>
            <Buttons
              size="small"
              fullWidth={"true"}
              title="Back"
              onClick={props.handleClose}
              style={{
                borderRadius: "2vw",
                backgroundColor: "rgb(0, 93, 173)",
                fontSize: "1vw",
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
