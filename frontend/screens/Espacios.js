import React, { useEffect } from 'react';

import Layout from '../components/Layout';
import PermissionsList from "../components/PermissionsList";

const Espacios = ({route}) => {

    useEffect(() => {
        if (route.params?.permissions)
        {
            console.log(route.params);
        }
    }, [route.params?.permissions])

    return (
        <Layout>
            <PermissionsList codes = {route.params?.permissions}/>
        </Layout>
    );
};

export default Espacios