import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import cityTour from "./js/city-tour.js";
// import MapService from "./js/map-service";

async function makeApiCall(city) {
  const response = await cityTour.getTour(city);
  displayResult(response.results[0].days[0].itinerary_items);
}

// let city1 = $("#Seattle").val();
// let city2 = $("#Amsterdam").val();
// let city3 = $("#London").val();
// let city4 = $("#Barcelona").val();
// let city5 = $("#Paris").val();
// let city6 = $("#Tokyo").val();

function displayResult(items) {
  const pointsHtml = items.map(item => {
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
  // $('#Seattle').click(function (event) {
  // });
  $("#get-location").submit(function (e) {
    e.preventDefault();
    // const location = $('#location').val();
    makeApiCall();
  });

  $("#display-button").click(function () {
    // makeMapApiCall();
    
  });
});
