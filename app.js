const request=require("request")

const url=("http://api.weatherapi.com/v1/current.json?key=b097335e0f534fce81a183301241607&q=egypt&aqi=no")

request({url,json:true},(error,response)=>{
  const response2=response.body;

if(error){
  console.log("Error has been occured")
}else if(response2.error){
  console.log(response2.error.message)
}else{
  console.log(response2.location.name,response2.current.condition.text)
}

})

const geoCodeURL="https://api.mapbox.com/geocoding/v5/mapbox.places/San%20egypt.json?access_token=pk.eyJ1IjoiaGFmc2F0YXJlazM1IiwiYSI6ImNseXNrdnA4ZzAzYTQyam9uMWc2cnVzejUifQ.pSw7w5e0n4kkxH_UqnxQFw"


request({url:geoCodeURL,json:true},(error,response)=>{
  if(error){
    console.log("Invalid URl, can't reach geocoding api service")
  }else if (response.body.message){
    console.log(response.body.message)
  }else if(response.body.features.length===0) {
    console.log("Error:Invalid Country Name")
  }else
  {
    const longitude=response.body.features[0].center[0];
    const latitude=response.body.features[0].center[1];
    console.log(longitude,latitude)
  }
})

const forecast = require("./forecast");
const geocode = require("./geoCode.js");

const country = process.argv[2];

geocode(country, (error, data) => {
  console.log("Error: ", error);
  console.log("Data: ", data);

  forecast(data.latitude, data.longitude, (error, data) => {
    console.log("Error: ", error);
    console.log("Data: ", data);
  });
});
