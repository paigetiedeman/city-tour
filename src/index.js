import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import CityTour from "./js/city-tour.js";
import { Movies } from "./js/movies";

async function makeApiCall() {
  const response = await CityTour.getTour();
  displayResult(response.results[0].days[0].itinerary_items);

}

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
  $("#get-location").submit(function (e) {
    e.preventDefault();
    makeApiCall();
  });

  // $("#display-button").click(function () {
  //   const items = data.results[0].days[0].itinerary_items;
  //   const item = items[0];

  //   const pointHtml = `<div class="card" style="width: 18rem;">
  //     <img class="card-img-top" src="${item.poi.images[0].sizes.thumbnail.url}" alt="Card image cap">
  //     <div class="card-body">
  //       <h5 class="card-title">${item.poi.name}</h5>
  //       <p class="card-text">${item.description}</p>
  //       <a href="#" class="btn btn-primary">Go somewhere</a>
  //     </div>
  //   </div>`;

  //   $("#container").append(pointHtml);
  // });
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

  $(".test-button").on("click", function() {
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

