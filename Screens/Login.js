import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Platform} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider.android';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { login , googleLogin , fbLogin } = useContext( AuthContext );

    return(
        <View style={styles.container}>
            <Image
            source={require('../assets/instagram.png')}
            style={styles.logo}
             />
            <Text style={styles.text}>Social App</Text>
            <FormInput
                lableValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autocorrect={false}
            />
            <FormInput
                lableValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <FormButton 
                buttonTitle="Sign In"
                onPress={() => login(email, password)}
            />
                <TouchableOpacity style={styles.forgotButton} onPress={() => alert('Terms Clicked!')}>
                    <Text style={styles.navButtonText}>Forgot Password?</Text>
                </TouchableOpacity>
                
                {Platform.OS === 'android'?(
                <View style={{width:'100%',}}>
                    <SocialButton 
                    buttonTitle="Sign In with Facebook"
                    btnType="facebook"
                    color="#4867aa"
                    backgroundColor="#e6eaf4"
                    onPress={() => fbLogin() }
                    />
                    <SocialButton 
                    buttonTitle="Sign In with Google"
                    btnType="google"
                    color="#de4d41"
                    backgroundColor="#f5e7ea"
                    onPress={() => googleLogin() }
                    /> 
                 </View>
                 ): null
                 }

                <TouchableOpacity style={styles.forgotButton} 
                onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.navButtonText}>
                        Don't have an account?Create here</Text>
                </TouchableOpacity>
                       
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode:'cover',
    },
    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color:'#2e64e5',
        fontFamily: 'Lato-Regular',
    },
    socialbtn:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
})