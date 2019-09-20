'use strict'

const endpoint = "https://developer.nps.gov/api/v1/parks";
const apiKey = "ZdtzMrLgjFC3E8V0I1awCl7FQccTeZFhZDfslw6X";
//https://developer.nps.gov/api/v1/definitions/Park?api_key=ZdtzMrLgjFC3E8V0I1awCl7FQccTeZFhZDfslw6X

///curl -X GET "https://developer.nps.gov/api/v1/parks?q=california&api_key=ZdtzMrLgjFC3E8V0I1awCl7FQccTeZFhZDfslw6X" -H "accept: application/json"

function convertToParams(state, amount){
    const params = {
        q : state,
        limit : amount,
        fields : "addresses"
        // api_key : apiKey
    }
    const queryItems = Object.keys(params)
    .map(key =>  `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    const queryString = queryItems.join('&');
    const url = endpoint + "?" + queryString;
    requestUrl(url);
} 

function requestUrl(url){
    // const options = {
    //     headers : new Headers({ 
    //         method: 'GET',
    //          headers: myHeaders,
    //           mode: 'cors', 
    //           cache: 'default' });
    //     const optionItems = Object.keys(options)
    // .map(key =>  `${(key)}:${options[key]}`);
   const myHeaders = new Headers(); myHeaders.append('X-Api_Key', apiKey);

    const myInit = { method: 'GET', headers: myHeaders, mode: 'cors', cache: 'default' };
    //   console.log(m, url);
    fetch(url, myInit)
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
    $('.js-resultsList').append(`<h2>${item.fullName}</h2><p>${item.url}</p><p>${item.addresses[0].line2}<br>${item.addresses[0].line1}<br>${item.addresses[0].city}, ${item.addresses[0].stateCode} ${item.addresses[0].postalCode}</p>
    <p>${item.description}</p>
    `);}
}


function watchForm(){
    $('form').on('submit', function(event){
        event.preventDefault();
        let state = $('.js-stateInput').val();
        let amount = $('.js-limitInput').val();
        convertToParams(state, amount);   
    })
}

$(watchForm);