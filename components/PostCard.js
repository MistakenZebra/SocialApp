import React, {useContext, useState, useEffect} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {  
    Card, 
    UserImg, 
    UserInfo, 
    UserName, 
    UserInfoText, 
    PostTime,
    PostText,
    PostImg,
    IntercationWrapper,
    Interaction,
    InteractionText, 
    Divider} from '../styles/FeedStyles';
import { AuthContext } from '../navigation/AuthProvider.android';
import moment from 'moment';
import Progressiveimage from './Progressiveimage';
import { TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';


const PostCard = ({item, onDelete , onPress}) => {
    const {user, logout} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);


    likeIcon = item.liked ? 'heart' : 'heart-outline';
    likeIconColor = item.liked ? '#2e64e5' : '#333';

    if(item.likes == 1) {
        likeText = '1 Like';
    } else if  (item.likes > 1) {
        likeText= item.likes + ' Likes';
    } else {
        likeText = 'Like';
    }

    if(item.comments == 1) {
        commentText = '1 Comment';
    } else if  (item.comments > 1) {
        commentText= item.comments + ' Comments';
    } else {
        commentText = 'Comment';
    }

    const getUser = async() => {
        await firestore()
        .collection('users')
        .doc(item.userId)
        .get()
        .then((documentSnapshot) => {
            if(documentSnapshot.exists) {
                console.log('User Data', documentSnapshot.data());
                setUserData(documentSnapshot.data());
            }
        })
    
    }

    useEffect(() => {
        getUser();
    }, []);

    return(
            <Card>
                <UserInfo>
                    <UserImg source={{uri: userData ? userData.userImg || 
                        'https://static.asianetnews.com/img/default-user-avatar.png':
                        'https://static.asianetnews.com/img/default-user-avatar.png',
                        }} />
                    <UserInfoText>
                        <TouchableOpacity onPress={onPress}>
                            <UserName>{userData ? userData.fname || 'Test' : 'Test'} {userData ? userData.lname || 'User' : 'User'}</UserName>
                        </TouchableOpacity>
                        <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
                    </UserInfoText>
                </UserInfo>
                <PostText>{item.post}</PostText>
                {/* {item.postImg !== 'null' ? <PostImg source={{uri: item.postImg}} /> : <Divider />} */}
                {item.postImg !== 'null' ? (
                    <Progressiveimage
                        defaultImageSource={require('../assets/default-image.png')}
                        source={{uri: item.postImg}}
                        style={{width: '100%', height: 250}}
                        resizeMode='cover'
                    />
                 ) : <Divider />}
                <IntercationWrapper>
                    <Interaction active={item.liked}>
                        <Ionicon name={likeIcon} size={25} color={likeIconColor} />
                        <InteractionText active={item.liked}>{likeText}</InteractionText>
                    </Interaction> 
                    <Interaction>
                        <Ionicon name='md-chatbubble-outline' size={25} />
                        <InteractionText>{commentText}</InteractionText>
                    </Interaction> 
                    {user.uid == item.userId ?
                    <Interaction onPress={() => onDelete(item.id) }>
                        <Ionicon name='md-trash-bin' size={25} />
                    </Interaction>
                    :null}
                </IntercationWrapper>
            </Card>   
    );
};

export default PostCard;