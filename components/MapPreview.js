
import React from "react";
import {TouchableOpacity, View, Image, StyleSheet } from "react-native";
import ENV from "../env";
const MapPreview = (props) => {
  let imagePreviewUrl;
  if (props.location) {

    imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat:${props.location.lng},${props.location.lat}&zoom=14.3497&marker=lonlat:${props.location.lng},${props.location.lat}%3Btype%3Aawesome%3Bcolor%3A%23bb3f73%3Bsize%3Ax-large%3Bicon%3Apaw%7Clonlat:${props.location.lng},${props.location.lat}%3Btype%3Amaterial%3Bcolor%3A%234c905a%3Bicon%3Atree%3Bicontype%3Aawesome%7Clonlat:${props.location.lng},${props.location.lat}%3Btype%3Amaterial%3Bcolor%3A%234c905a%3Bicon%3Atree%3Bicontype%3Aawesome&apiKey=${ENV.geoapifyApiKey}`;


  }
  return (
    <TouchableOpacity onPress={props.onPress} style={{...styles.mapPreview,...props.style}}>
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview:{
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage:{
      width:'100%',
      height:'100%',
  }
});

export default MapPreview;
