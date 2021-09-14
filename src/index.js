import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import cityTour from "./js/city-tour.js";
// import MapService from "./js/map-service";

async function makeApiCall() {
  const response = await cityTour.getTour();
  console.log(response.results[0].days[0].itinerary_items);
  displayResult(response.results[0].days[0].itinerary_items);

}

// async function makeMapApiCall() {
//   const response = await MapService.getMap();
//   console.log(response);
// }

function displayResult(items) {
  const pointsHtml = items.map(item => {
    console.log(item);
    let imageUrl = 'https://images.unsplash.com/photo-1523665307251-7f4e0e7b23fc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
    if(item.poi.images.length > 0) {
      imageUrl = item.poi.images[0].sizes.thumbnail.url;
    }
    return `<div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${imageUrl}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${item.poi.name}</h5>
      <p class="card-text">${item.description}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>`;
  }).join("");

  $("#container").append(pointsHtml);
}

$(document).ready(function () {
  // $('#btn').click(function (event) {
  //   event.preventDefault();
  // });
  $("#get-location").submit(function (e) {
    e.preventDefault();
    // const location = $('#location').val();
    makeApiCall();
  });

  $("#display-button").click(function () {
    // makeMapApiCall();
    $("#container").append(`<img src=https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.3493,47.6205,14/600x600?access_token=${process.env.MAP_KEY}>`);
  });
});
