import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';

import React, { useEffect, useState } from 'react';

import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { AuthContext } from '../components/context';

import { getUsers } from "../api";

const InicioSesion = () => {
    
    const [User, setUsers] = useState({})

    //HACEMOS LA PETICION DE LOS USUARIOS
    const loadUsers = async () => {     
        const Users = await getUsers()
        setUsers(Users)
    }

    useEffect(() => {
        loadUsers()
    }, []);

    const {signIn} = React.useContext(AuthContext);

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    })

    const textInputChange = (val) => {
        if (val.length == 8) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        }
        else
        {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            })
        }
    }


    const handlePasswordChange = (val) => {
        if( val.trim().length !== 0 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const loginHandle = (userName, password) => {

        const foundUser = User.filter( item => {
            return userName == item.DNI && password == item.Contraseña;
        } );

        if (data.password.length == 0 ) {
            Alert.alert('Error de Inicio de Sesión', 'Ingrese su contraseña.', [
                {text: 'Ok'}
            ]);
            return;
        }

        if ( foundUser.length == 0 ) {
            Alert.alert('Error de Inicio de Sesión', 'Dni o contraseña incorrectos.', [
                {text: 'Ok'}
            ]);
            return;
        }
        signIn(foundUser);
    }

    return (
        <View style={styles.logScreen}>

            <Text style = {styles.textScreen}>
                CERRADURA AUTOMÁTICA
            </Text>

            <View style={styles.action}>
                <FontAwesome style = {{alignSelf: 'center'}}
                    name="user-o"
                    color="#041C32"
                    size={20}
                />
                <TextInput
                    placeholder= 'DNI'
                    style = {styles.textInput}
                    onChangeText = {(val) => textInputChange(val)}
                />
                {data.check_textInputChange ?
                        <Animatable.View style = {{alignSelf: 'center', marginRight: 10}}
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="#041C32"
                                size={25}
                            />
                        </Animatable.View>
                : null}
            </View>

            <View style={styles.action}>
                <Feather style = {{alignSelf: 'center'}}
                    name="lock"
                    color="#041C32"
                    size={20}
                />
                <TextInput
                    placeholder = 'Contraseña'
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style = {styles.textInput}
                    autoCapitalize='none'
                    onChangeText = {(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity style = {{alignSelf: 'center', marginRight: 9}}
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="#041C32"
                        size={25}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="#041C32"
                        size={25}
                    />
                    }
                </TouchableOpacity>
            </View>

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
        flex: 1,
        padding: 10,
        fontSize: 17
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
    },
    action: {
        flexDirection: 'row',
        marginTop: 35,
        backgroundColor: '#ECB365',
        borderRadius: 10,
        padding: 10
    },
})

export default InicioSesion