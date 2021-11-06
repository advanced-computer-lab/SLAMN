import * as React from "react";
import Button from "@mui/material/Button";

export default function Buttons(props) {
  return (
    <div>
      <Button onClick={props.onClick} variant="contained">
        {props.title}
      </Button>
    </div>
  );
}
