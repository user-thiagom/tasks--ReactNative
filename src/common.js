import { Alert, Platform } from 'react-native'

const server = 'http://192.168.1.107:3000'

function showError(err) {
    Alert.alert('Ops! Ocorreu um problema!', `Messagem: ${err}`)
}

function showSuccess(msg) {
    Alert.alert('Sucesso!')
}

export {server,showError,showSuccess}