import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Modal } from 'react-native'
import { StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import commonStyles from '../commonStyles'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'


const initialState = {
    desc: '',
    date: new Date(),
    showDatePicker: false
}

const AddTask = ({ onCancel, isVisible, onSave }) => {

    const [state,setState] = useState(initialState)

    const save = ()=>{
        const newTask = {
            desc: state.desc,
            date: state.date
        }

        if(onSave)
            onSave(newTask)
        
        setState({...initialState})
    }

    const getDateTimePicker = ()=>{
        const datePicker = <DateTimePicker
            value={state.date}
            onChange={(_,date)=>{setState(st=>({...st,date,showDatePicker:false}))}} mode='date'/>

        const dateString = moment(state.date).format('ddd, D [de] MMMM [de] YYYY')

        return (
            <View>
                <TouchableOpacity onPress={()=>setState(st=>({...st,showDatePicker:true}))}>
                    <Text style={styles.date}>
                        {dateString}
                    </Text>
                </TouchableOpacity>
                {state.showDatePicker &&  datePicker}
            </View>
        )
    }

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
                
                {getDateTimePicker()}

                <View style={styles.buttons}>
                    <TouchableOpacity onPress={onCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={save}>
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
    },
    date: {
        fontSize: 20,
        marginLeft: 15
    }
})

export default AddTask