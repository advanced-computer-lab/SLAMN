import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Buttons(props) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        href="#contained-buttons"
        onClick={props.onClick}
        fullWidth={props.fullWidth}
        style={props.style}
      >
        {" "}
        {props.title}
      </Button>
    </Stack>
  );
}
