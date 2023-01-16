import { Text } from 'react-native';

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

import {getPermissions} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Espacios = () => {

    const [permissions, setPermissions] = useState([]);

    const loadPermissions = async() => {
        const DNI = await AsyncStorage.getItem('userToken')

        const data = await getPermissions(DNI)
    }

    useEffect(() => {
      loadPermissions()
    }, [])

    return (
        <Layout>
            <Text>HOLAAAA</Text>
        </Layout>
    )
}

export default Espacios