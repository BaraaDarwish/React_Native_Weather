import React from 'react';
import * as firebase from 'firebase';
import  { 
  Button,
  Image,
  Dimensions,
  StyleSheet,
  Platform,
  View,
  Text,

  } from 'react-native';
  import { Icon } from 'expo';
export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null, 
  });

state = {
  email:"",

}
  signout(){
    firebase.auth().signOut();
    this.props.navigation.navigate("Auth"); 
    
  }
componentWillMount(){
  var user = firebase.auth().currentUser;

if (user) {
  this.setState({email:user.email});
} else {
  // No user is signed in.
}
}
  render() {

    return (
      <View style={styles.container}>
         <Icon.Ionicons
         name={Platform.OS === 'ios' ? 'ios-exit' : 'md-exit'}
         size={26}
         style={styles.icon}
         color='white'
         onPress={() => this.signout() }
      />
      <Text style={styles.header}>Thank You For Using Our App</Text>
      <Text style={styles.header}>{this.state.email}</Text>
      <Text></Text>
      <View
  style={{
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    alignSelf:'stretch',
    margin:20
  }}
/>
      <Text style={styles.header}>About</Text>
      <Text style={styles.normal}>this App was developed by:</Text>
      <Text style={styles.normal}>Baraa Dervis</Text>
      <Text style={styles.normal}>The weather is provided through</Text>
      <Text style={styles.normal}>openweathermap.org</Text>
    
       <Image source={require("../assets/images/back.jpg")} 
       style={[styles.fixed, styles.back, {zIndex: -1}]}></Image>
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
 icon:{
  flex:1,
  position: "absolute",
  top: 35,
  left: Dimensions.get("window").width - 35, //for full screen,
 
 }, fixed: {
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
header:{
fontSize:22,
color:'white',

},
normal:{
  fontSize:16,
  color:'white',
},
});