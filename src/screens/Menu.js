import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { DrawerItemList } from '@react-navigation/drawer'
import { Gravatar } from 'react-native-gravatar'
import commonStyles from '../commonStyles'

const Menu = (props) => {
    const optionsGravatar = {
        email: props.email,
        secure: true,

    }

    return (
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <Gravatar style={styles.avatar} options={optionsGravatar} />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.email}>{props.email}</Text>
                </View>
            </View>
            <DrawerItemList {...props} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    title:{
        color:'#000',
        fontSize:30,
        paddingTop:30,
        padding:10,
        fontWeight:'300'
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin: 10,
        
    },
    userInfo:{
        marginLeft:10,
        
    },
    name:{
        fontSize:20,
        marginBottom:1,
        fontWeight:'300'
    },
    email:{
        fontSize:15,
        color:commonStyles.colors.mainText,
        fontWeight:'300',
        marginBottom:10,
    }
})

export default Menu