import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import cityTour from './js/city-tour.js';


async function makeApiCall(){
  const response = await cityTour.getTour();
  console.log(response);
}

$(document).ready(function (){
  $("#btn").click(function(event){
    event.preventDefault(); 
    makeApiCall();
  });
});