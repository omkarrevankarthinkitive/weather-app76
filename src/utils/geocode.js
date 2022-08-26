const request = require("postman-request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoib21rYXJ0aGlua2l0aXZlIiwiYSI6ImNsNzRxdWsxMzFkaDQzcHA4bjJsbHBiZXcifQ.NW8ejNbtO7O6DyRUGzk8Pw&limit=1`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to the location services", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find a location. try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
