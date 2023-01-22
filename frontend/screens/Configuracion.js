import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'

import { AuthContext } from '../components/context'

const Configuracion = () => {

    const { signOut } = React.useContext(AuthContext);

    return (
        <Layout>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {signOut()}}
            >
                <Text
                    style={styles.textButton}
                >
                    Cerrar Sesión
                </Text>
            </TouchableOpacity>

        </Layout>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#064663',
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginVertical: 35,
        borderRadius: 20,
    },
    textButton: {
        color: '#ECB365',
        textAlign: 'center',
        fontSize: 20
    },
})

export default Configuracion