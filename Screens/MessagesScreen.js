import React, { Component } from 'react'
import { Text,View, Button, StyleSheet , ScrollView ,FlatList} from 'react-native'
import {
    Container,
    Card,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    UserName,
    PostTime,
    MessageText,
    TextSection,
} from '../styles/MessageStyles'
const Messages = [
    {
        id: '1',
        userName: 'jhonny deb',
        userImg: require('../assets/users/user.png'),
        messageTime: '4 mins ago',
        MessageText: 'hey there'
    },
    {
        id: '2',
        userName: 'poojan pathak',
        userImg: require('../assets/users/user.png'),
        messageTime: '10 mins ago',
        MessageText: 'hello, its poojan here can you please reply me'
    },
    {
        id: '3',
        userName: 'prianca',
        userImg: require('../assets/users/user.png'),
        messageTime: '5 mins ago',
        MessageText: 'Fuck off, you Loser'
    },
];

const MessagesScreen = ({navigation}) => {
        return (
            <Container>
              <FlatList
                data={Messages}
                keyExtractor={item=>item.id}
                renderItem={({item}) => (
                    <Card onPress={() => navigation.navigate('Chat',{userName: item.userName})}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={item.userImg} />
                            </UserImgWrapper>
                            <TextSection>
                                <UserInfoText>
                                    <UserName>{item.userName}</UserName>
                                    <PostTime>{item.messageTime}</PostTime>
                                </UserInfoText>
                                <MessageText>{item.MessageText}</MessageText>
                            </TextSection>
                        </UserInfo>    
                    </Card>
                )}
              />
            </Container>
        );
}

export default MessagesScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
    },
})
