import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import PlacesListScreen from '../screens/PlacesListScreen'
import PlaceDetailScreen from '../screens/PlaceDetailScreen'
import NewPlaceScreen from '../screens/NewPlaceScreen'
import MapScreen from '../screens/MapScreen'
import { Platform } from "react-native";
import Colors from '../constants/Colors'
const PlacesNavigator = createStackNavigator({
    Places: PlacesListScreen,
    PlaceDetail:PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map:MapScreen,
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Platform.OS === 'android'? Colors.blue2: '',
        },
        headerTintColor: Platform.OS === 'android'? 'white': Colors.blue2,
    }
})

export default createAppContainer(PlacesNavigator);
