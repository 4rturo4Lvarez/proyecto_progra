import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

const PermissionItem = ({permission}) => {

    const navigation = useNavigation();

    const sendData = () => {
        navigation.navigate({
            name: 'CERRADURA',
            params: {
                Nombre: permission.Nombre,
                ip: permission.IP,
                selectedStatus: true
            }
        })
    }

    return (
        <View style={styles.PermissionContainer}>

            <View>
                <Text style={styles.placeName}>
                    {permission.Nombre.toUpperCase()}
                </Text>

                <Text style={styles.placeIP}>
                    IP: {permission.IP}
                </Text>
            </View>

            <View>
                <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => {
                        sendData();
                    }}
                >

                    <Text style={styles.textButton}>
                        {`Seleccionar${'\n'}Puerta`}
                    </Text>

                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    PermissionContainer: {
        backgroundColor: '#064663',
        borderColor: '#04293A',
        borderWidth: 1,
        borderRadius: 12,
        padding: 20,
        marginVertical: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    placeName: {
        color: '#ECB365',
        fontSize: 18,
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 5
    },
    
    placeIP: {
        color: '#ECB365',
        fontSize: 20,
        textAlign: 'left',
    },
    
    selectButton: {
        padding: 10,
        backgroundColor: '#ECB365',
        borderWidth: 1,
        borderColor: '#04293A',
        borderRadius: 10
    },

    textButton: {
        color: '#041C32',
        fontSize: 15,
        textAlign: 'center'
    }

})

export default PermissionItem