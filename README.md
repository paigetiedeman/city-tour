# City Tour

#### This site recommends a user a tour, movies and national parks from click "moods".

#### _By Paige Tiedeman, Nathan Fletcher, Connor Hansen, Diego Serafico & Mark Chang_

## Technologies Used

* HTML
* CSS
* JavaScript
* JQuery
* Bootstrap
* Jest
* ESLint
* Babel
* Webpack
* Popper
* Package.json
* [Triposo-API](https://www.triposo.com/api/documentation/20210615/)
* [Recration Information Database API](https://ridb.recreation.gov/landing)


## Description

This application uses four different API's to suggest a day trip with map location, movies and national parks to visit based on the mood clicked.

## Setup/Installation Requirements

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
* _In your .env file add the authorization, client, and api key for movies_
* _Type `$ npm run build`, to build your environment_
* _Type `$ npm run start`, to open in your browser_
* _Click on any of the moods to get your result_

## Known Bugs

* _Movies and National Parks API only work for US cities_

## License

_[MIT](https://opensource.org/licenses/MIT)_  

Copyright (c) 2021 Paige Tiedeman, Nathan Fletcher, Connor Hansen, Diego Serafico & Mark Chang

## Contact Information

_Paige Tiedeman @ github.com/paigetiedeman_
_Nathan Fletcher @ github.com/nathanfletch_
_Connor Hansen @ github.com/chansen1395_
_Diego Serafico @ github.com/DiegoSerafico_
_Mark Chang_
