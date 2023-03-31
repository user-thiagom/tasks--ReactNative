import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Auth from './screens/Auth'
import TaskList from './screens/TaskList'
import { createDrawerNavigator } from '@react-navigation/drawer'

const MainRoutes ={
    Auth: {
        name:'Auth',
        component: Auth
    },
    Home: {
        name:'Home',
        component:TaskList
    }
}

const Drawer = createDrawerNavigator()

const Navigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='Auth'>
                <Drawer.Screen {...MainRoutes.Auth}/>
                <Drawer.Screen {...MainRoutes.Home}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default Navigator