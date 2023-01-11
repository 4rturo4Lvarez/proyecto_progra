import { createGlobalState } from "react-hooks-global-state";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { setGlobalState, useGlobalState } = createGlobalState({
    userLogin: ''
});


const getData = async() => {
    try {
        const value = await AsyncStorage.getItem('userLogin')

        if(value !== null){
            setGlobalState('userLogin', value)
            console.log(value);
        }
    }
    catch(e) {
        console.log(e);
    }
}

export { useGlobalState, setGlobalState, getData };