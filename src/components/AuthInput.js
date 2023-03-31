import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons';

const AuthInput = (props) => {
    return (
        <View style={[styles.container,props.style]}>
            <Entypo name={props.nameIcon} size={20} style={styles.icon}/>
            <TextInput {...props} style={styles.input}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:40,
        backgroundColor:'#eee',
        borderRadius:20,
        flexDirection:'row',
        alignItems:'center'
    },
    icon:{
        color:'#3333',
        marginLeft:20
    },
    input:{
        marginLeft:20,
        width:'70%'
    }
})

export default AuthInput