import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import commonStyles from '../commonStyles'
import todayImage from '../../assets/imgs/today.jpg'
import moment from 'moment'
import 'moment/locale/pt-br'
import Task from '../components/Task'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';

const initialTaskState = [
    {
        id: Math.random(),
        desc: 'Estudar Curso de React Native',
        estimateAt: new Date(),
        doneAt: new Date()
    },
    {
        id: Math.random(),
        desc: 'Fazer Café da Manhã',
        estimateAt: new Date(),
        doneAt: null
    }
]

const TaskList = () => {

    const [tasks, setTasks] = useState(initialTaskState)
    const [showDoneTasks, setshowDoneTasks] = useState(true)
    const [visibleTasks, setVisibleTasks] = useState([])

    useEffect(()=>{
        filterTasks()
    },[showDoneTasks,tasks])

    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

    function togglefilter() {
        setshowDoneTasks(!showDoneTasks)
    }

    function filterTasks(){
        let visibleTasksCopy = null
        if(showDoneTasks){
            visibleTasksCopy = [...tasks]
        }else{
            const pending = task => task.doneAt === null
            visibleTasksCopy = tasks.filter(pending)
        }

        setVisibleTasks(visibleTasksCopy)
    }

    function toggleTask(taskId) {
        const tasksCopy = [...tasks]
        tasksCopy.forEach(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        setTasks(tasksCopy)
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.background} source={todayImage}>
                <View style={styles.iconBar}>
                    <TouchableOpacity onPress={togglefilter}>
                        <Entypo name={showDoneTasks ? 'eye' : 'eye-with-line' } size={20} color={commonStyles.colors.secondary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                </View>
            </ImageBackground>
            <View style={styles.taskList}>
                <FlatList data={visibleTasks}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => <Task {...item} toggleTask={toggleTask} />}
                />
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
        justifyContent: 'flex-end',
    },
    title: {
        marginLeft: 20,
        marginBottom: 10,
        fontSize: 50,
        color: commonStyles.colors.secondary
    },
    subtitle: {
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 20
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent:'flex-end',
        marginTop:'10%'
    }
})

export default TaskList