import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'

import commonStyles from '../commonStyles'
import todayImage from '../../assets/imgs/today.jpg'
import moment from 'moment'
import 'moment/locale/pt-br'
import Task from '../components/Task'

const TaskList = () => {

    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.background} source={todayImage}>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                </View>
            </ImageBackground>
            <View style={styles.taskList}>
                <Task desc='Comprar Pão' estimateAt={new Date()} doneAt={new Date()}/>
                <Task desc='Ler Livro' estimateAt={new Date()} doneAt={null} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent:'flex-end',
    },
    title: {
        marginLeft: 20,
        marginBottom: 10,
        fontSize:50,
        color: commonStyles.colors.secondary
    },
    subtitle: {
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 20
    }
})

export default TaskList