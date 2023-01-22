import { FlatList, RefreshControl} from 'react-native'
import React, {useState, useEffect } from 'react'

import  PermissionItem from "./PermissionItem";

import { getPlaces } from '../api';

const PermissionsList = ({codes}) => {

    const [refresing, setRefresing] = useState(false)

    const [permissionsData, setPermissionsData] = useState([]);

    const filterByCode = (Data) => {
        let length = codes.length

        const codesFind = Data.filter((element) => {
            for (let i = 0; i < length; i++){
            if(element.CODIGO == codes[i] && element.IP != element.CODIGO)
                return element
            }
        })

        setPermissionsData(codesFind)
    }

    const getPermissionsData = async() => {

        const data = await getPlaces();

        filterByCode(data);
    };

    useEffect( () => {
        getPermissionsData()
    }, [])

    const renderItem = ({item}) => {
        return <PermissionItem permission={item}/>;
    }

    const onRefresh = React.useCallback( () => {

        setRefresing(true);

        getPermissionsData();

        setRefresing(false);

    })

    return (
        <FlatList style={{ width: '100%'}}

            data={permissionsData}
            renderItem={renderItem}

            refreshControl={

                <RefreshControl
                    colors={['#ECB365']}
                    progressBackgroundColor={'#04293A'}

                    onRefresh={onRefresh}
                    refreshing={refresing}
                />
            }
        />
    )
}

export default PermissionsList