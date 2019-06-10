// SignUp.js
import React from 'react';
import * as firebase from 'firebase';
import  { StyleSheet,
Text,
View,
TextInput,
Button,
TouchableHighlight,
Image,
Alert,
Dimensions
} from 'react-native';

export default class RegisterScreen extends React.Component {
  state = { email: '', password: '', errorMessage: null }
handleSignUp = () => {
  var that = this;

        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => that.props.navigation.navigate('App'))
            .catch(error => alert(error.message))
      
}

  LoginClickListener = () => {
    this.props.navigation.navigate("Auth");
  };
  com
render() {
    return (
        <View style={styles.container}>
                   <Image source={require("../assets/images/back.jpg")} 
       style={[styles.fixed, styles.back, {zIndex: -1}]}></Image>
        <Text style={styles.titleText}>Please Enter Your Credentials</Text>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Full name"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(fullName) => this.setState({fullName})}/>
          </View>
  
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
  
          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.handleSignUp}>
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableHighlight>
          <Text style={styles.titleText}>Already a member? login here</Text>
          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.LoginClickListener}>
            <Text style={styles.signUpText}>Login</Text>
          </TouchableHighlight>
        </View>
      );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#007ACC',
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