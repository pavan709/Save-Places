
import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../helpers/db";
export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";
import ENV from "../env";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    console.log("in places action", location);
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${location.lat}&lon=${location.lng}&apiKey=${ENV.geoapifyLocationReverse}`,
      { method: "GET" }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const resData = await response.json();

    if (!resData.features) throw new Error("Something went wrong");

    const address = resData.features[0].properties.formatted;

    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: { lat: location.lat, lng: location.lng },
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();

      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
