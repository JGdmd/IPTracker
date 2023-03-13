let button = document.getElementById('button');
let inputIp = document.getElementById('ipInput');
let apiAsk = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_krAgkVfXkGjs1FhIXlhUjKCk3qexX';
let apiOnLoad = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_krAgkVfXkGjs1FhIXlhUjKCk3qexX&ipAddress=8.8.8.8';
let ip = document.getElementById('ip');
let locationIp = document.getElementById('location');
let timezone = document.getElementById('timezone');
let isp = document.getElementById('isp');
let form = document.querySelector('form');
let header = document.querySelector('header');
let infoAddress = document.querySelector('.info-address');
let cross = document.getElementById('cross');
let tokenPublic = "pk.eyJ1IjoiZGV2ZXhwbG9yaXMiLCJhIjoiY2xmNWllbjltMWNtazNybGp0OWd5MWpoaiJ9.EB5SRwYcg5M_gbfHF5eVPA";

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
            let array = {'longitude' : city.features[0].center[0]};
            array.latitude = city.features[0].center[1];
            let map = L.map('map', {
                zoomControl: false
            }).setView([array.latitude, array.longitude],10);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            L.marker([array.latitude, array.longitude]).addTo(map);
            L.circle([array.latitude, array.longitude], {radius: 10000}).addTo(map);
        });
}

window.addEventListener('load', () => {
    SearchIp(apiOnLoad)
})
button.addEventListener('click', () => {
    if(map != null) {
        map.remove();
        let divMap = document.createElement('div');
        divMap.id = 'map';
        header.after(divMap);
    }
    SearchIp()
})
form.addEventListener('submit',(e) => {
    if(map != null) {
        map.remove();
        let divMap = document.createElement('div');
        divMap.id = 'map';
        header.after(divMap);
    }
    e.preventDefault();
    SearchIp();
})

cross.addEventListener('click', () => {
    infoAddress.classList.toggle('visible');
    infoAddress.classList.toggle("invisible");
})