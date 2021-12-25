import * as React from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./Assets/CssFiles/Button.CSS";

const useStyles = makeStyles({
  size: {
    width: "10vw !important",
    height: "4vw !important ",
  },
});

export default function Buttons(props) {
  const classes = useStyles();
  return (
    <div>
      <Button
        ClassName={classes.size}
        onClick={props.onClick}
        variant="contained"
        size="small"
        fullWidth={props.fullWidth}
        style={props.style}
      >
        {props.title}
      </Button>
    </div>
  );
}
