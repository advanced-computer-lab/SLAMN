import { ClassNames } from "@emotion/react";
import React from "react";
import NavBar from "../Componenets/General/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import List from "../Componenets/AccountDetails/List";
import { useEffect, useState } from "react";
import axios from "axios";
import PopupDelete from "../Componenets/General/PopUp";
import Navigation from "../Componenets/Reservation/Navigation";

const useStyles = makeStyles({
  display: { display: "flex", marginBottom: "2vw" },
  root: {
    background: " gainsboro",
    width: "100vw",
    height: "100vw",
  },
  loginBlur: {
    backgroundColor: "white !important",
    height: "2vw",
    width: "2vw",
    marginTop: "1vw",
    marginLeft: "89vw",
  },
  loginFocus: {
    backgroundColor: "#ffd633 !important",
    height: "2vw",
    width: "2vw",
    marginTop: "1vw",
    marginLeft: "89vw",
  },
  welcometitle: {
    // fontSize: "2vw !important",
    width: "100vw",
    height: "1vw",
    padding: "1.5vw !important",
    marginLeft: "4vw !important",
  },
  welcome: {
    background: "white",
    width: "100vw",
    height: "5vw",
    fontSize: "2vw",
    color: "grey",
    boxShadow: "1px 2px 1px #9E9E9E",
  },

  form: {
    display: "flex",
    background: " gainsboro",
    height: "100vw",
  },
  accountform: {
    marginTop: "2vw",
    marginLeft: "2vw",
    display: "flex",
    flexDirection: "column",
  },
  side: {
    background: " gainsboro",
    marginLeft: "6vw",
    marginTop: "2vw",
  },
});

export default function Reservation() {
  const classes = useStyles();

  const headers = window.localStorage.getItem("token");
  var [departureFlights, setDepartureFlights] = React.useState([{}]);
  var [returnFlights, setReturnFlights] = React.useState([{}]);
  const [deleted, setDeleted] = React.useState("");
  const name = window.localStorage.getItem("name");
  const [flights, setFlights] = React.useState(
    JSON.parse(localStorage.getItem("Flights"))
  );
  const [open2, setOpen2] = useState(false);
  const [del, setDelete] = useState(false);
  const [dep, setDep] = useState("");
  const [arr, setarr] = useState("");
  const [lengtharr, setLength] = React.useState(0);
  const [error, setError] = React.useState(false);

  var length = 0;

  const emails = window.localStorage.getItem("email");
  const handleClickPopUpDelete = () => {
    setOpen2(true);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose2agree = () => {
    setOpen2(false);
    setDelete(!del);
    console.log(deleted, "DELLLLLL");
    const emailSubject = "Reservation Cancelled";
    const emailBody = "Please Pay an amount of $50";
    console.log(emails, "elemail");
    axios
      .post(
        "http://localhost:8000/users/sendMail",
        {
          email: emails,
          emailSubject: emailSubject,
          emailBody: emailBody,
        },
        {
          headers: {
            auth: headers,
          },
        }
      )
      .then(function (response) {
        console.log(response, "RESPONSEEEEE");
      });
    axios
      .post(
        "http://localhost:8000/users/deleteReservation",
        {
          _id: deleted,
        },
        {
          headers: {
            auth: headers,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        var date = new Date();
        var month = date.getUTCMonth() + 1; //months from 1-12
        var day = date.getUTCDate();
        var year = date.getUTCFullYear();

        const newdate = year + "-" + month + "-" + day;
        axios
          .post(
            "http://localhost:8000/users/getfutureReservation",
            { date: newdate },
            {
              headers: {
                auth: headers,
              },
            }
          )
          .then((res) => {
            setFlights(res.data.data);
            length = flights.length - 1;
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };

  useEffect(async () => {
    var date = new Date();
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();

    const newdate = year + "-" + month + "-" + day;

    // console.log(newdate,"datee")
    await axios
      .post(
        "http://localhost:8000/users/getfutureReservation",
        { date: newdate },
        {
          headers: {
            auth: headers,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.error) setError(true);
        else {
          setFlights(res.data.data);
          localStorage.setItem("Flights", JSON.stringify(res.data.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });

    var i = 0;
    for (i; i < flights.length; i++) {
      await axios
        .post(
          "http://localhost:8000/users/getFlightDetails",
          { FlightNumber: flights[i][0].DepartureFlightNumber },
          {
            headers: {
              auth: headers,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setDepartureFlights(departureFlights.push(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .post(
          "http://localhost:8000/users/getFlightDetails",
          { FlightNumber: flights[i][0].ArrivalFlightNumber },
          {
            headers: {
              auth: headers,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setReturnFlights(returnFlights.push(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    localStorage.setItem("DepartureFlights", JSON.stringify(departureFlights));
    localStorage.setItem("ReturnFlights", JSON.stringify(returnFlights));
  }, []);

  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.welcome}>
        <div className={classes.welcometitle}>
          Welcome to your account,{name} !
        </div>
      </div>
      <div className={classes.form}>
        <div className={classes.side}>
          <List />
        </div>
        <Navigation
          flights={flights}
          setDep={setDep}
          setarr={setarr}
          setDeleted={setDeleted}
          error={error}
          handleClickPopUpDelete={handleClickPopUpDelete}
        />

        <PopupDelete
          open={open2}
          handleOpen={handleOpen2}
          handleOpenagree={handleClose2agree}
          handleClose={handleClose2}
          className={classes.popup}
          error="Are you sure you want to delete ?"
          firstbutton="Agree"
          secondbutton="Disagree"
        />
      </div>
    </div>
  );
}
