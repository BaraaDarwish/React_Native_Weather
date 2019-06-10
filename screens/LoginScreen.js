import React from 'react';

import firebase from "firebase";
import  { 
    ActivityIndicator
    ,StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Dimensions,
    TouchableHighlight,
    Image,
    Alert
    } from 'react-native';

import Firebase from '../components/Firebase';
export default class LoginScreen extends React.Component {

    state = {
        email:"",
        password:"",
        authenticated:false,
    }


  static navigationOptions = {
    title: 'app.json',
  }
  buttonClickListener(){
    var that = this;
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() =>{
      that.props.navigation.navigate("App");
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      // ...
    });
    
  };
  registerClickListener = () => {
    this.props.navigation.navigate("Register");
  };
  componentWillMount(){
    this.setState({authenticated:false});
    var that = this;
    if (!firebase.apps.length) {
    Firebase.init();
    }
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        that.props.navigation.navigate("App");
      } else {
        that.setState({authenticated:true});
      }
     
    });
    
  }

renderCurrentState(){
if (!this.state.authenticated)
    return(
        <View>
            <ActivityIndicator size="large" color="white"/>
         
        </View>
    )
else
    return(
        <View>
        <Text style={styles.titleText}>Please Enter Your Credentials</Text>
        
  
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.buttonClickListener()}>
          <Text style={styles.signUpText}>Login</Text>
        </TouchableHighlight>
        <Text style={styles.titleText}>not a member yet? register here</Text><Text/>
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.registerClickListener}>
          <Text style={styles.signUpText}>Register</Text>
        </TouchableHighlight>
        
        </View>
    );

}

  render() {
    return (
        <View style={styles.container}>
          <Image source={require("../assets/images/back.jpg")} 
       style={[styles.fixed, styles.back, {zIndex: -1}]}></Image>
      {this.renderCurrentState()}
        </View>
      );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    signupButton: {
      backgroundColor: "#FFFFFF",
    },
    signUpText: {
      color: 'black',
      textAlign:"center",
      
    },
    titleText:{
      color: 'white',
      textAlign:"center",
      margin:15
    },
    fixed: {
      flex:1,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    back:{
      width: Dimensions.get("window").width, //for full screen
      height: Dimensions.get("window").height //for full screen
    },
  });