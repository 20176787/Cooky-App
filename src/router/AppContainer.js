import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeCookyScreen from "../page/HomeCookyScreen";
import DetailScreen from "../page/DetailScreen";
import SearchScreen from "../page/SearchScreen";
import UserScreen from "../page/UserScreen";
const Stack=createStackNavigator();
export default function AppContainer() {
    return(
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name={'Home'} component={HomeCookyScreen}/>
            <Stack.Screen name={'Detail'} component={DetailScreen}/>
            <Stack.Screen name={'Search'} component={SearchScreen}/>
            <Stack.Screen name={'User'} component={UserScreen}/>
        </Stack.Navigator>

    )
}
