import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import { Icon } from 'expo';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null, 
  };
  state = {
    temp:undefined,
    max_temp:undefined,
    min_temp:undefined,
    description:undefined,
    humidity:undefined,
    error:undefined,
    country:"Turkey",
    city:"Istanbul",
    background:require("../assets/images/blue_sky.jpg"),
    icon:require('../assets/icons/sun.png'),
    long: 28.796517,
    ladit:40.995146,
  }
  getWeather = async(e) => {
    const API_KEY = "32ba7792af62b9c3499ecf252fb5007b";
    const api_call = await fetch("https://API.openweathermap.org/data/2.5/weather?lat="+this.state.ladit+"&lon="+this.state.long+"&appid="+API_KEY+"&units=metric")

    data = await api_call.json();
    this.setState({
      country:"Turkey",
      city:"Istanbul",
      temp:Math.round( data.main.temp ),
      min_temp:Math.round(data.main.temp_min),
      max_temp:Math.round(data.main.temp_max),
      description:data.weather[0].description,
      country:data.sys.country,
      humidity:data.main.humidity,
      city:data.name,
      error:"",
    });
    if(this.state.description ==  "clear sky"){
        this.setState({background:require('../assets/images/blue_sky.jpg') 
      ,icon:require("../assets/icons/sun.png")
      });
    }
    else if(this.state.description ==  "few clouds" ||this.state.description ==  "scattered clouds" ){
        this.setState({background:require("../assets/images/cloud_sky.jpg") 
        ,icon:require("../assets/icons/partlu_cloud.png")})
    } 

  else if(this.state.description ==  "broken clouds"  ){
    this.setState({background:require("../assets/images/clouds.jpg") 
    ,icon:require("../assets/icons/partlu_cloud.png")})
} 
else if(this.state.description ==  "shower rain"  ){
  this.setState({background:require("../assets/images/rain.jpg") 
  ,icon:require("../assets/icons/rain.png")})
} 
else if(this.state.description ==  "rain"  ){
  this.setState({background:require("../assets/images/rain.jpg") 
  ,icon:require("../assets/icons/rain.png")})
} 
else if(this.state.description ==  "thunderstorm"  ){
  this.setState({background:require("../assets/images/thunder.jpg") 
  ,icon:require("../assets/icons/thunder.png")})
} 
else if(this.state.description ==  "snow"  ){
  this.setState({background:require("../assets/images/snow.jpg") 
  ,icon:require("../assets/icons/snow.png")})
} 
else if(this.state.description ==  "mist"  ){
  this.setState({background:require("../assets/images/foggy_forest.jpg") 
  ,icon:require("../assets/icons/fog.png")})
} 
    
  } 
componentWillMount(){
  this.getWeather();
    
 
}
refreshLocation(){
  var that = this;
  navigator.geolocation.getCurrentPosition((position) => {
    var lat = parseFloat(position.coords.latitude);
    var long_ = parseFloat(position.coords.longitude);
    that.setState({
      long:long_,
      ladit:lat,
    })
    this.getWeather();
    //alert("result"+JSON.stringify(position))
  }, (e)=>{alert(e.code)},{enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 10000});

  
}
  
  render() {
    return (
      <View style={styles.container}>
       <ImageBackground source={this.state.background} style={{width: '100%', height: '100%',opacity:1}}>
       <View style={styles.container}>
       <Icon.Ionicons
         name={Platform.OS === 'ios' ? 'ios-locate' : 'md-locate'}
         size={26}
         style={styles.icon}
         color='white'
         onPress={() => this.refreshLocation() }
      />
         
          <Text style={styles.whiteText}>{this.state.country}/{this.state.city}</Text>
          <Image source={this.state.icon} style={{width: 48, height: 48 , alignContent:"center"}} ></Image>
          <Text style={styles.whiteText}>{this.state.description}</Text>
          <Text style={styles.whiteText}>{this.state.temp}°</Text>
          <Text style={styles.whiteTextSmall}>Highest  {this.state.max_temp}°/ Lowest  {this.state.min_temp}°</Text>
          <Text style={styles.whiteTextSmall}>Humidity  {this.state.humidity}%</Text>
        
        </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
        
  },
 mainInfoContainter:{

 },
 whiteText:{
   color:"white",
   fontSize:35, 
   textAlign:"center",
   
 },
 whiteTextSmall:{
  color:"white",
  fontSize:20, 
  textAlign:"center",
  
},
icon:{
  flex:1,
  position: "absolute",
  top: 35,
  left: Dimensions.get("window").width - 35, //for full screen,
 
 }
});
