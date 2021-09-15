import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Default from './assets/images/default.jpg';
import cityTour from './js/city-tour.js';

async function makeApiCall(city) {
  console.log(city);
  const response = await cityTour.getTour(city);
  displayResult(response.results[0].days[0].itinerary_items);
}

function displayResult(items) {
  const pointsHtml = items
    .map((item) => {
      let imageUrl = Default;
      if (item.poi.images.length > 0) {
        imageUrl = item.poi.images[0].sizes.thumbnail.url;
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
  $("#cityDisplay").empty();
  $("#cityDisplay").append(pointsHtml);
  const geo = createGeoJson(items);
  $("#map-wrapper").append(
    `<img src=https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(${geo})/${items[0].poi.coordinates.longitude},${items[0].poi.coordinates.latitude},12/600x600?access_token=${process.env.MAP_KEY}>`
  );
}

$(document).ready(function () {
  $(".city").click(function () {
    const cityName = this.id;
    makeApiCall(cityName);
  });
});

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
