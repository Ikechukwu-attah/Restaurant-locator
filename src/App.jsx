import React, { useState, useEffect } from "react";
import { Header, Map, List, PlaceDetails } from "./components";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacedData } from "./api";
import { Data } from "@react-google-maps/api";
const App = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlace, setFilteredPlace] = useState([]);
  const [type, setType] = useState("Restaurant");
  const [rating, setRating] = useState("");
  const [bound, setBound] = useState({});
  const [coordinates, setCoordinates] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Getting users current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  // **********************

  useEffect(() => {
    const filteredPlace = places?.filter((place) => place.rating > rating);
    setFilteredPlace(filteredPlace);
  }, [rating]);
  useEffect(() => {
    setIsLoading(true);
    getPlacedData(type, bound.sw, bound.ne).then((data) => {
      setPlaces(data);
      setIsLoading(false);
    });
  }, [type, coordinates, bound]);
  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlace ? filteredPlace : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setBound={setBound}
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            places={filteredPlace ? filteredPlace : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
