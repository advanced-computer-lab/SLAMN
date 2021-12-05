import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Textfields(props) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-helperText"
        defaultValue={props.default}
        onChange={props.onChange}
        placeholder={props.placeholder}
        color={props.color}
        error={props.error}
        type={props.type}
        defaultValue={props.defaultValue}
      />
    </Box>
  );
}
