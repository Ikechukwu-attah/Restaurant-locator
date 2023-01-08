import React, { useState, useEffect } from "react";
import { Header, Map, List, PlaceDetails } from "./components";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacedData } from "./api";
import { Data } from "@react-google-maps/api";
const App = () => {
  const [places, setPlaces] = useState([]);

  const [bound, setBound] = useState({});
  const [coordinates, setCoordinates] = useState(null);
  useEffect(() => {
    getPlacedData().then((data) => setPlaces(data));
  }, [coordinates, bound]);
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setBound={setBound}
            setCoordinate={setCoordinates}
            coordinates={coordinates}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
