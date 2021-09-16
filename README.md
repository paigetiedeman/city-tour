# City Tour

#### This site recommends a user a tour, movies and national parks from click "moods".

#### _By Paige Tiedeman, Nathan Fletcher, Connor Hansen, Diego Serafico & Mark Chang_

## Technologies Used

* HTML
* CSS
* JavaScript
* JQuery
* Bootstrap
* ESLint
* Babel
* Webpack
* Popper
* Package.json
* [Triposo-API](https://www.triposo.com/api/documentation/20210615/)
* [Movie-glu](https://developer.movieglu.com/v2/api-index/quick-start-guide/)
* [Mapbbox](https://docs.mapbox.com/api/maps/static-images/)
* [RIDB-API](https://ridb.recreation.gov/docs)


## Description

This application integrates four different API's to suggest a day trip with map locations based on the mood clicked. It also has an option for National Parks based on user search and local movie API that uses coordinates that are currently set in the movie.js file.

## Setup/Installation Requirements

<details>
<summary>Setup & Installation Requirements</summary>

* _Clone or download the zip file of this repository to your desktop_
* _Open in a text editor_
* _If you are using a Mac: open the package.json and find the scripts property, change the line "start": "npm run build & webpack-dev-server --open --mode development",
to "start": "npm run build; webpack-dev-server --open --mode development"_
* _Commit and push your .gitignore file to your repo_
* _Run `$ npm install`_
* _Check title on package.json and webpack file_
* _Go to https://www.triposo.com/api/signup and generate an API Key_
* _Type `$ touch .env` to create a document to save your API key as Account_Key={your key here} & token={your token here}_
* _Go to https://ridb.recreation.gov/landing to generate an API Key_
  - add API_KEY={Your-Api-Key} to the .env file.
* _Add MAP_KEY=pk.eyJ1IjoibmF0aGFubWFwYm94ZGV2IiwiYSI6ImNrcHdkN2p2aDA0Z2oyeG9ieDZicTZudm4ifQ.tUypg6GRjhED2bic-GkFnw (this is a public test key) to the .env file.
* _Go to https://developer.movieglu.com/ and generate an API Key_
* _In your .env file add the MOVIES_AUTHORIZATION=(), MOVIES_CLIENT=(), and API_KEY=() for movies_
* _Type `$ npm run build`, to build your environment_
* _Type `$ npm run start`, to open in your browser_
* _Click on any of the moods to get your result_
* _Use the Nav Bar to go to different Sections_
* _Type in a US City to find nearby Parks_
* _Click the "See Local Movies" Button to show nearby theaters and showing_
</details>

## Known Bugs

* _National Parks API only work for US cities_
* _Movies is set to the US and specific coordinates and will not change_
* _Pick a new mood does not allow for results to populate a second time_

## License

_[MIT](https://opensource.org/licenses/MIT)_  

Copyright (c) 2021 Paige Tiedeman, Nathan Fletcher, Connor Hansen, Diego Serafico & Mark Chang

## Contact Information

_Paige Tiedeman @ github.com/paigetiedeman_  
_Nathan Fletcher @ github.com/nathanfletch_  
_Connor Hansen @ github.com/chansen1395_  
_Diego Serafico @ github.com/DiegoSerafico_  
_Mark Chang_  
