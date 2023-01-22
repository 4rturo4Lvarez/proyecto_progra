import { TouchableOpacity, StyleSheet, Image, View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import openDoor from '../assets/candado-abierto.png'
import closeDoor from '../assets/candado-cerrado.png'
import engranaje from '../assets/engranaje.png'
import info from '../assets/info.png'

import Layout from '../components/Layout'

import { abrirPuerta } from '../api'
import { getPermissions } from '../api';

const PantallaPrincipal = ({ route, navigation }) => {

    const [ipSelected, setIpSelected] = useState(false)

    const [permissionsCode, setPermissionsCode] = useState([]);

    const getPermissionsCodes = async() => {
        let DNI = await AsyncStorage.getItem('userToken')

        const data = await getPermissions(DNI)

        let codes = data.map(x => {
            return x.Espacios_CODIGO
        })
        
        setPermissionsCode(codes)
    }

    const [statusButton, setStatus] = useState(false);  //Crea la constante que almacenara el valor del estado del boton

    let updateImage = async() => {
        //Si el valor inicial es false, cambia a true
        if (statusButton === false) {
            
            setStatus(true);

            if (route.params)
            {
                try {
                    //Se ejecuta el comando para abrir la puerta con la ip seleccionada
                    await abrirPuerta(route.params.ip);
                }
                catch(e){
                    //Si no se logra completar la solicitud u ocurre algun error, se muestra por consola
                    console.log(e, 'ip:', route.params.ip);
                }
            } 
            else    //Si aun no se selecciona una ip
            {
                try {
                    //Se ejecuta el comando para abrir la puerta con el localhost
                    await abrirPuerta('localhost');
                }
                catch(e){
                    //Si no se logra completar la solicitud con el localhost, se muestra por consola
                    //console.log(e, 'Localhost');
                }
            }
            
        }
        else {
            //caso contrario, continua siendo el valor false
            setStatus(false);
        }
    }

    const sendPermissions = () => {
        navigation.navigate({
            name: 'Espacios del Usuario',
            params: {permissions: permissionsCode},
            merge: true
        });
    };

    useEffect(() => {

        getPermissionsCodes();

        if (route.params && route.params?.selectedStatus)
        {
            setIpSelected(route.params.selectedStatus)
        }

    }, [route.params?.selectedStatus])

    return (
        <Layout>
            <View
                style={{
                    flexDirection: 'row-reverse',
                    marginTop: 40,
                    alignSelf: 'center'
                  }}
            >
                <TouchableOpacity
                    onPress= { () => {
                        navigation.navigate('Configuración')
                    }}
                    style={{marginLeft: '70%'}}
                >
                    <Image
                        style={styles.optionsButton}
                        source={engranaje}
                    />
                
                </TouchableOpacity>

                <TouchableOpacity
                    onPress = {() => {
                        sendPermissions();
                    }}
                >
                <Image
                    style={styles.placesButton}
                    source = {info}
                />
                </TouchableOpacity>
            </View>

            {
                ipSelected?
                <View
                    style={{
                        marginTop: 30,
                        marginHorizontal: 20
                }}>
                    <Text style={styles.textSelectedPlace}>
                        Espacio Seleccionado: {route.params.Nombre}
                    </Text>
                </View>
                :
                <View 
                    style={{
                        marginTop: 35,
                        marginHorizontal: 20
                }}>

                    <Text style={styles.textSelectedDefault}>
                        Seleccione una puerta en el apartado de Espacios del Usuario.
                    </Text>
                </View>
            }

            <TouchableOpacity
                style={{marginTop: '15%', borderRadius: 160}}
                onPressIn={updateImage}
                onPressOut={updateImage}
            >
                <Image
                    style={styles.imageButton}
                    source={
                        statusButton === true
                            ? openDoor
                            : closeDoor
                    }
                />
            </TouchableOpacity>
        </Layout>
    )
}

const styles = StyleSheet.create({

    textButton: {
        color: '#ECB365',
        textAlign: 'center',
    },

    imageButton: {
        backgroundColor: '#064663',
        alignSelf: 'center',
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 2,
        borderColor: '#ECB365',
        resizeMode: 'contain'
    },

    optionsButton: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },

    placesButton: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },

    textSelectedDefault: {
        color: '#ECB365',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    textSelectedPlace: {
        color: '#ECB365',
        fontSize: 30,
        textAlign: 'center'
    }
})

export default PantallaPrincipal