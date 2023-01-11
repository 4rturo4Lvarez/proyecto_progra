import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'

import { AuthContext } from '../components/context'

const Configuracion = () => {

    const { signOut } = React.useContext(AuthContext);

    return (
        <Layout>
            <TouchableOpacity style={styles.button}
                //onPress={}
            >
                <Text style={styles.textButton}>Cambiar Contraseña</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
                onPress={() => {signOut()}}
            >
                <Text style={styles.textButton}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </Layout>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#064663',
        padding: 20,
    },
    textButton: {
        color: '#ECB365',
        textAlign: 'center'
    },
})

export default Configuracion