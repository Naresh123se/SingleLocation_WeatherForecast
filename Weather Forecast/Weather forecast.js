//statement
localStorage.clear();
    if (localStorage.api_fetchdate != null && localStorage.api_fetchdate +60000 > Date.now ())
    {
    
    document.getElementById("temperature").innerHTML=`${localStorage.temperature}&#8451`;
    document.getElementById("city").innerHTML=`${localStorage.city}`;
    document.getElementById("climate_desc").innerHTML=`${localStorage.climate_desc}`;
    document.getElementById("pressure").innerHTML=`Pressure: ${localStorage.pressure} hpa`;
    document.getElementById("humidity").innerHTML=`Humidity: ${localStorage.humidity} %`;
    document.getElementById("Wind Speed").innerHTML=`Wind speed: ${localStorage.WindSpeed} m/s`;
    document.getElementById("winddirection").innerHTML=`Wind direction: ${localStorage.winddirection}°`;
    document.getElementById("icon").src="http://openweathermap.org/img/wn/"+localStorage.icon+".png";
    document.getElementById("date").innerHTML=`${new Date(localStorage.date * 1000).toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric', weekday: 'short' })}`;
    }

    else {
      const Search="http://localhost/Weather_api.php";
      fetch(Search)
      
    //Convert response string to json Object
    .then((Response)=>{
        return Response.json(); 
    })

  .then((data)=>
  
  {
    //Display  all the API response in browser console
    console.log(data);

     console.log(parseInt(localStorage.api_fetchdate) + 60000 > Date.now());

    localStorage.setItem("temperature",data.temp);
    localStorage.setItem("city",data.cityName);
    localStorage.setItem("climate_desc",data.descriptio);
    localStorage.setItem("pressure",data.pressure);
    localStorage.setItem("humidity",data.humidity);
    localStorage.setItem("WindSpeed",data.speed);
    localStorage.setItem("winddirection",data.direction);
    localStorage.setItem("icon",data.icon);
    localStorage.setItem("date",data.dt);
    localStorage.setItem("api_fetchdate",Date.now());


    document.getElementById("temperature").innerHTML=`${localStorage.temperature}&#8451;`;
    document.getElementById("city").innerHTML=`${localStorage.city}`;
    document.getElementById("climate_desc").innerHTML=`${localStorage.climate_desc}`;
    document.getElementById("pressure").innerHTML=`Pressure: ${localStorage.pressure} hpa`;
    document.getElementById("humidity").innerHTML=`Humidity: ${localStorage.humidity} %`;
    document.getElementById("Wind Speed").innerHTML=`Wind speed: ${localStorage.WindSpeed} m/s`;
    document.getElementById("winddirection").innerHTML=`Wind direction: ${localStorage.winddirection}°`;
    document.getElementById("icon").src="http://openweathermap.org/img/wn/"+localStorage.icon+".png";
    document.getElementById("date").innerHTML=`${new Date(localStorage.date * 1000).toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric', weekday: 'short' })}`;

    })
}