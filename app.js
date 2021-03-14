window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let temperatureSection = document.querySelector('.temperature')
    const gusts = document.querySelector('.wind--speed')
    const temperatureSpan = document.querySelector('.temperature span')
    

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data =>{
                console.log(data)
                const { temperature, summary, icon, windSpeed } = data.currently;
                //set DOm elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                gusts.textContent = `${windSpeed} MPH`
                let celcius = (temperature - 32) * (5 / 9)


                setIcons(icon, document.querySelector('.Icon'))

                //changing temp to celcuis
                temperatureSection.addEventListener('click', () =>{
                    if (temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent ="C";
                        temperatureDegree.textContent = Math.floor(celcius);
                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                        
                    }
                })



               
            
            })
     
        })

       
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});