import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { IconButton } from "@material-ui/core";
import Logo from "../General/Logo";
import LogoUser from "../NavBar/PopUpNavBar";
import HomeIcon from "@mui/icons-material/Home";
import Button from "../AccountDetails/Buttons";
const useStyles = makeStyles({
  root: {
    display: "flex",
    backgroundColor: "#005dad",
    height: "4vw",
  },

  logo: {
    marginTop: "1.4vw",
    marginLeft: "-12vw",
  },
  HelpFocus: {
    color: "#ffd633 !important",
    marginTop: "1.6vw",
    marginLeft: "2.2vw",
    fontSize: "1vw",
  },
  HelpBlur: {
    fontSize: "1vw",
    color: "white",
    marginTop: "1.6vw",
    marginLeft: "2.2vw",
  },

  loginFocus: {
    backgroundColor: "white!important",
    height: "2vw",
    width: "2vw",
    marginLeft: "2.2vw",
    marginTop: "1.4vw",
    // marginLeft: "64vw",
    //marginLeft: "69vw",
  },
  loginBlur: {
    backgroundColor: "#ffd633 !important",
    height: "2vw",
    width: "2vw",
    marginLeft: "2.2vw",
    marginTop: "1.4vw",
    // marginLeft: "64vw",
    //marginLeft: "69vw",
  },
  button: {
    marginLeft: "60vw",
    marginTop: "-0.1vw",
  },
});

export default function NavBar2() {
  const [help, setHelp] = useState(false);
  const [home, setHome] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [button, setButton] = useState(false);
  const classes = useStyles();
  const admin = window.localStorage.getItem("admin");

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClick = () => {
    window.location = "/homeadmin";
  };

  const handleClickButton = () => {
    window.location = "/createflight";
  };

  return (
    <div className={classes.root}>
      <div>
        <Logo />
      </div>
      <div className={classes.button}>
        <Button
          fullWidth="true"
          title={"Create Flight "}
          onClick={handleClick}
          style={{
            width: "9vw",
            height: "2.7vw",
            borderRadius: "0.5vw",
            backgroundColor: "white",

            fontSize: "0.8vw",
            color: "#005dad",
            "&:hover": {
              backgroundColor: "#ffd633",
            },
          }}
          onClick={handleClickButton}
        />
      </div>

      <div className={classes.logo}>
        <LogoUser />
      </div>
      <div>
        <IconButton
          className={home == true ? classes.loginBlur : classes.loginFocus}
          onMouseOver={() => setHome(true)}
          onMouseOut={() => setHome(false)}
          onClick={handleClick}
        >
          {" "}
          <HomeIcon style={{ color: "#005dad" }} />
        </IconButton>
      </div>
      <div
        className={help == true ? classes.HelpFocus : classes.HelpBlur}
        onMouseOver={() => setHelp(true)}
        onMouseOut={() => setHelp(false)}
      >
        Can we Help ?
      </div>
    </div>
  );
}
