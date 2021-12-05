import React from "react";
import { useState, useEffect } from "react";

import SeatPicker from "react-seat-picker";

export default function Seatpicker(props) {
  //const seats = window.localStorage.getItem("seats");
  const seats = JSON.parse(localStorage.getItem("seats"));
  // const [array, setArray] = React.useState([]);
  useEffect(() => {
    console.log(seats, "SEATSSSS");
  }, []);

  const [loading, setLoading] = React.useState(false);
  const array2 = [
    [
      { number: "E1", isReserved: false },
      { number: "E2", isReserved: false },
      { number: "E3", isReserved: true },
      { number: "E4", isReserved: false },
      { number: "E5", isReserved: false },
      { number: "E6", isReserved: false },
    ],
    [
      { number: "E7", isReserved: false },
      { number: "E8", isReserved: false },
      { number: "E9", isReserved: false },
      { number: "E10", isReserved: false },
      { number: "E11", isReserved: false },
      { number: "E12", isReserved: false },
    ],
    [{ number: "E13", isReserved: false }],
  ];
  const addSeatCallback = async ({ row, number }, addCb) => {
    setLoading(true);
    {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(`Added seat , row ${row}, id ${number}`);
      const newTooltip = `tooltip for id-${number} added by callback`;
      addCb(row, number, newTooltip);
      setLoading(false);
    }
    var i = 0;
    var newseats = [];
    var found = false;
    for (i; i < props.seats.length; i++) {
      if (props.seats[i].passengerSeat === "" && !found) {
        newseats.push({
          passengerNumber: i + 1,
          passengerType: props.seats[i].passengerType,
          passengerSeat: number,
        });
        found = true;
        if (props.cabin === "Economy") {
          if (props.seats[i].passengerType === "Adult") {
            props.setPrice(props.price + props.initialPrice);
          } else {
            props.setPrice(props.price + props.initialPrice * 0.5);
          }
        }
        if (props.cabin === "Business") {
          if (props.seats[i].passengerType === "Adult") {
            props.setPrice(props.price + props.initialPrice * 1.5);
          } else {
            props.setPrice(props.price + props.initialPrice * 1.5 * 0.5);
          }
        }
        if (props.cabin === "First") {
          if (props.seats[i].passengerType === "Adult") {
            props.setPrice(props.price + props.initialPrice * 2);
          } else {
            props.setPrice(props.price + props.initialPrice * 0.5 * 2);
          }
        }
      } else {
        newseats.push(props.seats[i]);
      }
    }
    props.setSeats(newseats);
  };

  const removeSeatCallback = async ({ row, number }, removeCb) => {
    setLoading(true);
    {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(`Removed seat , row ${row}, id ${number}`);
      // A value of null will reset the tooltip to the original while '' will hide the tooltip
      const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
      removeCb(row, number, newTooltip);
      setLoading(false);
    }
    var i = 0;
    var newseats = [];
    for (i; i < props.seats.length; i++) {
      if (props.seats[i].passengerSeat === number) {
        newseats.push({
          passengerNumber: i + 1,
          passengerType: props.seats[i].passengerType,
          passengerSeat: "",
        });
        if (props.cabin === "Economy") {
          if (props.seats[i].passengerType === "Adult") {
            props.setPrice(props.price - props.initialPrice);
          } else {
            props.setPrice(props.price - props.initialPrice * 0.5);
          }
        }
        if (props.cabin === "Business") {
          if (props.seats[i].passengerType === "Adult") {
            props.setPrice(props.price - props.initialPrice * 1.5);
          } else {
            props.setPrice(props.price - props.initialPrice * 1.5 * 0.5);
          }
        }
        if (props.cabin === "First") {
          if (props.seats[i].passengerType === "Adult") {
            props.setPrice(props.price - props.initialPrice * 2);
          } else {
            props.setPrice(props.price - props.initialPrice * 0.5 * 2);
          }
        }
      } else {
        newseats.push(props.seats[i]);
      }
    }
    props.setSeats(newseats);
  };

  {
    return (
      <div>
        <div style={{ marginTop: "3vw", height: "20vw" }}>
          <SeatPicker
            addSeatCallback={addSeatCallback}
            removeSeatCallback={removeSeatCallback}
            rows={seats}
            maxReservableSeats={props.seats.length}
            alpha
            visible
            selectedByDefault
            loading={loading}
            tooltipProps={{ multiline: true }}
          />
        </div>
        {/* <h1>Seat Picker Continuous Case</h1>
        <div style={{ marginTop: "100px" }}>
          <SeatPicker
            addSeatCallback={this.addSeatCallbackContinousCase}
            removeSeatCallback={this.removeSeatCallback}
            rows={rows}
            maxReservableSeats={3}
            alpha
            visible
            selectedByDefault
            loading={loading}
            tooltipProps={{ multiline: true }}
            continuous
          />
        </div> */}
      </div>
    );
  }
}
