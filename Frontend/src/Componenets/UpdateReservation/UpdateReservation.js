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
import Select from "../SearchFlights/Select";
import { useNavigate } from "react-router";
import axios from "axios";

const useStyles = makeStyles({
  //   space: {
  //     marginTop: "2vw !important",
  //     marginLeft: "1vw",
  //   },
  bigdiv: {
    width: "70vw!important",
  },
  root: {
    display: "flex",
  },
  updatebutton: {
    // width: "3vw !important",
    // height: "1vw !important",
    marginLeft: "1.5 vw !important",
  },
  title: {
    fontSize: "1.5vw",
    fontWeight: "600",
    fontFamily: "fantasy",
    /* margin-top: 1vw; */
    boxShadow: "inherit",
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
    marginLeft: "5vw",
    marginBottom: "5vw",
  },
  delete: {
    marginTop: "1vw",
    width: "15vw",
    height: "1vw",
    marginLeft: "4vw",
    marginBottom: "5vw",
  },
});

export default function UpdateReservation(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const headers = window.localStorage.getItem("token");
  const DepartureReservation = JSON.parse(
    localStorage.getItem("DepartureReservation")
  );
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [DepartureAirport, setDepartureAirport] = React.useState("");
  const [ArrivalAirport, setArrivalAirport] = React.useState("");
  const [DepartureDate, setDepartureDate] = React.useState("");
  const [ArrivalDate, setArrivalDate] = React.useState("");
  const [DepartureTime, setDepartureTime] = React.useState("");
  const [ArrivalTime, setArrivalTime] = React.useState("");
  const [cabin, setCabin] = React.useState("");
  const [NumberofAdults, setNumberofAdults] = React.useState(0);
  const [NumberofChildren, setNumberofChildren] = React.useState(0);

  const handleUpdate = () => {};
  const handleChangeSeats = async () => {
    if (DepartureReservation.newCabin === DepartureReservation.oldCabin) {
      const totalPassengers = NumberofAdults + NumberofChildren;

      if (DepartureReservation.oldSeats.length >= totalPassengers) {
        const difference =
          DepartureReservation.oldSeats.length - totalPassengers;
        await axios
          .post(
            "http://localhost:8000/users/updateSamereservation",
            {
              BookingNumber: DepartureReservation.BookingNumber,
              NumberOfChildren: NumberofChildren,
              NumberOfAdults: NumberofAdults,
              Price: DepartureReservation.price,
              passengers: DepartureReservation.oldSeats.splice(
                totalPassengers,
                difference
              ),
            },
            {
              headers: {
                auth: headers,
              },
            }
          )
          .then((res) => {})
          .catch((err) => {
            console.log(err);
          });
      } else {
        var i = 0;
        for (i; i < DepartureReservation.oldSeats; i++) {
          await axios
            .post(
              "http://localhost:8000/users/deselectSeats",
              {
                FlightNumber: DepartureReservation.FlightNumber,
                seat: DepartureReservation.oldSeats[i],
                Cabin: DepartureReservation.oldCabin,
              },
              {
                headers: {
                  auth: headers,
                },
              }
            )
            .then((res) => {})
            .catch((err) => {
              console.log(err);
            });
        }
        var obj = {};
        if (DepartureDate.length !== 0) obj.DepartureDate = DepartureDate;
        if (ArrivalDate.length !== 0) obj.ArrivalDate = ArrivalDate;
        if (DepartureTime.length !== 0) obj.DepartureTime = DepartureTime;
        if (ArrivalTime.length !== 0) obj.ArrivalTime = ArrivalTime;
        if (DepartureReservation.ArrivalAirport !== 0)
          obj.ArrivalAirport = DepartureReservation.ArrivalAirport;
        if (DepartureReservation.DepartureAirport !== 0)
          obj.DepartureAirport = DepartureReservation.DepartureAirport;
        await axios
          .post(
            "http://localhost:8000/flights/searchFlight",
            {
              obj,
            },
            {
              headers: {
                auth: headers,
              },
            }
          )
          .then((res) => {
            if (res.data.data.length !== 0) {
              history("/changeDepartureSeats");
            } else {
              //popup message no enough seats
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      var i = 0;
      for (i; i < DepartureReservation.oldSeats; i++) {
        await axios
          .post(
            "http://localhost:8000/users/deselectSeats",
            {
              FlightNumber: DepartureReservation.FlightNumber,
              seat: DepartureReservation.oldSeats[i],
              Cabin: DepartureReservation.oldCabin,
            },
            {
              headers: {
                auth: headers,
              },
            }
          )
          .then((res) => {})
          .catch((err) => {
            console.log(err);
          });
      }
      var obj = {};
      if (DepartureDate.length !== 0) obj.DepartureDate = DepartureDate;
      if (ArrivalDate.length !== 0) obj.ArrivalDate = ArrivalDate;
      if (DepartureTime.length !== 0) obj.DepartureTime = DepartureTime;
      if (ArrivalTime.length !== 0) obj.ArrivalTime = ArrivalTime;
      if (DepartureReservation.ArrivalAirport !== 0)
        obj.ArrivalAirport = DepartureReservation.ArrivalAirport;
      if (DepartureReservation.DepartureAirport !== 0)
        obj.DepartureAirport = DepartureReservation.DepartureAirport;
      await axios
        .post(
          "http://localhost:8000/flights/searchFlight",
          {
            obj,
          },
          {
            headers: {
              auth: headers,
            },
          }
        )
        .then((res) => {
          if (res.data.data.length !== 0) {
            history("/changeDepartureSeats");
          } else {
            //popup message no enough seats
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (props.open) console.log("DepartureReservation", DepartureReservation);
  }, [props.open]);
  return (
    <div className={classes.bigdiv}>
      <Dialog
        fullScreen={fullScreen}
        width="100vw"
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {" "}
        <div className={classes.title}>Update Reservation</div>
        <div className={classes.root}>
          <div className={classes.t1}>
            <TextBox
              title="Departure Airport"
              defaultValue={DepartureReservation.DepartureAirport}
              style={{ width: "10vw" }}
              onChange={(e) => setDepartureAirport(e.target.value)}
            />
          </div>
          <div className={classes.t1}>
            <TextBox
              defaultValue={DepartureReservation.DepartureDate}
              title="Departure Date"
              style={{ width: "10vw" }}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
          <div className={classes.t2}>
            <TextBox
              defaultValue={DepartureReservation.DepartureTime}
              title="Departure Time"
              style={{ width: "10vw" }}
              onChange={(e) => setDepartureTime(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.t2}>
            <TextBox
              title="Arrival Airport"
              defaultValue={DepartureReservation.ArrivalAirport}
              style={{ width: "10vw" }}
              onChange={(e) => setArrivalAirport(e.target.value)}
            />
          </div>
          <div className={classes.t2}>
            <TextBox
              title="Arrival Date"
              defaultValue={DepartureReservation.ArrivalDate}
              style={{ width: "10vw" }}
              onChange={(e) => setArrivalDate(e.target.value)}
            />
          </div>
          <div className={classes.t2}>
            <TextBox
              title="Arrival Time"
              defaultValue={DepartureReservation.ArrivalTime}
              style={{ width: "10vw" }}
              onChange={(e) => setArrivalTime(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.t1}>
            <TextBox
              title="Cabin Class"
              defaultValue={DepartureReservation.oldCabin}
              style={{ width: "7vw!important" }}
              onChange={(e) => setCabin(e.target.value)}
            />
          </div>
          <div className={classes.t1}>
            <Select />
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.update}>
            <Buttons
              title="Update"
              onClick={handleUpdate}
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
              title="ChangeSeats"
              onClick={handleChangeSeats}
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
