import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Modal } from 'react-native'
import { StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import commonStyles from '../commonStyles'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'

const initialState = {
    desc: ''
}

const AddTask = ({ onCancel, isVisible }) => {

    const [state,setState] = useState(initialState)

    return (
        <Modal transparent={true} visible={isVisible} onRequestClose={onCancel} animationType='slide'>
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>

            <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa</Text>

                <TextInput style={styles.input} 
                    placeholder='Informe a descrição'
                    value={state.desc}
                    onChangeText={desc => setState(st=>({...st,desc}))}/>
                
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={onCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.button}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    container: {
        backgroundColor: 'white'
    },
    header: {
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    input: {
        height: 40,
        margin:15,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'#e3e3e3',
        borderRadius:6
    },
    button:{
        margin:20,
        marginRight:30,
        color:commonStyles.colors.today
    }
})

export default AddTask