import React from "react";
import TextField from "@material-ui/core/TextField";

export default function TextBox(props) {
  return (
    <div>
      <TextField
        variant="outlined"
        label={props.title}
        onChange={props.onChange}
      />
    </div>
  );
}
