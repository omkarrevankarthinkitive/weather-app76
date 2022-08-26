const request = require("postman-request");

function forecast(latitude, longitude, callback) {
  const url = `http://api.weatherstack.com/current?access_key=f954e927ef1586ade097b793fa3afc4a&query=${longitude},${latitude}&units=f`;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to the services", undefined);
    } else if (body.error) {
      callback("unable to find cordinates try another one", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. it is currently ${body.current.temperature} degrees out,it feels like ${body.current.feelslike} out`
      );
    }
  });
}

module.exports = forecast;
