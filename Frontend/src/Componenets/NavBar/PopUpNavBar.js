import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles({
  loginBlur: {
    backgroundColor: "white !important",
    height: "2vw",
    width: "2vw",
    marginTop: "1vw",
    marginLeft: "89vw",
  },
  loginFocus: {
    backgroundColor: "#ffd633 !important",
    height: "2vw",
    width: "2vw",
    marginTop: "1vw",
    marginLeft: "89vw",
  },
});

export default function PopUpNavBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [login, setLogin] = useState(false);

  const classes = useStyles();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickAccount = () => {
    window.location = "/account";
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Typography sx={{ minWidth: 100 }}></Typography>
        <Typography sx={{ minWidth: 100 }}></Typography>

        <IconButton
          className={login == true ? classes.loginFocus : classes.loginBlur}
          onMouseOver={() => setLogin(true)}
          onMouseOut={() => setLogin(false)}
          onClick={handleClick}
        >
          {" "}
          <PersonIcon style={{ color: "#005dad" }} />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <ListItemIcon>
            <WorkIcon fontSize="small" />
          </ListItemIcon>
          Manage Booking
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClickAccount}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Account Details
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
