import { View, StyleSheet } from 'react-native'
import React from 'react'

const Layout = ({children}) => {
    return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#041C32',
        padding: 20,
        flex: 1,
        alignItems: 'center'
    }
})

export default Layout