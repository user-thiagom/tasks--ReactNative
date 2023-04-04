import { View, Text, ImageBackground } from 'react-native'
import React, { useState } from 'react'

import commonStyles from '../commonStyles'
import imgBackground from '../../assets/imgs/login.jpg'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import AuthInput from '../components/AuthInput'
import { server, showError, showSuccess } from '../common'
import axios from 'axios'

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false
}

const Auth = ({navigation}) => {
    const [state, setState] = useState(initialState)

    const validations = []
    validations.push(state.email && state.email.includes('@'))
    validations.push(state.password && state.password.length >= 6)

    if (state.stageNew) {
        validations.push(state.name && state.name.trim().length >= 3)
        validations.push(state.confirmPassword && state.confirmPassword)
    }

    const validForm = validations.reduce((t,a) => t && a)

    function signinOrSignup() {
        if (state.stageNew) {
            signUp()
        } else {
            signIn()
        }
    }

    signUp = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: state.name,
                email: state.email,
                password: state.password,
                confirmPassword: state.confirmPassword,
            })

            showSuccess('Usuário Cadastrado!')
            setState(initialState)
        } catch (error) {
            showError(error)
        }
    }

    signIn = async () => {
        try {
            const res = await axios.post(`${server}/signin`,{
                email: state.email,
                password: state.password
            })

            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            navigation.navigate('Home')
        } catch (error) {
            showError(error)
        }
    }

    return (
        <ImageBackground style={styles.background} source={imgBackground}>
            <Text style={styles.title}>Tasks</Text>
            <View style={styles.formContainer}>

                <Text style={styles.subtitle}>{state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}</Text>

                {state.stageNew &&
                    <AuthInput nameIcon='user' placeholder='Nome' value={state.name} style={styles.input} onChangeText={name => setState(st => ({ ...st, name }))} />
                }

                <AuthInput nameIcon='email' placeholder='E-mail' value={state.email} style={styles.input} onChangeText={email => setState(st => ({ ...st, email }))} />
                <AuthInput nameIcon='lock' secureTextEntry={true} placeholder='Senha' value={state.password} style={styles.input} onChangeText={password => setState(st => ({ ...st, password }))} />

                {state.stageNew &&
                    <AuthInput nameIcon='lock' placeholder='Confirme a senha' value={state.confirmPassword} style={styles.input} onChangeText={confirmPassword => setState(st => ({ ...st, confirmPassword }))} />
                }

                <TouchableOpacity onPress={signinOrSignup} disable={!validForm}>
                    <View style={[styles.button, validForm ? {} : {backgroundColor:'#aaa'}]}>
                        <Text style={styles.buttonText}>{state.stageNew ? 'Registrar' : 'Entrar'}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ padding: 10 }} onPress={() => setState(st => ({ ...st, stageNew: !st.stageNew }))}>
                <Text style={styles.buttonText}>
                    {state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                </Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10,
        fontWeight: '200'
    },
    subtitle: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10,
        fontWeight: '200',
        textAlign: 'center'
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%',
        borderRadius: 5
    },
    input: {
        marginTop: 10,
        backgroundColor: '#fff'
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 7
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '200'
    }
})

export default Auth