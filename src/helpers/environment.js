// let PetFinderKey = "QYKORCbKtERgCS5ycOCD6qCg6uxQU2duXV6rCVou8EvMCflEwc";
// let PetFinderSecret = "sZgS6xKAiUeB90YgkAB3gStLG3qU6XlWnqY6YjCM";
// let AppName = "Social-pet-site";

let APIURL = "";

switch(window.location.hostname){
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;

    case 'kdj-petazoa-client.herokuapp.com':
        APIURL = 'https://kdj-petazoa.herokuapp.com'
}

export default APIURL;