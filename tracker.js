const button = document.getElementById('button');
const inputIp = document.getElementById('ipInput');
const apiAsk = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_krAgkVfXkGjs1FhIXlhUjKCk3qexX';
const apiOnLoad = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_krAgkVfXkGjs1FhIXlhUjKCk3qexX&ipAddress=8.8.8.8';
const ip = document.getElementById('ip');
const locationIp = document.getElementById('location');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');
const form = document.querySelector('form');
const header = document.querySelector('header');
const infoAddress = document.querySelector('.info-address');
const cross = document.getElementById('cross');
const tokenPublic = "pk.eyJ1IjoiZGV2ZXhwbG9yaXMiLCJhIjoiY2xmNWllbjltMWNtazNybGp0OWd5MWpoaiJ9.EB5SRwYcg5M_gbfHF5eVPA";
const arrow = document.querySelector('.arrow');
const authors = document.querySelector('.author');

async function FetchApi(url) {
    if(url !== apiOnLoad) {
        url = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_krAgkVfXkGjs1FhIXlhUjKCk3qexX&ipAddress=' + inputIp.value;
    }
    let api = await fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('IP Address unknown');
        }
    }).catch(error => console.log(error));
    if (api === undefined) {
        api = await fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_krAgkVfXkGjs1FhIXlhUjKCk3qexX&domain=' + inputIp.value).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Domain unknown');
            }
        }).catch(error => console.log(error));
        if(api === undefined) {
            return null;
        }
    }
    return api;
}
async function SearchIp(url = '') {
    let data = await FetchApi(url);
    ip.innerText = data.ip;
    locationIp.innerText = data.location.country + ' - ' + data.location.region + ' - ' + data.location.city;
    timezone.innerText = 'UTC ' + data.location.timezone;
    isp.innerText = data.isp;
    let geocoding = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ data.location.city +".json?access_token=" + tokenPublic;
    fetch(geocoding)
        .then(responses => responses.json())
        .then(city => {
            let gpsCoordinates = {
                'longitude' : city.features[0].center[0],
                'latitude' : city.features[0].center[1]
            };
            let map = L.map('map', {
                zoomControl: false
            }).setView([gpsCoordinates.latitude, gpsCoordinates.longitude],10);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            L.marker([gpsCoordinates.latitude, gpsCoordinates.longitude]).addTo(map);
            L.circle([gpsCoordinates.latitude, gpsCoordinates.longitude], {radius: 10000}).addTo(map);
        });
}

function returnMap(map) {
    if(map != null) {
        map.remove();
        let divMap = document.createElement('div');
        divMap.id = 'map';
        header.after(divMap);
    }
}

window.addEventListener('load', () => {
    SearchIp(apiOnLoad)
})
button.addEventListener('click', () => {
    returnMap(map)
    SearchIp()
})
form.addEventListener('submit',(e) => {
    returnMap(map)
    SearchIp();
})

cross.addEventListener('click', () => {
    infoAddress.classList.toggle('visible');
    infoAddress.classList.toggle("invisible");
})

arrow.addEventListener('click', () => {
    authors.classList.toggle('left');
})