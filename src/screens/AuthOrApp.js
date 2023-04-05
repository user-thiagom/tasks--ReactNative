import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showError } from '../common'
import axios from 'axios'

const AuthOrApp = ({navigation}) => {
    useEffect(()=>{
        validateSession()
    },[])

    async function validateSession() {
        const userDataJSON = await AsyncStorage.getItem('userData')
        let userData = null

        try {
            userData = JSON.parse(userDataJSON)
        } catch (error) {
            showError(error)
        }

        if(userData && userData.token){
            axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            navigation.navigate('Home',userData)
        } else{
            navigation.navigate('Auth')
        }
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'black'
    }
})

export default AuthOrApp