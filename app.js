const asyncRequest = require("async-request");

const getWeather = async (location) => {
  const access_key = "398076c0ae0a92cbd702be14820ba1ff";
  const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${location}`;
  try {
    const res = await asyncRequest(url); //call api
    console.log("🚀 ~ file: app.js ~ line 8 ~ getWeather ~ res", res);
    const data = JSON.parse(res.body);
    const weather = {
      isSuccess: true,
      country: data.location.country,
      region: data.location.region,
      temp: data.current.temperature,
      windSpeed: data.current.wind_speed,
      precip: data.current.precip,
      cloudcover: data.current.cloudcover,
    };
    console.log("🚀 ~ file: app.js ~ line 16 ~ getWeather ~ weather", weather);
    return weather;
  } catch (error) {
    return {
      isSuccess: false,
      error,
    };
  }
};
// getWeather("tokyo");
const express = require("express");
const app = express(); //khoi tao ung dung
const path = require("path"); // thu vien mac dinh cua nodejs
//setup static file
const pathPublic = path.join(__dirname, "./public"); //ket noi file app voi file public,__dirname: la duong dan tuyet doi chay den file dang code laf file app.js
console.log("🚀 ~ file: app.js ~ line 32 ~ pathPublic", pathPublic);
app.use(express.static(pathPublic));
app.get("/", async (req, res) => {
  const params = req.query; // lay gia tri cua nguoi dung nhap vao tren url
  console.log("🚀 ~ file: app.js ~ line 36 ~ app.get ~ params", params);
  const location = params.address;
  const weather = await getWeather(location);
  console.log("🚀 ~ file: app.js ~ line 39 ~ app.get ~ weather", weather);
  if (location) {
    res.render("weather", {
      status: true,
      showRegion: weather.region,
      showCountry: weather.country,
      showTemp: weather.temp,
      showWindSpeed: weather.windSpeed,
      showPrecip: weather.precip,
      showCloudcover: weather.cloudcover,
    });
  } else {
    res.render("weather", { status: false });
  }
});
app.set("view engine", "hbs"); // set up template engine
//setup chay tren moi truong nao
const port = 7000;
app.listen(port, () => {
  console.log(`app run on port:http://localhost:7000/`);
});
