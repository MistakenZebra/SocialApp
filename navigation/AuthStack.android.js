import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Register from '../Screens/Register';
import Login from '../Screens/Login';
import onboardingScreen from '../Screens/OnboardingScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

const AuthStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    let routeName;

    useEffect( () => {
        AsyncStorage.getItem('alreadyLaunched').then((value) => {
            if(value == null) {
                AsyncStorage.setItem('alreadyLaunched', 'true');
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        });
        
        GoogleSignin.configure({
            webClientId: '135083318369-3rt6obdt1986lae1kqpsh6e3c20ou73r.apps.googleusercontent.com',
          });
    
    
    
    }, []);

    if(isFirstLaunch === null){
        return null;
    } else if (isFirstLaunch == true) {
        routeName = 'onboarding';
    } else {
        routeName = 'Login'
    }

    return(
        <Stack.Navigator initialRouteName={routeName}>
            <Stack.Screen
                name="Onboarding"
                component={onboardingScreen}
                options={{header: () => null}}
            />
            <Stack.Screen 
                name="Login"
                component={Login}
                options={{header: () => null}}
            />
            <Stack.Screen 
            name='Signup' 
            component={Register}
            options={({navigation}) => ({
                title: '',
                headerStyle: {
                    backgroundColor: '#f9fafd',
                    shadowColor: '#f9fafd',
                    elevation: 0,
                },
                headerLeft: () => (
                    <View style={{marginLeft: 10}}>
                        <FontAwesome.Button
                            name="long-arrow-left"
                            size={25}
                            backgroundColor="#f9fafd"
                            color="#333"
                            onPress={() => navigation.navigate('Login')}
                        />
                    </View>
                ),
            })} />
        </Stack.Navigator>
    );
}

export default AuthStack;