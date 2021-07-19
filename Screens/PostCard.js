import AppLoading from 'expo-app-loading';
import * as React from 'react';
import { Text, View, StyleSheet, Platform, StatusBar,Image, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons'
import firebase from 'firebase';

let custom_font = {'Bubblegum-Sans':require('../assets/fonts/BubblegumSans-Regular.ttf')}

export default class PostCard extends React.Component{
    constructor(){
        super();
        this.state = {
            fontsLoaded: false,
            lightTheme: true,
//            post_data: this.props.post,
            isLiked: false,
            likes: 0,
        };
    }

    likeAction(){
        if(this.state.isLiked===false){
            this.setState({likes: this.state.likes+1, isLiked: true})
        }else if(this.state.isLiked===true){
            this.setState({likes: this.state.likes-1, isLiked: false})
        }
    }

    fetchUser = async ()=>{
        let theme;
        await firebase.database().ref("/users/"+firebase.auth().currentUser.uid).on("value",(snapshot)=>{
            theme = snapshot.val().current_theme;
            this.setState({lightTheme: theme==="light"?true:false});
        })
     }
    async loadFonts(){
        await Font.loadAsync(custom_font);
        this.setState({fontsLoaded: true});
    }

    componentDidMount(){
        this.loadFonts();
        this.fetchUser();
    }

    lik

    render(){
        console.log(this.props.post.value.likes);
//        let post = this.state.post_data;
        if(! this.state.fontsLoaded){
            return <AppLoading />
        }
        else{
            let images = {
                "image_1": require('../assets/image_1.jpg'),
                "image_2": require('../assets/image_2.jpg'),
                "image_3": require('../assets/image_3.jpg'),
                "image_4": require('../assets/image_4.jpg'),
                "image_5": require('../assets/image_5.jpg'),
                "image_6": require('../assets/image_6.jpg'),
                "image_7": require('../assets/image_7.jpg'),
            }
            let profilePic = this.props.post.value.author_profileImg;
            return(
                <TouchableOpacity style = {styles.container} onPress = {()=>{this.props.navigation.navigate('PostScreen', {post: this.props.post})}}>
                    <View style = {this.state.lightTheme?styles.cardContainerLight : styles.cardContainer}>
                        <View style = {this.state.lightTheme?styles.profileLight:styles.profile}>
                        <Image source = {profilePic} style = {styles.profileImage} />
                        <Text style = {[this.state.lightTheme?styles.titleTextLight:styles.titleText, {marginLeft: 60, bottom: 50}]}>
                                {this.props.post.value.author}
                        </Text>
                        </View>
                        <Image source = {images[this.props.post.value.previewImage]} style = {styles.postImg} />
                        <View style = {styles.titleContainer}>
                            <Text style = {this.state.lightTheme?styles.titleTextLight:styles.titleText}>
                                {this.props.post.value.title}
                            </Text>
                            
                            <Text style = {this.state.lightTheme?styles.captionTextLight:styles.captionText}>
                                {this.props.post.value.caption}
                            </Text>
                        </View>
                        <View style = {styles.actionContainer}>
                            <TouchableOpacity onPress = {()=> this.likeAction()} style = {this.state.isLiked?styles.likeButtonLight : styles.likeButtonDark}>
                                <Ionicons name = {"heart"} size = {RFValue(25)} color = "white" />
                                    <Text style = {styles.likeText}>
                                        {this.state.likes}
                                    </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%'
    },
    safeView: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row"
    },
    profile:{
        height: 60,
        borderRadius: 20,
        backgroundColor: '#272C59'
    },
    profileLight:{
        height: 60,
        borderRadius: 20,
        backgroundColor: '#bfc2e0'
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    postImg: {
      width: "95%",
      height: RFValue(275),
      resizeMode: "contain",
      alignSelf:"center",
      borderRadius: 60
    },
    titleContainer: {
      paddingLeft: RFValue(20),
      justifyContent: "center"
    },
    titleText: {
      color: "white",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
    },
    titleTextLight: {
        color: "black",
        fontSize: RFValue(28),
        fontFamily: "Bubblegum-Sans"
      },
    cardContainer: {
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#15193c",
        padding: 10,
        borderRadius: 20,
        height: undefined,
    },
    cardContainerLight: {
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#d5d8f0",
        padding: 10,
        borderRadius: 20,
        height: undefined,
        shadowColor: 'rgb(0,0,0)',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 2,
      },
    cardContainerLight: {
        marginTop: -20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 20,
        height: undefined,
        shadowColor: 'rgb(0,0,0)',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
      },
    actionContainer:{
        justifyContent:"center",
        alignItems: "center",
        padding: RFValue(10),
    },
    likeButtonDark:{
        width: RFValue(150),
        height:RFValue(40),
      //  bottom: 90,
        justifyContent:"center",
        alignItems:"center",
        borderRadius: RFValue(30),
        flexDirection:"row",
        backgroundColor:"gray"
    },
    likeButtonLight:{
        width: RFValue(150),
        height:RFValue(40),
//        bottom: 12,
        justifyContent:"center",
        alignItems:"center",
        borderRadius: RFValue(30),
        flexDirection:"row",
        backgroundColor:"#eb3948"
    },
    likeText:{
        color:"white",
        fontFamily:"Bubblegum-Sans",
        fontSize:RFValue(25),
        marginLeft: RFValue(5),
    },
    captionText:{
        color:"white",
        fontFamily:"Bubblegum-Sans",
        fontSize:RFValue(25),
        paddingTop: RFValue(10),
        marginTop: -20,
    },
    captionTextLight:{
        color:"black",
        fontFamily:"Bubblegum-Sans",
        fontSize:RFValue(25),
        paddingTop: RFValue(10)
    },
    profileImage: {
        width: 48,
        height: 48,
        bottom: -2,
        resizeMode: "contain"
    }
  });