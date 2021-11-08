import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Buttons from "../General/Buttons";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
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
  const [econseats, seteconseats] = useState(0);
  const [buissseats, setbuisseats] = useState(0);
  const [airport, setairport] = useState("");
  const [open1, setOpen1] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const onChangeflight = (e) => {
    props.setFlightNumberUp(e.target.value);
  };
  const onChangedeptime = (e) => {
    props.setDepartureDateUp(e.target.value);
  };
  const onChangearrtime = (e) => {
    props.setArrivalDateUp(e.target.value);
  };
  const onChangeeconseats = (e) => {
    props.setEconomySeatsUp(e.target.value);
  };
  const onChangebuisseats = (e) => {
    props.setBusinessSeatsUp(e.target.value);
  };
  const onChangeairport = (e) => {
    setairport(e.target.value);
  };
  const handleOpen1 = () => {
    setOpen1(true);
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
                  value={props.flightnumber}
                ></TextBox>
              </div>
              <div className={classes.space}>
                <TextBox
                  onChange={onChangedeptime}
                  title="Departure Time"
                  value={props.deptime}
                ></TextBox>
              </div>
              <div className={classes.space}>
                <TextBox
                  onChange={onChangearrtime}
                  title="Arrival Time"
                  value={props.arrivaltime}
                ></TextBox>
              </div>
            </div>
            <div className={classes.root}>
              <div className={classes.space}>
                <TextBox
                  onChange={onChangeeconseats}
                  title="Available Economy Seats"
                  value={props.econseast}
                ></TextBox>
              </div>
              <div className={classes.space}>
                <TextBox
                  onChange={onChangebuisseats}
                  title="Available Buisness Class Seats"
                  value={props.buisseats}
                ></TextBox>
              </div>
              <div className={classes.space}>
                <TextBox title="Airport" onChange={onChangeairport}></TextBox>
              </div>
            </div>
          </div>
        </DialogActions>
        <div className={classes.root}>
          <div>
            <Buttons
              title="Update"
              onClick={handleClick}
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
