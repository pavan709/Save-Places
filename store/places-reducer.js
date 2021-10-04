import Place from "../models/place";
import { ADD_PLACE, SET_PLACES } from "./places-actions";

const initalState = {
  places: [],
};

export default (state = initalState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      console.log('place reducer', action.placeData.address);
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng
      );
      return {
        places: state.places.concat(newPlace),
      };
    case SET_PLACES:
      return {
        places: action.places.map(
          (pl) =>{
            return new Place(
              pl.id.toString(),
              pl.title,
              pl.imageUri,
              pl.address,
              pl.lat,
              pl.lng
            )}
        ),
      };
    default:
      return state;
  }
};
