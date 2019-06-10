import React from 'react';
import {  Dimensions,ScrollView, StyleSheet ,View,Text,Image , Platform} from 'react-native';
import { Icon } from 'expo';

class Forecast{
  constructor(time, desc , temp, icon){
    this.temp = temp;
    this.desc = desc;
    this.time = time;
    this.icon = {uri:"http://openweathermap.org/img/w/"+icon+".png"} 
  }
}

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'login',
    header:null,
  };

  state = {
    today:[],
    nextDay:[],
    day3:[],
    day4:[],
    day5:[],
    daysOfWeek:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    mydays:undefined,
    long: 28.796517,
    ladit:40.995146,
  }
  getWeather = async(e) => {
    const API_KEY = "32ba7792af62b9c3499ecf252fb5007b";
    const api_call = await fetch("https://API.openweathermap.org/data/2.5/forecast?lat="+this.state.ladit+"&lon="+this.state.long+"&appid="+API_KEY+"&units=metric")

    data = await api_call.json();
    return data;
    
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
      var that = this;
      this.getWeather().then(function(data) {
        that.updateData(data);
      
      }).catch(function(error) {
        alert(error)
      });
      //alert("result"+JSON.stringify(position))
    }, (e)=>{alert(e.code)},{enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 10000});
  
    
  }


updateData(data){
  

  var str = data.list[0].dt_txt;
  var today =  str.slice(8,10);
  var todayforeacst=[];
  var day3_ = [];
  var day4_ = [];
  var day5_ = [];
  var tommforcast=[];
  var i =0 ;
  var nextDay=data.list[i].dt_txt.slice(8,10);
  //create the today forecast array
  while(nextDay==today){
    str = data.list[i].dt_txt;
    todayforeacst.push( new Forecast(
      str.slice(11,13),
      data.list[i].weather[0].description,
      data.list[i].main.temp,
      data.list[i].weather[0].icon,
    ))
     
    i++;
    nextDay = data.list[i].dt_txt.slice(8,10);
  }
  for(var j=0;j<8;j++){
    var Day = data.list[i].dt_txt;
    var DayText = Day.slice(11,13);
    tommforcast.push( new Forecast(
      DayText,
      data.list[i].weather[0].description,
      data.list[i].main.temp,
      data.list[i].weather[0].icon,
    ))

    //day 3
    var Day = data.list[i+8].dt_txt;
    var DayText = Day.slice(11,13);
    day3_.push( new Forecast(
      DayText,
      data.list[i+8].weather[0].description,
      data.list[i+8].main.temp,
      data.list[i+8].weather[0].icon,
    ))

    //day 4
    var Day = data.list[i+16].dt_txt;
    var DayText = Day.slice(11,13);
    day4_.push( new Forecast(
      DayText,
      data.list[i+16].weather[0].description,
      data.list[i+16].main.temp,
      data.list[i+16].weather[0].icon,
    ))

    //day 5
    var Day = data.list[i+24].dt_txt;
    var DayText = Day.slice(11,13);
    day5_.push( new Forecast(
      DayText,
      data.list[i+24].weather[0].description,
      data.list[i+24].main.temp,
      data.list[i+24].weather[0].icon,
    ))

    i++;
  }
  this.setState({today:todayforeacst,
  nextDay:tommforcast,
  day3:day3_,
  day4:day4_,
  day5:day5_
  })

}

componentWillMount(){
  var that = this;
  this.getWeather().then(function(data) {
    that.updateData(data);
  
  }).catch(function(error) {
    alert(error)
  });
  var date = new Date();
  var D = date.getDay();
  var dayOfWeek=[]
  for (var i=2;i<=4;i++){
   dayOfWeek.push(this.state.daysOfWeek[(D+i)%7]);
  }
  this.setState({
    mydays:dayOfWeek
  });
  
}
  render() {

    var todays = this.state.today.map(function(fore , index){
      return(
        <View  key={index} style={{margin:10 }}>
      <Text style={styles.whiteText}>{fore.time}:00</Text>
      <Text style={styles.whiteText}>{fore.desc}</Text>
      <Text style={styles.whiteText}>{fore.temp}°</Text>
      <Image source={fore.icon} style={{width: 24, height: 24 , alignContent:"center"}} ></Image>

      </View>
      );
      });
      var tomorrow = this.state.nextDay.map(function(fore , index){
        
        return(
          <View  key={index} style={{margin:10 }}>

      <Text style={styles.whiteText}>{fore.time}:00</Text>
      <Text style={styles.whiteText}>{fore.desc}</Text>
      <Text style={styles.whiteText}>{fore.temp}°</Text>
      <Image source={fore.icon} style={{width: 24, height: 24 , alignContent:"center"}} ></Image> 
        </View>
        );
        });
        var day3F = this.state.day3.map(function(fore , index){
         
          return(
            <View  key={index} style={{margin:10 }}>
  
        <Text style={styles.whiteText}>{fore.time}:00</Text>
        <Text style={styles.whiteText}>{fore.desc}</Text>
        <Text style={styles.whiteText}>{fore.temp}°</Text>
        <Image source={fore.icon} style={{width: 24, height: 24 , alignContent:"center"}} ></Image> 
          </View>
          );
          });
          var day4F = this.state.day4.map(function(fore , index){
            return(
              <View  key={index} style={{margin:10 }}>
    
          <Text style={styles.whiteText}>{fore.time}:00</Text>
          <Text style={styles.whiteText}>{fore.desc}</Text>
          <Text style={styles.whiteText}>{fore.temp}°</Text>
          <Image source={fore.icon} style={{width: 24, height: 24 , alignContent:"center"}} ></Image> 
            </View>
            );
            });
            var day5F = this.state.day5.map(function(fore , index){
              return(
                <View  key={index} style={{margin:10 }}>
      
            <Text style={styles.whiteText}>{fore.time}:00</Text>
            <Text style={styles.whiteText}>{fore.desc}</Text>
            <Text style={styles.whiteText}>{fore.temp}°</Text>
            <Image source={fore.icon} style={{width: 24, height: 24 , alignContent:"center"}} ></Image> 
              </View>
              );
              });
    return (
      <View >

      <ScrollView style={{backgroundColor:'transparent',marginTop:30}} >
        <Icon.Ionicons
         name={Platform.OS === 'ios' ? 'ios-locate' : 'md-locate'}
         size={26}
         style={styles.icon}
         color='white'
         onPress={() => this.refreshLocation() }
      />
       <View style={styles.container}>
       <Text style={styles.WhiteBig} >Today</Text>
       <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false } style={styles.dayContainer}>
       {todays}
       </ScrollView>
       <View
  style={{
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    alignSelf:'stretch',
    margin:20
  }}
/>
       <Text style={styles.WhiteBig}>Tomorrow</Text>
       <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false } style={styles.dayContainer}>
       {tomorrow}
       </ScrollView>
       <View
  style={{
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    alignSelf:'stretch',
    margin:20
  }}
/>
       <Text style={styles.WhiteBig}>{this.state.mydays[0]}</Text>
       <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false } style={styles.dayContainer}>
       {day3F}
       </ScrollView>
       <View
  style={{
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    alignSelf:'stretch',
    margin:20
  }}
/>
       <Text style={styles.WhiteBig}>{this.state.mydays[1]}</Text>
       <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false } style={styles.dayContainer}>
       {day4F}
       </ScrollView>
       <View
  style={{
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    alignSelf:'stretch',
    margin:20
  }}
/>
       <Text style={styles.WhiteBig}>{this.state.mydays[2]}</Text>
       <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false } style={styles.dayContainer}>
       {day5F}
       </ScrollView>
       </View>
     
      </ScrollView>
      <Image source={require("../assets/images/back.jpg")} 
       style={[styles.fixed, styles.back, {zIndex: -1}]}></Image>
      </View>
      
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  dayContainer:{
    margin:15,
    flex:1,
    flexDirection: 'row',
    backgroundColor: 'transparent',

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
  scrollview: {
    backgroundColor: 'transparent'
  },
  whiteText:{
    color:"white",
  }
  ,WhiteBig:{
    color:"white",
    fontSize:22, 
    textAlign:"center",
  },
  icon:{
    flex:1,
    position: "absolute",
    top: 35,
    left: Dimensions.get("window").width - 35, //for full screen,
   
   }
});
