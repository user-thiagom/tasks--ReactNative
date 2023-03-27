import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import commonStyles from '../commonStyles';
import moment from 'moment';

const Task = ({ id,desc, estimateAt, doneAt, toggleTask }) => {

    function getCheckView(doneAt) {
        if (doneAt != null) {
            return (
                <View style={styles.done}>
                    <AntDesign name="check" size={20} color="white" />
                </View>
            )
        } else {
            return (
                <View style={styles.pending}>

                </View>
            )
        }
    }

    const doneOrNotStyle = doneAt != null ? { textDecorationLine: 'line-through' } : {}

    const date = doneAt ? doneAt : estimateAt
    const formatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={()=>toggleTask(id)}>
                <View style={styles.checkContainer}>
                    {getCheckView(doneAt)}
                </View>
            </TouchableWithoutFeedback>

            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{desc}</Text>
                <Text style={styles.date}>{formatedDate + ""}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#aaa',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4d7031',
        justifyContent: 'center',
        alignItems: 'center'
    },
    desc: {
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        color: commonStyles.colors.subText,
        fontSize: 12
    }
})

export default Task