import React from "react";
import TextField from "@material-ui/core/TextField";

export default function TextBox(props) {
  const [value, setValue] = React.useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

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
