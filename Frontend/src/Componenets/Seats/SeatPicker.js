import React from "react";
import { useState, useEffect } from "react";

import SeatPicker from "react-seat-picker";

export default function Seatpicker(props) {
  // const [array, setArray] = React.useState([]);
  // useEffect(() => {
  //   var i = 0;
  //   var newArray = [];
  //   var a = [];
  //   for (i; i < props.array.length; i++) {
  //     if ((i + 1) % 6 === 0) {
  //       newArray.push(a);
  //       a = [];
  //     }
  //     a.push(props.array[i]);
  //   }
  //   if (a != []) {
  //     newArray.push(a);
  //   }
  //   setArray(newArray);
  //   console.log(newArray);
  // }, []);

  const [loading, setLoading] = React.useState(false);
  const array2 = [
    [
      { number: "E1", isReserved: false },
      { number: "E2", isReserved: false, _id: "88888" },
      { number: "E3", isReserved: true, _id: "88888" },
      { number: "E4", isReserved: false, _id: "88888" },
      { number: "E5", isReserved: false, _id: "88888" },
      { number: "E6", isReserved: false, _id: "88888" },
    ],
    [
      { number: "E7", isReserved: false, _id: "88888" },
      { number: "E8", isReserved: false, _id: "88888" },
      { number: "E9", isReserved: false, _id: "88888" },
      { number: "E10", isReserved: false, _id: "88888" },
      { number: "E11", isReserved: false },
      { number: "E12", isReserved: false, _id: "88888" },
    ],
    [{ number: "E13", isReserved: false, _id: "88888" }],
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
      } else {
        newseats.push(props.seats[i]);
      }
    }
    props.setSeats(newseats);
  };

  const addSeatCallbackContinousCase = async (
    { row, number, id },
    addCb,
    params,
    removeCb
  ) => {
    setLoading(true);
    {
      if (removeCb) {
        await new Promise((resolve) => setTimeout(resolve, 750));
        console.log(
          `Removed seat ${params.number}, row ${params.row}, id ${params.id}`
        );
        removeCb(params.row, params.number);
      }
      await new Promise((resolve) => setTimeout(resolve, 750));
      console.log(`Added seat ${number}, row ${row}, id ${id}`);
      const newTooltip = `tooltip for id-${id} added by callback`;
      addCb(row, number, id, newTooltip);
      setLoading(false);
    }
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
      } else {
        newseats.push(props.seats[i]);
      }
    }
    props.setSeats(newseats);
  };

  {
    const rows = props.array;
    return (
      <div>
        <div style={{ marginTop: "3vw", height: "20vw" }}>
          <SeatPicker
            addSeatCallback={addSeatCallback}
            removeSeatCallback={removeSeatCallback}
            rows={rows}
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
