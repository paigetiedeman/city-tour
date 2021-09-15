export class Movies {
  static getMovies() {
    const date = new Date().toISOString();
    return fetch(`https://api-gate2.movieglu.com/filmsNowShowing/?n=3`, {
      headers: {
        "api-version": "v200",
        "Authorization": `${process.env.MOVIES_AUTHORIZATION}`,
        "x-api-key": `${process.env.MOVIES_API_KEY}`,
        "device-datetime": `${date}`,
        "territory": "US",
        "client": `${process.env.MOVIES_CLIENT}`,
        "geolocation": '47.6;-122.3',
      },
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        throw Error(error);
      });
  }

  static getTheaters(filmId) {
    const date = new Date().toISOString();
    return fetch(
      `https://api-gate2.movieglu.com/closestShowing/?film_id=${filmId}&n=3`,
      {
        headers: {
          "api-version": "v200",
          "Authorization": `${process.env.MOVIES_AUTHORIZATION}`,
          "x-api-key": `${process.env.MOVIES_API_KEY}`,
          "device-datetime": `${date}`,
          "territory": "US",
          "client": `${process.env.MOVIES_CLIENT}`,
          "geolocation": '47.6;-122.3',
        },
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        throw Error(error);
      });
  }
}
