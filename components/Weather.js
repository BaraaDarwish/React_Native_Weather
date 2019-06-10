



export default class Weather {
    static  data;
    static cached = false;
    static getWeather = async (cityID) => {
        
        const API_KEY = "32ba7792af62b9c3499ecf252fb5007b";
        const api_call = await fetch("https://API.openweathermap.org/data/2.5/weather?q=Istanbul&appid="+API_KEY+"&units=metric")

        data = await api_call.json();
        alert(JSON.stringify(data));
        
        cached = true;
    }
} 