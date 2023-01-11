import { TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import openDoor from '../assets/candado-abierto.png'
import closeDoor from '../assets/candado-cerrado.png'
import Layout from '../components/Layout'

import { getData } from '../components/user'

import { abrirPuerta } from '../api'

const PantallaPrincipal = () => {

    useEffect(() => {
        getData()
    }, [])

    const [statusButton, setStatus] = useState(false);  //Crea la constante que almacenara el valor del estado del boton

    let updateImage = () => {
        if (statusButton === false) {   //Si el valor inicial es false, cambia a true
            setStatus(true);
            abrirPuerta();
        }
        else {
            setStatus(false);   //caso contrario, continua siendo el valor false
        }
    }

    return (
        <Layout>
            <TouchableOpacity
                style={{marginTop: '30%'}}
                onPressIn={updateImage}     //Al presionarse cambia el estado a true y se muestra la imagen openDoor
                onPressOut={updateImage}    //Al dejar de presionarse cambia el estado a false
            >
                <Image
                    style={styles.imageButton}
                    source={
                        statusButton === true
                            ? openDoor          //Si el boton esta presionado, se muestra la imagen de la cerradura abierta
                            : closeDoor         //Caso contrario, la imagen por defecto de la cerradura cerrada
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
        marginTop: 20,
        borderRadius: 150,
        borderWidth: 2,
        borderColor: '#ECB365',
        resizeMode: 'contain'
    }
})

export default PantallaPrincipal