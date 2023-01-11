import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack"

import InicioSesion from "./screens/InicioSesion";
import PantallaPrincipal from "./screens/PantallaPrincipal";
import Configuracion from "./screens/Configuracion";
import Espacios from "./screens/Espacios";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { ActivityIndicator } from "@react-native-material/core";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "./components/context";

import { getUsers } from "./api";

import engranaje from './assets/engranaje.png'

const Stack = createStackNavigator()

const handleUser = async(dni) => {
  try {
    await AsyncStorage.setItem('userLogin', dni);
  }

  catch(e){
    console.log(e);
  }
}

const App = () => {

  const [data, setData] = React.useState({})

  const loadUsers = async () => {     //HACEMOS LA PETICION DE LOS USUARIOS
    const Users = await getUsers()
    setData(Users)
    console.log('Peticion realizada')
  }
  
  useEffect(() => {
      loadUsers()
  }, [])

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {

      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };

      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };

      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
  }};

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(username, password) => {

      let userToken;
      userToken = null;

      let length = data.length
      console.log(length)

      for (let i = 0; i < length; i++){

        if (username == data[i].DNI && password == data[i].Contraseña) {

          try {
            handleUser(username);
            userToken = "tokenDeUsuario"
            await AsyncStorage.setItem('userToken', userToken);
          }

          catch(e){
            console.log(e);
          }
        }
        else {continue;}
      }

      dispatch({ type: 'LOGIN', id: username, token: userToken });
    },

    signOut: async() => {

      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userLogin');
      }
      catch(e){
        console.log(e);
      }

      dispatch({ type: 'LOGOUT' });
    }
  }), []);
  
  useEffect(() => {
    setTimeout( async() => {

      let userToken;
      userToken = null;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      }
      catch(e){
        console.log(e);
      }

      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return(
      <View style = {{
        backgroundColor: '#041C32',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size='large' color='#ECB365'/>
      </View>
    )
  }

  return(
    <AuthContext.Provider value={authContext}>

      <NavigationContainer>

        {loginState.userToken !== null ? (
          <Stack.Navigator>

            <Stack.Screen 
              name = "CERRADURA"
              component={PantallaPrincipal}
              options={({ navigation }) => ({
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: '#041C32'},
                headerTitleStyle: { color: '#ECB365'},

                headerRight: () => (
                  <TouchableOpacity
                    onPress = {() => navigation.navigate('Configuración')}
                  >
                    <Image
                      style={{width: 32, height: 32, marginRight: 20}}
                      source = {engranaje}
                    />
                  </TouchableOpacity>
                ),

                // headerLeft: () => (
                //   <TouchableOpacity
                //     onPress = {() => navigation.navigate('Espacios del Usuario')}
                //   >
                //     <Image
                //       style={{width: 32, height: 32, marginLeft: 20}}
                //       source = {engranaje}
                //     />
                //   </TouchableOpacity>
                // ),

              })}
            />

            <Stack.Screen
              name = "Configuración"
              component={Configuracion}

              options={{
                headerStyle: { backgroundColor: '#041C32'},
                headerTitleStyle: { color: '#ECB365'},
                headerTitleAlign: 'center'
              }}
            />

            <Stack.Screen
              name = "Espacios del Usuario"
              component={Espacios}
              
              options={{
                headerStyle: { backgroundColor: '#041C32'},
                headerTitleStyle: { color: '#ECB365'},
              }}
            />

          </Stack.Navigator>
        )
        :
          <InicioSesion/>
      }
        
      </NavigationContainer>

    </AuthContext.Provider>
  );
}

export default App;