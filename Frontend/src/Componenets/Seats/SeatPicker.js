import React, { Component } from "react";
import { useState } from "react";

import SeatPicker from "react-seat-picker";

export default function Seatpicker(props) {
  const [loading, setLoading] = React.useState(false);
  const array = [
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
    [
      { number: "E13", isReserved: false },
      { number: "E14", isReserved: true },
      { number: "E15", isReserved: false },
      { number: "E16", isReserved: true },
      { number: "E17", isReserved: false },
      { number: "E18", isReserved: false },
    ],
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
    const rows = [
      [
        { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you" },
        { id: 2, number: 2, tooltip: "Cost: 15$" },
        null,
        {
          id: 3,
          number: "3",
          isReserved: true,
          orientation: "east",
          tooltip: "Reserved by Rogger",
        },
        { id: 4, number: "4", orientation: "west" },
        null,
        { id: 5, number: 5 },
        { id: 6, number: 6 },
      ],
      [
        {
          id: 7,
          number: 1,
          isReserved: true,
          tooltip: "Reserved by Matthias Nadler",
        },
        { id: 8, number: 2, isReserved: true },
        null,
        { id: 9, number: "3", isReserved: true, orientation: "east" },
        { id: 10, number: "4", orientation: "west" },
        null,
        { id: 11, number: 5 },
        { id: 12, number: 6 },
      ],
      [
        { id: 13, number: 1 },
        { id: 14, number: 2 },
        null,
        { id: 15, number: 3, isReserved: true, orientation: "east" },
        { id: 16, number: "4", orientation: "west" },
        null,
        { id: 17, number: 5 },
        { id: 18, number: 6 },
      ],
      [
        { id: 19, number: 1, tooltip: "Cost: 25$" },
        { id: 20, number: 2 },
        null,
        { id: 21, number: 3, orientation: "east" },
        { id: 22, number: "4", orientation: "west" },
        null,
        { id: 23, number: 5 },
        { id: 24, number: 6 },
      ],
      [
        { id: 25, number: 1, isReserved: true },
        { id: 26, number: 2, orientation: "east" },
        null,
        { id: 27, number: "3", isReserved: true },
        { id: 28, number: "4", orientation: "west" },
        null,
        { id: 29, number: 5, tooltip: "Cost: 11$" },
        { id: 30, number: 6, isReserved: true },
      ],
    ];
    return (
      <div>
        <div style={{ marginTop: "3vw", height: "20vw" }}>
          <SeatPicker
            addSeatCallback={addSeatCallback}
            removeSeatCallback={removeSeatCallback}
            rows={array}
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
