import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { IconButton } from "@material-ui/core";
import Logo from "../General/Logo";
import LogoUser from "../NavBar/PopUpNavBar";

const useStyles = makeStyles({
  root: {
    display: "flex",
    backgroundColor: "#005dad",
    height: "4vw",
  },

  logo: {
    marginTop: "1vw",
    marginTop: "1.4vw",
    marginLeft: "64vw",
  },
  HelpFocus: {
    color: "#ffd633 !important",
    marginTop: "1.6vw",
    marginLeft: "2.2vw",
  },
  HelpBlur: { color: "white", marginTop: "1.6vw", marginLeft: "2.2vw" },
});

export default function NavBar() {
  const [help, setHelp] = useState(false);
  const [open1, setOpen1] = useState(false);
  const classes = useStyles();

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  return (
    <div className={classes.root}>
      <div>
        <Logo />
      </div>

      <div></div>

      <div className={classes.logo}>
        <LogoUser />
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
