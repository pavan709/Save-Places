import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as placesActions from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from "../components/LocationPicker";
const NewPlacetScreen = (props) => {
  const [selectedImage, setSelectedImage] = useState();
  const [titleValue, setTitleValue] = useState("");
  const [selectedLocation, setSelectedLocation] = useState();
  const dispatch = useDispatch();
  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location);
  },[setSelectedLocation]);

  const savePlaceHandler = () => {
    if(!selectedImage || !titleValue || !selectedLocation)
    {
      Alert.alert('Input  invalid!','Please give valid title, image, location!',[{text:'Okay'}]);
      return;
    }
    try{
      dispatch(placesActions.addPlace(titleValue,selectedImage, selectedLocation));
      props.navigation.goBack();
    }catch(err){
      Alert.alert('Opps...', ' Something went wrong!',[{text:'Okay'}]);
    }
  };

  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath)
  }
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler}/>
        <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler} />
          <Button title="Save Place" color={Colors.blue2} onPress={savePlaceHandler} />
      </View>
    </ScrollView>
  );
};

NewPlacetScreen.navigationOptions = {
  headerTitle: "Add Place",
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlacetScreen;
