import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Default from './assets/images/default.jpg';
import cityTour from './js/city-tour.js';
import OutdoorsRec from "./js/outdoors.js";
import { Movies } from "./js/movies";

async function makeApiCall(city) {
  const response = await cityTour.getTour(city);
  displayResult(response.results[0].days[0].itinerary_items);
}

function displayResult(items) {
  const pointsHtml = items
    .map((item) => {
      let imageUrl = Default;
      if (item.poi.images.length > 0) {
        imageUrl = item.poi.images[0].source_url;
      }
      return `<div class="col my-3">
        <div class="card mx-auto h-100" style="width: 18rem;">
          <img class="card-img-top" src=${imageUrl} alt="Card image cap">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${item.poi.name}</h5>
            <p class="card-text">${item.description}</p>
            <a href="#" class="btn btn-primary mt-auto">Go somewhere</a>
          </div>
        </div>
      </div>`;
    })
    .join("");
  $("#container").hide();
  $(".dayPlan").show();
  $("#cityDisplay").empty();
  $("#cityDisplay").append(pointsHtml);
  const geo = createGeoJson(items);
  $("#map-wrapper").append(
    `<img src=https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(${geo})/${items[0].poi.coordinates.longitude},${items[0].poi.coordinates.latitude},12/600x600?access_token=${process.env.MAP_KEY}>`
  );
}


async function outdoorsIdCall(citySearch) {
  const response = await OutdoorsRec.getOutdoors();
  const searchIds = await OutdoorsRec.getIds(citySearch);
  let areaIds = [];
  for (let id = 0; id < searchIds.RECDATA.length; id++) {
    areaIds.push(searchIds.RECDATA[id].RecAreaID);
  }
  console.log(areaIds);
  outdoorsApiCalls(response.RECDATA, areaIds);
}

async function outdoorsUrlApiCall(outdoorsURL) {
  try {
    const outdoorsLink = await OutdoorsRec.getOutdoorsURL(outdoorsURL);
    let urlLink = outdoorsLink.RECDATA[0].URL;
    return urlLink;
  }
  catch (error) {
    document.getElementById("outdoors-errors").innerHTML = error.message;
  }
}

async function outdoorsApiCalls(items, areaIds) {
  const searchItems = areaIds;
  let parkName = [];
  let parkDescription = [];
  let parkLink = [];
  for (let i = 0; i < items.length; i++) {
    if (searchItems.includes(items[i].RecAreaID)) {
      let outdoorsURL = items[i].RecAreaID;
      let urlLink = await outdoorsUrlApiCall(outdoorsURL);
      parkName.push(items[i].RecAreaName);
      parkDescription.push(items[i].RecAreaDescription);
      parkLink.push(urlLink);
    } 
  }
  displayOutdoors(parkName, parkDescription, parkLink);
}

function displayOutdoors(parkName, parkDescription, parkLink) {
  console.log(parkName);
  console.log(parkDescription);
  console.log(parkLink);

  if (parkName.length === 0) {
    $("#display-outdoors").text("This search returned no results; some park information may be out of date or unavailable.");
  }
  for (let j = 0; j < 6; j++) {
    if (typeof parkName[j]!='undefined' && parkName[j]!=null){
      
      let pointsHtml =
        `<div class="card col-md-4" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${parkName[j]}</h5>
        <hr>
        <div class="scroll">
        <p class="card-text">${parkDescription[j]}</p>
        </div>
        <div class="card-footer d-flex justify-content-center">
        <a href=${parkLink[j]} class="btn btn-primary">Learn More</a>
        </div>
        </div>
        </div>`;
      $("#display-outdoors").append(pointsHtml);
      
    }
  }
}

function createGeoJson(items) {
  const features = items.map((item, i) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          item.poi.coordinates.longitude,
          item.poi.coordinates.latitude,
        ],
      },
      properties: {
        "marker-symbol": (i + 1).toString(),
      },
    };
  });

  const geoJsonObject = {
    type: "FeatureCollection",
    features: features,
  };

  return encodeURIComponent(JSON.stringify(geoJsonObject));
}

function displayMovies(films) {
  for (let i in films) {
    let film = films[i];
    $("#movies").append(`
    <div class="col-sm-4">
    <div class="card">
    <img class="card-img-top" src="${film.images.poster[1].medium.film_image}" alt="Card image cap">
    <div class="card-body" id="${film.film_id}">
    <h5 class="card-title">Movie: ${film.film_name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">Release Date: ${film.release_dates[0].release_date}, Rated: ${film.age_rating[0].rating}</h6>
    <p>${film.synopsis_long}</p><br>
    </div>
    </div>
    </div>`);
    Movies.getTheaters(film.film_id)
      .then(result => {
        for (let theaterId in result.cinemas) {
          $(`#${film.film_id}`).append(`<p>${result.cinemas[theaterId].cinema_name}</p>
          <p>${result.cinemas[theaterId].time}</p>`);
        }
      })
      .catch(error => {
        $(`#${film.film_id}`).append(`<p>Sorry, something went wrong and we couldn't fetch your nearest theaters showing this movie: ${error}</p>`);  
      });
  }
}

$(document).ready(function () {
  $('.city').click(function () {
    const cityName = this.id;
    makeApiCall(cityName);
  });
  $("#outdoors").click(function () {
    $("#display-outdoors, #outdoors-errors").empty();
    const citySearch = $("#outdoors-search").val();
    outdoorsIdCall(citySearch);
    $(window).scroll(function () {
      if ($(this).scrollTop()) {
        $('#myBtn').fadeIn();
      } else {
        $('#myBtn').fadeOut();
      }
    });
    $('#myBtn').click(function () {
      $('html, body').animate({ scrollTop: 0 }, 800);
    });
    $(".test-button").on("click", function () {
      Movies.getMovies()
        .then(result => {
          displayMovies(result.films);
        })
        .catch(error => {
          $("#movies").append(`<p>Sorry, something went wrong and we couldn't fetch your movies: ${error}</p>`);
        });
      $(".test-button").hide();
    });
  });
});

