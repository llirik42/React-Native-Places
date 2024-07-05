import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PlacesScreen from "./index";
import WeatherScreen from './weather';


const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="index"
                component={PlacesScreen}
                options={{
                  title: "Места",
                }}
            />
            <Tab.Screen
                name="weather"
                component={WeatherScreen}
                options={{
                  title: "Погода",
                }}
            />
        </Tab.Navigator>
    );
}
