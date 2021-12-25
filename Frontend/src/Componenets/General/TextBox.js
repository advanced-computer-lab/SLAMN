import React from "react";
import TextField from "@material-ui/core/TextField";

export default function TextBox(props) {
  return (
    <div>
      <TextField
        variant="outlined"
        label={props.title}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.value}
        style={props.style}
        defaultValue={props.defaultValue}
      />
    </div>
  );
}
