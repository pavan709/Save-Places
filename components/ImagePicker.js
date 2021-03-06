
import React,{useState} from "react";
import { View, Text, Image, StyleSheet, Button,Alert } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from 'expo-image-picker'
const ImgPicker = (props) => {

  const [pickedImage, setPicketImage] = useState();

    const verifyPermissions = async () => {
        const result = await ImagePicker.requestCameraPermissionsAsync();
        if(result.status !== 'granted')
        {
            Alert.alert('Insufficient permissions!','You need to grant camera permissions to use this app.', [{text:'Okay'}])
            return false;
        }
        return true;
    }

  const takeImageHandler = async () => {
      const hasPermission = await verifyPermissions();
      if(!hasPermission)
      {
          return;
      }
    const image = await ImagePicker.launchCameraAsync({
        quality:0.5,
      });

      setPicketImage(image.uri);
      props.onImageTaken(image.uri);


  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {/* uri can also be used to pint at local images */}
        {!pickedImage ? (<Text>No image picked yet..</Text>):(
        <Image style={styles.image} source={{uri:pickedImage}} />)}
      </View>
      <Button
        title="Take Image"
        color={Colors.blue1}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    imagePicker:{
        alignItems:'center',
        marginBottom:15,
    },
    imagePreview:{
        width:'100%',
        height:200,
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#ccc',
        borderWidth:1,
    },
    image:{
        width:'100%',
        height:'100%',
    }
});

export default ImgPicker;
