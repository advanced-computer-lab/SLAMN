import PersonIcon from "@mui/icons-material/Person";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { IconButton } from "@material-ui/core";
import Logo from "../General/Logo";
import LogoUser from "../NavBar/PopUpNavBar";
import HomeIcon from "@mui/icons-material/Home";

const useStyles = makeStyles({
  root: {
    display: "flex",
    backgroundColor: "#005dad",
    height: "4vw",
  },

  logo: {
    marginTop: "1.4vw",
    marginLeft: "62vw",
  },
  HelpFocus: {
    color: "#ffd633 !important",
    marginTop: "1.6vw",
    marginLeft: "2.2vw",
  },
  HelpBlur: { color: "white", marginTop: "1.6vw", marginLeft: "2.2vw" },

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
});

export default function NavBar() {
  const [help, setHelp] = useState(false);
  const [home, setHome] = useState(false);
  const [open1, setOpen1] = useState(false);
  const classes = useStyles();
  const admin = window.localStorage.getItem("admin");

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClick = () => {
    console.log(admin, "ADMINNNNN");
    if (admin === "true") {
      window.location = "/homeadmin";
    } else {
      window.location = "/home";
    }
  };

  return (
    <div className={classes.root}>
      <div>
        <Logo />
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
