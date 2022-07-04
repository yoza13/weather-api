const axios = require("axios").default;
const appToken = "356ff24d62590793f00f5de022e88895";

exports.handler = async (event, context, callback) => {
  const requestBody = event;
  const { state, city, zip } = requestBody;
  const query = [];
  if (state) query.push(state);
  if (city) query.push(city);
  if (zip) query.push(zip);
  const { data: latitudeData } = await axios({
    method: "GET",
    url: "http://api.openweathermap.org/geo/1.0/direct",
    params: {
      q: city,
      limit: 1,
      appId: process.env.WEATHER_API_TOKEN,
    },
  });
  const { data: weatherData } = await axios({
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather",
    params: {
      appId: process.env.WEATHER_API_TOKEN,
      units: "metric",
      lat: latitudeData[0].lat,
      lon: latitudeData[0].lon,
    },
  });

  return { weatherData };
};
