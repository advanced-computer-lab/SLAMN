import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import DepartureFlights from "./DepartureFlights";
import Button from "../AccountDetails/Buttons";
import ReturnFlights from "../Reservation/ReturnFlights";
import { useEffect, useState } from "react";
import axios from "axios";
import SnackBar from "../General/SnackBar";
import PopUp from "../UpdateReservation/UpdateReservation";
const useStyles = makeStyles({
  accountform: {
    marginTop: "2vw",
    marginLeft: "2vw",
    display: "flex",
    flexDirection: "column",
    background: " gainsboro",
  },
  display: {
    background: " gainsboro",
    marginRight: "20vw",
    // height: "100vw",
  },
  buttons: {
    display: "flex",
    marginLeft: "0vw",
    marginBottom: "2vw",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const [error, seterror] = useState("");
  const flights = JSON.parse(localStorage.getItem("Flights"));
  const headers = window.localStorage.getItem("token");
  const [open2, setOpen2] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  var [departureFlights, setDepartureFlights] = React.useState(
    JSON.parse(localStorage.getItem("DepartureFlights"))
  );
  var [returnFlights, setReturnFlights] = React.useState(
    JSON.parse(localStorage.getItem("ReturnFlights"))
  );
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose1agree = () => {};

  const handleOpen2 = () => {
    setOpen1(true);
  };
  const handleClose2 = () => {
    setOpen1(false);
  };
  const handleReturnEdit = (departureFlight, reservation) => {
    localStorage.setItem(
      "ReturnReservation",
      JSON.stringify({
        DepartureAirport: departureFlight.DepartureAirport,
        ArrivalAirport: departureFlight.ArrivalAirport,
        DepartureDate: departureFlight.DepartureDate,
        ArrivalDate: departureFlight.ArrivalDate,
        DepartureTime: departureFlight.DepartureTime,
        ArrivalTime: departureFlight.ArrivalTime,
        oldCabin: reservation.DepCabinClass,
        newCabin: reservation.DepCabinClass,
        oldSeats: reservation.departureSeats,
        newSeats: reservation.departureSeats,
        BookingNumber: reservation._id,
        price: departureFlight.Price,
        NumberofChildren: reservation.NumberofChildren,
        NumberofAdults: reservation.NumberofAdults,
        airportupdated: false,
        dateupdated: false,
        timeupdated: false,
      })
    );
    setOpen2(true);
  };

  const handleDepartureEdit = (departureFlight, reservation) => {
    localStorage.setItem(
      "DepartureReservation",
      JSON.stringify({
        FlightNumber: departureFlight.FlightNumber,
        DepartureAirport: departureFlight.DepartureAirport,
        ArrivalAirport: departureFlight.ArrivalAirport,
        DepartureDate: departureFlight.DepartureDate,
        ArrivalDate: departureFlight.ArrivalDate,
        DepartureTime: departureFlight.DepartureTime,
        ArrivalTime: departureFlight.ArrivalTime,
        oldCabin: reservation.DepCabinClass,
        newCabin: reservation.DepCabinClass,
        oldSeats: reservation.departureSeats,
        newSeats: reservation.departureSeats,
        BookingNumber: reservation._id,
        price: departureFlight.Price,
        NumberofChildren: reservation.NumberofChildren,
        NumberofAdults: reservation.NumberofAdults,
        airportupdated: false,
        dateupdated: false,
        timeupdated: false,
      })
    );
    setOpen2(true);
    console.log("Dp", departureFlight, reservation);
  };
  const handleOpen1 = () => {
    setOpen2(true);
  };

  const handleClose1 = () => {
    setOpen2(false);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Departure Flights" {...a11yProps(0)} />
            <Tab label="Return Flights" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className={classes.accountform}>
            {props.error === true ? (
              <div></div>
            ) : (
              departureFlights.map((n, index) => (
                <div className={classes.display}>
                  <DepartureFlights
                    flight={{
                      departure: n.FlightNumber,
                    }}
                  />
                  <div className={classes.buttons}>
                    <Button
                      ClassName={classes.button}
                      title={"Cancel"}
                      onClick={() => {
                        props.setDep(n.FlightNumber);
                        //   props.setarr(n[0].ArrivalFlightNumber);
                        //   props.setDeleted(n[0]._id);
                        //   props.handleClickPopUpDelete();
                      }}
                    />
                    <Button
                      ClassName={classes.button}
                      title={"Edit"}
                      onClick={() => handleDepartureEdit(n, flights[index][0])}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className={classes.accountform}>
            {props.error === true ? (
              <div></div>
            ) : (
              returnFlights.map((n, index) => (
                <div className={classes.display}>
                  {console.log(n)}
                  <ReturnFlights
                    flight={{
                      departure: n.FlightNumber,
                    }}
                  />

                  <div className={classes.buttons}>
                    <Button
                      ClassName={classes.button}
                      title={"Cancel"}
                      onClick={() => {
                        console.log(n, "nnnnnnnnnnnn");
                        console.log(flights, "FLIGHTTTTTTT");
                        props.setarr(n.FlightNumber);
                        //   props.setDeleted(n[0]._id);
                        //   props.handleClickPopUpDelete();
                      }}
                    />
                    <Button
                      ClassName={classes.button}
                      title={"Edit"}
                      onClick={() => handleReturnEdit(n, flights[index][0])}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </TabPanel>
      </Box>
      <PopUp
        open={open2}
        handleOpen={handleOpen1}
        handleClose={handleClose1}
        handleOpenagree={handleClose1agree}
        setOpen={setOpen1}
      />

      <SnackBar
        open={open1}
        handleOpen={handleOpen2}
        handleClose={handleClose2}
        error={error}
        severity={"error"}
      />
    </div>
  );
}
