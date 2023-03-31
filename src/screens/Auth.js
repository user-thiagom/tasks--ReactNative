import { View, Text, ImageBackground } from 'react-native'
import React, { useState } from 'react'

import commonStyles from '../commonStyles'
import imgBackground from '../../assets/imgs/login.jpg'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Alert } from 'react-native'

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false
}

const Auth = () => {
    const [state, setState] = useState(initialState)

    function signinOrSignup(){
        if (state.stageNew) {
            Alert.alert('Sucesso','Criar a conta')
        } else{
            Alert.alert('Sucesso!', 'Logar')
        }
    }

    return (
        <ImageBackground style={styles.background} source={imgBackground}>
            <Text style={styles.title}>Tasks</Text>
            <View style={styles.formContainer}>

                <Text style={styles.subtitle}>{state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}</Text>

                {state.stageNew &&
                    <TextInput placeholder='Nome' value={state.name} style={styles.input} onChangeText={name => setState(st => ({ ...st, name }))} />
                }

                <TextInput placeholder='E-mail' value={state.email} style={styles.input} onChangeText={email => setState(st => ({ ...st, email }))} />
                <TextInput secureTextEntry={true} placeholder='Senha' value={state.password} style={styles.input} onChangeText={password => setState(st => ({ ...st, password }))} />

                {state.stageNew &&
                    <TextInput placeholder='Confirme a senha' value={state.confirmPassword} style={styles.input} onChangeText={confirmPassword => setState(st => ({ ...st, confirmPassword }))} />
                }

                <TouchableOpacity onPress={signinOrSignup}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>{state.stageNew ? 'Registrar' : 'Entrar'}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={{padding:10}} onPress={()=>setState(st=>({...st,stageNew:!st.stageNew}))}>
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
    subtitle:{
        color: 'white',
        fontSize: 20,
        marginBottom: 10,
        fontWeight: '200',
        textAlign:'center'
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
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight:'200'
    }
})

export default Auth