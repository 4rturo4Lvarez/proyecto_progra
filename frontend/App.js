import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack"

import InicioSesion from "./screens/InicioSesion";
import PantallaPrincipal from "./screens/PantallaPrincipal";
import Configuracion from "./screens/Configuracion";
import Espacios from "./screens/Espacios";
import { View } from "react-native";
import { ActivityIndicator } from "@react-native-material/core";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "./components/context";

const Stack = createStackNavigator()

const App = () => {

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
    signIn: async(foundUser) => {

      const userName = foundUser[0].username;
      const userToken = String(foundUser[0].DNI);
      
      try {

        await AsyncStorage.setItem('userToken', userToken);

      }
      catch(e) {

        console.log(e);

      }
      //console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
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
              options={{headerShown: false}}
            />

            <Stack.Screen
              name = "Configuración"
              component={Configuracion}

              options={{
                headerStyle: { backgroundColor: '#ECB365'},
                headerTitleStyle: { color: '#041C32'},
                headerTitleAlign: 'center'
              }}
            />

            <Stack.Screen
              name = "Espacios del Usuario"
              component={Espacios}
              
              options={{
                headerStyle: { backgroundColor: '#ECB365'},
                headerTitleStyle: { color: '#041C32'},
                headerTitleAlign: 'center'
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