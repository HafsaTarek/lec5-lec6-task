const request = require("request");
const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherapi.com/v1/current.json?key=b097335e0f534fce81a183301241607&q=" +
    latitude +
    " , " +
    longitude;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather api", undefined);
    } else if (response.body.error) {
      callback(response.body.error.message, undefined);
    } else {
      callback(
        undefined,
        response.body.location.name +
          "& it's weather is: " +
          response.body.current.condition.text +
          " & it's temp:" +
          response.body.current.temp_c
      );
    }
  });
};

module.exports = forecast;
