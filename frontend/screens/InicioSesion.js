import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native';
import React from 'react';

import { AuthContext } from '../components/context';

const InicioSesion = () => {

    const {signIn} = React.useContext(AuthContext);

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true
    })

    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        }
        else
        {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            })
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const loginHandle = (usename, password) => {
        signIn(usename, password);
    }

    return (
        <View style={styles.logScreen}>
            <Text style = {styles.textScreen}>
                CERRADURA AUTOMÁTICA
            </Text>
            <TextInput
                keyboardType='number-pad'
                placeholder= 'DNI'
                style = {styles.textInput}
                onChangeText = {(val) => textInputChange(val)}
            />
            <TextInput
                placeholder = 'Contraseña'
                secureTextEntry={data.secureTextEntry ? true : false}
                style = {styles.textInput}
                autoCapitalize='none'
                onChangeText = {(val) => handlePasswordChange(val)}
            />

            <TouchableOpacity
                onPress={() => {loginHandle( data.username, data.password)}}
                style = {styles.loginButton}
                disabled = {data.check_textInputChange === true ?  false : true}
            >
                <Text style={styles.textButton}>INICIAR SESIÓN</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    logScreen: {
        backgroundColor: '#041C32',
        padding: 20,
        flex: 1
    },
    textScreen: {
        fontSize: 40,
        color: '#ECB365',
        marginTop: 40,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    textInput: {
        borderWidth: 0.5,
        padding: 15,
        fontSize: 16,
        marginTop: 25,
        borderRadius: 15,
        backgroundColor: '#ECB365'

    },
    loginButton: {
        borderWidth: 1,
        borderColor: '#064663',
        padding: 20,
        marginTop: 40,
        borderRadius: 20,
        backgroundColor: '#04293A'
    },
    textButton: {
        color: '#ECB365',
        fontSize: 15,
        textAlign: 'center',
    }
})

export default InicioSesion