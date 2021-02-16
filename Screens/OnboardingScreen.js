import React from 'react'
import { View, Text, Button, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Onboarding from 'react-native-onboarding-swiper';


const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return(
        <View
            style={{
                width:5,
                height:5,
                marginHorizontal: 3,
                backgroundColor
            }}
        
        />
    )
}
const Skip = ({...props}) => (
    <Button
        title='Skip'
        color="#000000"
    />
);
const Next = ({...props}) => (
    <Button
        title='Next'
        color="#000000"
        {...props}
    />
);
const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
       <Text style={{fontSize: 16}}>Done</Text> 
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            onSkip={() => navigation.replace('Login')}
            onDone={() => navigation.navigate('Login')}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/instagram.png')} resizeMode='center' />,
                    title: 'Onboarding image',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/instagram.png')} resizeMode='center'  />,
                    title: 'Onboarding image 2',
                    subtitle: 'A New Way To Connect With The World',
                },
            ]}


        />
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});