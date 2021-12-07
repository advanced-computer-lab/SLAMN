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
});

export default function PopUp(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const [flightnumber, setflightnumber] = useState(0);
  const [deptime, setdeptime] = useState("");
  const [arrtime, setarrtime] = useState("");
  const [depdate, setdepdate] = useState("");
  const [arrdate, setdate] = useState("");
  const [econseats, seteconseats] = useState(0);
  const [buissseats, setbuisseats] = useState(0);

  const [open1, setOpen1] = useState(false);
  const [arrivalairport, setarrivalairport] = useState("");
  const [departureair, setdepartureair] = useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const flightnumbers = window.localStorage.getItem("flightnumber");
  const depDate = window.localStorage.getItem("depDate");
  const arrDate = window.localStorage.getItem("arrDate");
  const depTime = window.localStorage.getItem("depTime");
  const arrTime = window.localStorage.getItem("arrTime");

  const arrAirport = window.localStorage.getItem("arrAirport");
  const depAirport = window.localStorage.getItem("depAirport");

  useEffect(async () => {
    console.log(
      flightnumbers,
      depDate,
      arrDate,
      depTime,
      arrTime,
      arrAirport,
      depAirport
    );
  }, []);

  const onChangeflight = (e) => {
    props.flightnumber(e.target.value);
  };
  const onChangedeptime = (e) => {
    props.deptime(e.target.value);
  };
  const onChangearrtime = (e) => {
    props.arrivaltime(e.target.value);
  };
  const onChangedepdate = (e) => {
    props.depdate(e.target.value);
  };
  const onChangearrdate = (e) => {
    props.arrivaldate(e.target.value);
  };
  const onChangeeconseats = (e) => {
    props.econseast(e.target.value);
  };
  const onChangebuisseats = (e) => {
    props.buisseats(e.target.value);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };
  const onChangeairportarrival = (e) => {
    setarrivalairport(e.target.value);
  };
  const onChangeairportdep = (e) => {
    setdepartureair(e.target.value);
  };

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
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {" "}
        <DialogActions>
          <div>
            <div className={classes.root}>
              <div className={classes.space}>
                <TextBox
                  title="Flight Number"
                  onChange={onChangeflight}
                  value={flightnumbers}
                  disabled
                  defaultValue={flightnumbers}
                ></TextBox>
              </div>
              <div className={classes.space}>
                <TextBox
                  onChange={onChangedepdate}
                  defaultValue={depDate}
                  title="Departure Date"
                ></TextBox>
              </div>
              <div className={classes.space}>
                <TextBox
                  onChange={onChangearrdate}
                  defaultValue={arrDate}
                  title="Arrival Date"
                ></TextBox>
              </div>
            </div>

            <div className={classes.root}>
              <div className={classes.space}>
                <TextBox
                  onChange={onChangeairportdep}
                  title="Departure Airport"
                  defaultValue={depAirport}
                ></TextBox>
              </div>
              <div className={classes.space}>
                <TextBox
                  onChange={onChangearrtime}
                  title="Arrival Time"
                  defaultValue={arrTime}
                ></TextBox>
              </div>
              <div className={classes.space}>
                <TextBox
                  title="Departure Time"
                  defaultValue={depTime}
                  onChange={onChangedeptime}
                ></TextBox>
              </div>
            </div>
          </div>
          <div className={classes.root}>
            <div className={classes.space}>
              <TextBox
                title="Arrival Airport"
                defaultValue={arrAirport}
                onChange={onChangeairportarrival}
              ></TextBox>
            </div>
          </div>
        </DialogActions>
        <div className={classes.root}>
          <div>
            <Buttons
              title="Update"
              onClick={props.handleOpenagree}
              className={classes.updatebutton}
              size="small"
            />
          </div>
          <div>
            <Buttons
              size="small"
              className={classes.updatebutton}
              title="Back"
              onClick={props.handleClose}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
