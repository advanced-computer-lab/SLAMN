import { ClassNames } from "@emotion/react";
import React from "react";
import NavBar from "../Componenets/General/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import List from "../Componenets/AccountDetails/List";
import AccountForm from "../Componenets/AccountDetails/AccountForm";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Componenets/Reservation/Reservation";
import ListItem from "@mui/material/ListItem";
import Button from "../Componenets/AccountDetails/Buttons";
import PopupDelete from "../Componenets/General/PopUp";

const useStyles = makeStyles({
  display: { display: "flex", marginBottom: "2vw" },
  root: {
    background: " gainsboro",
    width: "100vw",
    height: "49vw",
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
  },
  accountform: {
    marginTop: "2vw",
    marginLeft: "2vw",
    display: "flex",
    flexDirection: "column",
  },
  side: {
    marginLeft: "6vw",
    marginTop: "2vw",
  },
});

export default function Reservation() {
  const classes = useStyles();
  const headers = window.localStorage.getItem("token");
  const [deleted, setDeleted] = React.useState("");
  const name = window.localStorage.getItem("name");
  const [flights, setFlights] = React.useState([]);
  const [open2, setOpen2] = useState(false);
  const [del, setDelete] = useState(false);
  const [dep, setDep] = useState("");
  const [arr, setarr] = useState("");
  const [lengtharr, setLength] = React.useState(0);

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

        const newdate = day + "/" + month + "/" + year;
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

  // useEffect(async () => {
  //   var date = new Date();
  //   var month = date.getUTCMonth() + 1; //months from 1-12
  //   var day = date.getUTCDate();
  //   var year = date.getUTCFullYear();

  //   const newdate = day + "/" + month + "/" + year;

  //   console.log(newdate, "datee");
  //   await axios
  //     .post(
  //       "http://localhost:8000/users/getfutureReservation",
  //       { date: newdate },
  //       {
  //         headers: {
  //           auth: headers,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res.data.data, "elreservation");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  useEffect(async () => {
    var date = new Date();
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();

    const newdate = day + "/" + month + "/" + year;

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
        setFlights(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
        <div className={classes.accountform}>
          {flights.map((n, index) => (
            <div className={classes.display}>
              <Card
                flight={{
                  arrival: n[index].ArrivalFlightNumber,
                  departure: n[index].DepartureFlightNumber,
                  bookingnumber: n[index]._id,
                }}
              />

              <Button
                ClassName={classes.button}
                title={"Cancel"}
                onClick={() => {
                  console.log(n, "nnnnnnnnnnnn");
                  console.log(flights, "FLIGHTTTTTTT");
                  setDep(n[index].DepartureFlightNumber);
                  setarr(n[index].ArrivalFlightNumber);
                  setDeleted(n[index]._id);
                  handleClickPopUpDelete();
                }}
              />
            </div>
          ))}
        </div>
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
