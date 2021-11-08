import React from "react";
import Buttons from "../Componenets/General/Buttons";
import { makeStyles } from "@material-ui/core/styles";

import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    marginTop: "15vw",
    marginLeft: "23vw",
  },
});

export default function AdminHome() {
  const classes = useStyles();

  const navigate = useNavigate();

  const handleCreate = () => {
    // history.push("/addflight");
    navigate("/addflight");
  };
  const handleView = () => {
    // history.push("/viewallflights");
    navigate("/viewallflights");
  };

  return (
    <div className={classes.root}>
      <Buttons size="small" title="Search Flight" onClick={handleView} />
      <Buttons size="small" title="Create Flight" onClick={handleCreate} />
    </div>
  );
}
