import * as firebase from "firebase";

const Config = {
    apiKey: "AIzaSyDjgs7OscKOKuJrRB7HCsXI8TgzTdi6p_M",
    authDomain: "braided-keel-201608.firebaseapp.com",
    databaseURL: "https://braided-keel-201608.firebaseio.com",
    projectId: "braided-keel-201608",
    storageBucket: "braided-keel-201608.appspot.com",
    messagingSenderId: "643064918358",
    appId: "1:643064918358:web:bedd751ad618525c"
  };
  // Initialize Firebase


export default class Firebase{
    static auth;
    static done = false;
    static RegisterationInfo = {
        email:"",
        password : "" ,
    };
    static isAuthenticated = false;

    static init(){
        if(!Firebase.done){
        firebase.initializeApp(Config);
        Firebase.auth = firebase.auth();
        Firebase.done = false;
    }
}
}