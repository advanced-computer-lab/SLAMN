import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: "4vw",
    background: "",
    border: " 1px solid #ccc",
    borderRadius: "0.3vw",
    display: "flex",
  },
  placeholder: {
    width: "6vw",
    height: "4vw",
    textAlign: "center",
    marginTop: "1vw",
    color: "gray",
  },
}));

export default function Dropdown(props) {
  const classes = useStyles();
  const [selecting, setSelecting] = React.useState(false);
  const handleClose = () => {
    setSelecting(false);
  };
  return (
    <div className={classes.root}>
      {props.value === "" ? (
        <div className={classes.placeholder}>{props.placeholder}</div>
      ) : (
        ""
      )}
      <Select
        defaultValue={"toot"}
        native={props.native}
        renderValue={props.renderValue}
        onClose={handleClose}
        onOpen={(e) => setSelecting(true)}
        value={props.value}
        onChange={props.onChange}
      >
        {props.items.map((elem, index) => (
          <MenuItem value={elem}>{elem}</MenuItem>
        ))}
      </Select>
    </div>
  );
}
