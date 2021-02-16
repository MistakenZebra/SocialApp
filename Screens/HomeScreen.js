import React,{useEffect,useState}from 'react';
import {StyleSheet ,FlatList , SafeAreaView , Alert , ScrollView , View} from 'react-native';
import FormButton from '../components/FormButton';
import firestore from '@react-native-firebase/firestore';
import Ionicon from 'react-native-vector-icons/Ionicons';
import PostCard from '../components/PostCard';
import storage from '@react-native-firebase/storage';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { 
    Container, 
 } from '../styles/FeedStyles';
 

const HomeScreen = ({navigation}) => {
//const {user, logout} = useContext(AuthContext);
const [posts, setPosts] = useState(null);
const [loading, setLoading] = useState(true);
const [deleted, setDeleted] = useState(false);
const fetchPosts = async() => {
    try{
        const list = [];
        await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
            console.log('Total Posts:',querySnapshot.size);

            querySnapshot.forEach( doc => {
                const {userId,post, postImg , postTime , likes ,comments} = doc.data();
                 list.push({
                     id: doc.id,
                     userId,
                     userName: 'Steve jobs',
                     userImg: require('../assets/users/user.png'),
                     postTime,
                     post,
                     postImg ,
                     liked: false,
                     likes,
                     comments
                 });
            })
        })
        setPosts(list);
        if(loading) {
            setLoading(false);
        }
     console.log('Posts:', list);
    } catch(e) {
        console.log(e);
    }
}
    useEffect(() => {
       fetchPosts();
    }, [])
    
    useEffect(() => {
        fetchPosts();
        setDeleted(false);
    }, [deleted])

    const handleDelete = (postId) => {
        Alert.alert(
            'Delete Post',
            'Are you Sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed!'),
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: () => deletePost(postId),
                }
            ],
            {cancelable: false}
        );
    }

    const deletePost = (postId) => {
        console.log('Current Post Id: ',postId);
        firestore().collection('posts')
        .doc(postId)
        .get()
        .then(documentSnapshot => {
            if(documentSnapshot.exists) {
                const {postImg} = documentSnapshot.data();

                if( postImg !== null) {
                    const storageRef = storage().refFromURL(postImg);
                    const imageRef = storage().ref(storageRef.fullPath);

                    imageRef
                    .delete()
                    .then( () => {
                       console.log(`${postImg} has been deleted successfully.`);
                       deleteFirestoreData(postId); 
                       setDeleted(true);
                    })
                    .catch((e) => {
                        console.log('Error while deleting Image',e);
                    })
                } else {
                    deleteFirestoreData(postId);
                }
            }
        })
    }

    const deleteFirestoreData = (postId) => {
        firestore()
        .collection('posts')
        .doc(postId)
        .delete()
        .then(() => {
            Alert.alert(
                'Post deleted!',
                'Your post has been deleted Successfully!',
            );
        })
        .catch((e) => {
            console.log('error while deleting data from Firestore',e);
        })
    }
    const ListHeader = () => {
        return null;
    }
    return(
    <SafeAreaView style={{flex:1}}>
        {loading ?
           <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:'center'}}>
           <SkeletonPlaceholder>
           <View style={{ flexDirection: "row", alignItems: "center" }}>
             <View style={{ width: 60, height: 60, borderRadius: 50 }} />
             <View style={{ marginLeft: 20 }}>
               <View style={{ width: 120, height: 20, borderRadius: 4 }} />
               <View
                 style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
               />
             </View>
           </View>
           <View style={{marginTop: 10, marginBottom: 30}}>
               <View style={{width: 300, height: 20, borderRadius: 4}} />
               <View style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}} />
               <View style={{marginTop: 6, width: 350, height: 200, borderRadius: 4}} />
           </View>
         </SkeletonPlaceholder>
           <SkeletonPlaceholder>
           <View style={{ flexDirection: "row", alignItems: "center" }}>
             <View style={{ width: 60, height: 60, borderRadius: 50 }} />
             <View style={{ marginLeft: 20 }}>
               <View style={{ width: 120, height: 20, borderRadius: 4 }} />
               <View
                 style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
               />
             </View>
           </View>
           <View style={{marginTop: 10, marginBottom: 30}}>
               <View style={{width: 300, height: 20, borderRadius: 4}} />
               <View style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}} />
               <View style={{marginTop: 6, width: 350, height: 200, borderRadius: 4}} />
           </View>
         </SkeletonPlaceholder>
         </ScrollView> :
        <Container>
           <FlatList 
                data={posts}
                renderItem={({item}) => (
                <PostCard item={item} onDelete={handleDelete} onPress={() => navigation.navigate('HomeProfile', {userId: item.userId})} />
                    )}
                keyExtractor={item => item.id}
                ListHeaderComponent={ListHeader} 
                ListFooterComponent={ListHeader}
                showsVerticalScrollIndicator={false}
                />
        </Container>
            }
     </SafeAreaView>
    )
}

export default HomeScreen;
