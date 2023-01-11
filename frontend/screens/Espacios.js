import { View, Text } from 'react-native'

import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useGlobalState } from '../components/user'

const Espacios = () => {

    const dni = useGlobalState('userLogin');

    const [URL, setURL] = useState('');

    const handleURL = async() => {
        console.log(dni);
        const newURL = 'http://192.168.3.11:3000/permissions/' + dni[0]
        setURL(newURL);
        console.log(URL);
    }

    const loadPermission = async () => {
        const res = await fetch(URL)
        const data = await res.json()
        console.log(data);
    }

    useEffect(() => {
        handleURL(),
        loadPermission();
    }, [])

    return (
        <Layout>
            <Text>HOLAAAA</Text>
        </Layout>
    )
}

export default Espacios