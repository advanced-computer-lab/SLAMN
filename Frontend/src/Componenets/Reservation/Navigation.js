import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import DepartureFlights from "./DepartureFlights";
import Button from "../AccountDetails/Buttons";
import ReturnFlights from "../Reservation/ReturnFlights";
const useStyles = makeStyles({
  accountform: {
    marginTop: "2vw",
    marginLeft: "2vw",
    display: "flex",
    flexDirection: "column",
    background: " gainsboro",
  },
  display: {
    background: " gainsboro",
    marginRight: "20vw",
    // height: "100vw",
  },
  buttons: {
    display: "flex",
    marginLeft: "10vw",
    marginBottom: "2vw",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const flights = props.flights;
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Departure Flights" {...a11yProps(0)} />
          <Tab label="Return Flights" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className={classes.accountform}>
          {props.error === true ? (
            <div></div>
          ) : (
            flights.map((n) => (
              <div className={classes.display}>
                {console.log(n)}
                <DepartureFlights
                  flight={{
                    arrival: n[0].ArrivalFlightNumber,
                    departure: n[0].DepartureFlightNumber,
                    bookingnumber: n[0]._id,
                  }}
                />
                <div className={classes.buttons}>
                  <Button
                    ClassName={classes.button}
                    title={"Cancel"}
                    onClick={() => {
                      console.log(n, "nnnnnnnnnnnn");
                      console.log(flights, "FLIGHTTTTTTT");
                      props.setDep(n[0].DepartureFlightNumber);
                      props.setarr(n[0].ArrivalFlightNumber);
                      props.setDeleted(n[0]._id);
                      props.handleClickPopUpDelete();
                    }}
                  />
                  <Button
                    ClassName={classes.button}
                    title={"Edit"}
                    onClick={() => {}}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.accountform}>
          {props.error === true ? (
            <div></div>
          ) : (
            flights.map((n) => (
              <div className={classes.display}>
                {console.log(n)}
                <ReturnFlights
                  flight={{
                    arrival: n[0].ArrivalFlightNumber,
                    departure: n[0].DepartureFlightNumber,
                    bookingnumber: n[0]._id,
                  }}
                />

                <div className={classes.buttons}>
                  <Button
                    ClassName={classes.button}
                    title={"Cancel"}
                    onClick={() => {
                      console.log(n, "nnnnnnnnnnnn");
                      console.log(flights, "FLIGHTTTTTTT");
                      props.setDep(n[0].DepartureFlightNumber);
                      props.setarr(n[0].ArrivalFlightNumber);
                      props.setDeleted(n[0]._id);
                      props.handleClickPopUpDelete();
                    }}
                  />
                  <Button
                    ClassName={classes.button}
                    title={"Edit"}
                    onClick={() => {}}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </TabPanel>
    </Box>
  );
}
