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
import AddTask from './AddTask'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { server, showError } from '../common'
import axios from 'axios'

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
    const [showAddTask, setShowAddTask] = useState(false)

    useEffect(() => {
        getTasksFromStorage = async () => {
            const stateString = await AsyncStorage.getItem('tasks')
            const state = JSON.parse(stateString) || initialTaskState
            setshowDoneTasks(state)
        }
        getTasksFromStorage()
        loadTasks()
    }, [])

    useEffect(() => {
        filterTasks()
    }, [showDoneTasks, tasks])

    useEffect(() => {
        loadTasks()
    }, [showAddTask == false])

    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

    async function loadTasks() {
        try {
            const maxDate = moment().format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            setTasks(res.data)
        } catch (error) {
            showError(error)
        }
    }

    function togglefilter() {
        setshowDoneTasks(!showDoneTasks)
    }

    function filterTasks() {
        let visibleTasksCopy = null
        if (showDoneTasks) {
            visibleTasksCopy = [...tasks]
        } else {
            const pending = task => task.doneAt === null
            visibleTasksCopy = tasks.filter(pending)
        }

        setVisibleTasks(visibleTasksCopy)
        AsyncStorage.setItem('tasks', JSON.stringify(showDoneTasks))
    }

    async function toggleTask(taskId) {
        await axios.put(`${server}/tasks/${taskId}/Toggle`)
        await loadTasks()
    }

    async function addTask(newTask) {
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Inválidos!', 'Descrição não informada')
            return
        }
  
        try {
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimateAt: newTask.date
            })

            setShowAddTask(false)
        } catch (error) {
            showError(error)
        }
    }

    async function deleteTask(taskId) {
        try {
            await axios.delete(`${server}/tasks/${taskId}`)
            loadTasks()
        } catch (error) {
            showError(error)
        }
    }

    return (
        <View style={styles.container}>
            <AddTask isVisible={showAddTask} onCancel={() => setShowAddTask(!showAddTask)} onSave={addTask} />

            <ImageBackground style={styles.background} source={todayImage}>
                <View style={styles.iconBar}>
                    <TouchableOpacity onPress={togglefilter}>
                        <Entypo name={showDoneTasks ? 'eye' : 'eye-with-line'} size={20} color={commonStyles.colors.secondary} />
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
                    renderItem={({ item }) => <Task {...item} toggleTask={toggleTask} onDelete={deleteTask} />}
                />
            </View>

            <TouchableOpacity style={styles.addButton} onPress={() => setShowAddTask(true)} activeOpacity={0.7}>
                <Entypo name='plus' size={20} color={commonStyles.colors.secondary} />
            </TouchableOpacity>
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
        justifyContent: 'flex-end',
        marginTop: '10%'
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default TaskList