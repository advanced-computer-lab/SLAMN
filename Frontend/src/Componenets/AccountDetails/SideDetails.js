import * as React from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import WorkIcon from "@mui/icons-material/Work";
import Settings from "@mui/icons-material/Settings";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  account: { color: "black", marginLeft: "0.5vw" },
  booking: {
    color: "black",
    marginLeft: "0.5vw",
  },
  workicon: { marginTop: "0.2vw" },
  accounticon: { marginTop: "0.3vw" },
});

export default function SideDetils() {
  const classes = useStyles();
  const [view, setView] = React.useState("list");
  const [work, setWork] = React.useState(false);
  const [account, setAccount] = React.useState(false);

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={view}
      exclusive
      onChange={handleChange}
      style={{ color: "white" }}
    >
      <ToggleButton
        value="list"
        aria-label="list"
        onMouseOut={() => setWork(false)}
        onMouseOver={() => setWork(true)}
        onClick={() => setWork(true)}
        style={{ color: "white" }}
      >
        <div>
          {" "}
          <WorkIcon
            fontSize="small"
            className={classes.workicon}
            style={work ? { color: "#005dad" } : { color: "grey" }}
          />{" "}
        </div>
        <div className={classes.booking}>Manage Booking </div>
      </ToggleButton>
      <ToggleButton
        style={{ color: "white" }}
        value="module"
        aria-label="module"
        onMouseOver={() => setAccount(true)}
        onMouseOut={() => setAccount(false)}
        onClick={() => setAccount(true)}
  
      >
        <div>
          {" "}
          <Settings
            className={classes.accounticon}
            fontSize="small"
            style={account ? { color: "#005dad" } : { color: "grey" }}
          />{" "}
        </div>
        <div className={classes.account}>Account Details </div>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
