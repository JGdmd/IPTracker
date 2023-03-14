# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview
### Links

- Solution URL: [Add solution URL here](merry-naiad-16e943.netlify.app)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- API IP : https://geo.ipify.org
- API Geocoding : https://www.mapbox.com/
- API LeafletJs : https://leafletjs.com/

### What I learned

It is first time for me to use 3 API on same time with fetch and async / await properties.

```js
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
```

### Continued development

I am impatient to try again use leafletJS and Mapbox for another projects !
I will continue to use async / await since I understand to use with this project !

## Author

- Website - [JGdmd](https://github.com/JGdmd)
- Frontend Mentor - [@JGdmd](https://www.frontendmentor.io/profile/JGdmd)

## Acknowledgments

I made this project alone.
