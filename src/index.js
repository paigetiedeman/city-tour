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
      return `<div class="card col-md-4" style="width: 18rem;">
    <img class="card-img-top" src=${imageUrl} alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${item.poi.name}</h5>
      <p class="card-text">${item.description}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>`;
    })
    .join('');
  $('#container').hide();
  $('#cityDisplay').empty();
  $('#cityDisplay').append(pointsHtml);
}

$(document).ready(function () {
  $('.city').click(function () {
    const cityName = this.id;
    makeApiCall(cityName);
  });
});
