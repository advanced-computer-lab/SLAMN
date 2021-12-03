import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@mui/material/Radio";
import Textfield from "../AccountDetails/Textfields";

const useStyles = makeStyles({
  root: {
    marginTop: "1vw",
    marginLeft: "2vw",
    backgroundColor: "white",
    width: "60vw",
    height: "30vw",
    padding: "0.5vw",
    borderRadius: "0.5vw !important",
    boxShadow: "1px 1.6px 1px #9E9E9E",
  },
  block: {
    width: "60.5vw",
    height: "0.2vw",
    backgroundColor: "#ffd633 !important",
  },
  display: {
    display: "flex",
  },
  pass: {
    marginTop: "1vw",
    fontSize: "1.5vw",
    fontWeight: "600",
    marginLeft: "1vw",
  },
  firstradio: {
    marginLeft: "0.2vw !important",
    marginTop: "1vw !important",
  },
  secondradio: {
    marginTop: "1vw !important",
    marginLeft: "0.5vw !important",
  },
  male: { color: "#666", marginTop: "1.5vw" },
  female: { color: "#666", marginTop: "1.5vw" },

  second: {
    marginTop: "0.5vw",
    marginLeft: "11.3vw",
  },
  first: {
    marginLeft: "1vw",
    marginTop: "0.5vw",
  },
});
export default function Passenger() {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState("a");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div className={classes.root}>
      <div className={classes.block}></div>
      <div className={classes.display}>
        {" "}
        <div className={classes.pass}>Passenger</div>
        <div className={classes.pass}>{1}</div>
      </div>
      <div className={classes.display}>
        <div>
          {" "}
          <Radio
            className={classes.firstradio}
            checked={selectedValue === "a"}
            onChange={handleChange}
            value="a"
            name="radio-buttons"
            inputProps={{ "aria-label": "A" }}
            size={"small"}
          />
        </div>
        <div className={classes.male}>Male</div>
        <div>
          {" "}
          <Radio
            className={classes.secondradio}
            checked={selectedValue === "b"}
            onChange={handleChange}
            value="b"
            name="radio-buttons"
            size={"small"}
            inputProps={{ "aria-label": "B" }}
          />
        </div>
        <div className={classes.female}>Female</div>
      </div>
      <div className={classes.display}>
        <div className={classes.first}>FirstName</div>
        <div className={classes.second}>LastName</div>
      </div>
      <div className={classes.display}>
        <div>
          {" "}
          <Textfield placeholder={"E.g.Nour"} />
        </div>
        <div>
          {" "}
          <Textfield placeholder={"E.g.Samaa"} />
        </div>
      </div>
    </div>
  );
}
