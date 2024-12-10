const apiKey = 'f3e4ff67b27a4161a15201124230908';
const search = document.querySelector('#search');
const searchbtn = document.querySelector('#search-btn');
const date = document.querySelector('#date');
const time = document.querySelector('#time');
const city = document.querySelector('#place');
const icon = document.querySelector('#icon');
const legend = document.querySelector('#weather-legend');
const tC = document.querySelector('#temperatureC');
const tF = document.querySelector('#temperatureF'); 
const region = document.querySelector('#region');

async function getWeather(place){
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${place}&aqi=no`);
        let data = await response.json();
        let currentDate = new Date(data.location.localtime).toLocaleDateString('en-us', { month: 'short', day: 'numeric', year: 'numeric' });
        let currentTime = new Date(data.location.localtime);
        let hours = currentTime.getHours();
        let minutes = currentTime.getMinutes();
        let ampm = hours >= 12 ? 'p.m.' : 'a.m.';
        hours = hours % 12; 
        hours = hours ? hours : 12;
        let formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

        date.innerHTML = currentDate;
        time.innerHTML = formattedTime;
        city.innerHTML = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
        icon.src = data.current.condition.icon;
        legend.innerHTML = data.current.condition.text;
        tC.innerHTML = data.current.temp_c +' °C';
        tF.innerHTML = data.current.temp_f + ' F';
        region.innerHTML = data.location.tz_id.replace('/', ', ').replace('_', ' ');
        
    } catch (error) {
        throw error;
    }
};

getWeather('Santo Domingo');

searchbtn.addEventListener('click', ()=>{
   getWeather(search.value);
});
search.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        getWeather(search.value);
    }
});


