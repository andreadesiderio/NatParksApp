'use strict'

const endpoint = "https://developer.nps.gov/api/v1/parks";
const apiKey = "ZdtzMrLgjFC3E8V0I1awCl7FQccTeZFhZDfslw6X";


function convertToParams(states, amount){
    const params = {
        stateCode : states,
        limit : amount,
        fields : "addresses",
        api_key : apiKey
    }
    const queryItems = Object.keys(params)
    .map(key =>  `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    const queryString = queryItems.join('&');
    const url = endpoint + "?" + queryString;
    console.log(url);
    requestUrl(url);
} 

function requestUrl(url){
    //  let myHeaders = new Headers();
    //   myHeaders.append("X-Api-Key", apiKey);

    //  const myInit = { 
    //      method: 'GET',
    //       headers: myHeaders,
    //        mode: 'cors', 
    //        cache: 'default',
    //        credentials: 'omit'
    //      };
    fetch(url)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => console.log (err.message))
}


function displayResults(responseJson){
    console.log(responseJson);
    for (let i = 0 ; i < responseJson.data.length; i ++){
        let item = responseJson.data[i];
    $('.js-resultsList').append(`<li>
    <h2>${item.fullName}</h2><p><a href="${item.url}" target="_blank">${item.url}</a></p><p class="adress">${item.addresses[0].line2}<br>${item.addresses[0].line1}<br>${item.addresses[0].city}, ${item.addresses[0].stateCode} ${item.addresses[0].postalCode}</p>
    <p class="description">${item.description}</p>
    </li>`);}
}


function watchForm(){
    $('form').on('submit', function(event){
        event.preventDefault();
        let states = $('.js-stateInput').val();
        let amount = $('.js-limitInput').val();
        console.log(states);
        $('.js-resultsList').empty();
        convertToParams(states, amount);   
    })
}



$(watchForm);