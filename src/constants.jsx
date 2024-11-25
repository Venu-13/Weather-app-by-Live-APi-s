import { DateTime } from 'luxon';

export const appId = '984e3131cb95c9cb3ed0a73d2924cac8';

export const getWeatherInfo = async (cityName, unit) => {
    const data = await getWeather(cityName, unit);
    if(data.cod === "404") {
        return data;
    } else {
        const cityDetails = getFormattedData(data);
        const foreCastData = await getForecastData(cityDetails, unit);
        return { cityDetails, foreCastData };
    }

};

export const getCurrent = (lat, lon) => {
return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`).then(res => res.json())
};

    export const getWeather = (cityName, unit) => {
        let url = '';
        if(unit === 'standard') {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appId}`;
        } else {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appId}&units=${unit}`;
        }
       return fetch(url).then(res => res.json()).catch(err => err);
      };

      const formatToLocalTime = (
        secs,
        offset,
        format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a"
      ) => DateTime.fromSeconds(secs + offset, {zone: "utc"}).toFormat(format);

      export const getFormattedData = (data) => {
        const {
            coord: { lon, lat },
            main:  { temp, feels_like, temp_min, temp_max, humidity},
            name,
            dt,
            sys:   { country, sunrise, sunset},
            weather,
            wind:  { speed },
            timezone
        } = data;
        const {main: details, icon} = weather[0];

        const imgUrl = imgURL(icon);

        const localTime = formatToLocalTime(dt, timezone);

         const cityDetails = {
              lon, lat, temp, feels_like, temp_min, temp_max, humidity, country, 
              sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"), 
              sunset:  formatToLocalTime(sunset, timezone, "hh:mm a"),
              name, speed, details, imgUrl, dt, timezone,
              localTime
        };
        return cityDetails;
      };

      export const getForecastData = (cityDetails, unit) => {
        let url = '';
        if(unit === 'standard') {
            url = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityDetails.lat}&lon=${cityDetails.lon}&appid=${appId}`;
        } else {
             url = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityDetails.lat}&lon=${cityDetails.lon}&appid=${appId}&units=${unit}`;
        } 

        return fetch(url).then(res => res.json()).then(data => forecastWeather(cityDetails.dt, cityDetails.timezone, data.list))
      };

      const forecastWeather = (secs, offset, data) => {
        //hourly

        const hourly = data.filter((f) => f.dt > secs).map((f) => ({
            temp: f.main.temp,
            title: formatToLocalTime(f.dt, offset, "hh:mm a"),
            icon: imgURL(f.weather[0].icon),
            date: f.dt_txt,
        })).slice(0, 5)
    
        //daily

        const daily = data.filter((f) => f.dt_txt.slice(-8) === "00:00:00").map(f => ({
            temp: f.main.temp,
            title: formatToLocalTime(f.dt, offset, "ccc"),
            icon: imgURL(f.weather[0].icon),
            date: f.dt_txt,
        }))

        return { hourly, daily };

      };

      const imgURL = (icon) => {
      return `http://openweathermap.org/img/wn/${icon}@2x.png`;
      };



export const city = [
    {
        id: 1,
        name: 'Hyderabad',
    },
    {
        id: 2,
        name: 'chennai',
    },
    {
        id: 3,
        name: 'Bangalore',
    },
    {
        id: 4,
        name: 'kerala',
    },
    {
        id: 5,
        name: 'Mumbai',
    }

];