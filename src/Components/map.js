import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { Dimensions } from "react-native";
import axios from "axios";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;

export default function Map(props) {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  useEffect(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${props.address}&key=AIzaSyBlVNkuwYlvdnVHJ587cal6v_lFUNp_5Hk`
      )
      .then(function (response) {
        var lng = response.data.results[0].geometry.location.lng;
        var lat = response.data.results[0].geometry.location.lat;
        var northeastLat =
          response.data.results[0].geometry.viewport.northeast.lat;
        var southwestLat =
          response.data.results[0].geometry.viewport.southwest.lat;
        var latDelta = northeastLat - southwestLat;
        var lngDelta = latDelta * ASPECT_RATIO;
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: lngDelta,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <MapView style={{ width: "100%", height: "100%" }} region={region}>
      <Marker
        coordinate={{ latitude: region.latitude, longitude: region.longitude }}
      />
    </MapView>
  );
}
