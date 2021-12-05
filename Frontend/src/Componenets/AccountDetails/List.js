import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";
import WorkIcon from "@mui/icons-material/Work";
import Settings from "@mui/icons-material/Settings";
const useStyles = makeStyles({
  account: { color: "black", marginLeft: "0.5vw" },
  booking: {
    color: "black",
    marginLeft: "0.5vw",
  },
  workicon: { marginTop: "0.2vw" },
  accounticon: { marginTop: "0.3vw" },
});

export default function List(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [work, setWork] = React.useState(false);
  const [account, setAccount] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleClickAccount = () => {
    window.location = "/account";
  };
  const handleClickWork = () => {
    window.location = "/viewbookings";
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <Paper>
        <MenuList>
          <MenuItem
            onMouseOut={() => setWork(false)}
            onMouseOver={() => setWork(true)}
            onClick={(() => setWork(true), handleClickWork)}
            disabled={props.disabled}
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
          </MenuItem>
          <MenuItem
            onMouseOver={() => setAccount(true)}
            onMouseOut={() => setAccount(false)}
            onClick={(() => setAccount(true), handleClickAccount)}
            disabled={props.disabled}
          >
            {" "}
            <div>
              {" "}
              <Settings
                className={classes.accounticon}
                fontSize="small"
                style={account ? { color: "#005dad" } : { color: "grey" }}
              />{" "}
            </div>
            <div className={classes.account}>Account Details </div>
          </MenuItem>
        </MenuList>
      </Paper>
      <div></div>
    </Stack>
  );
}
