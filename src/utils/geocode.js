const request = require('postman-request');
const geocode  = (address, callback)=>{
    const geocodeurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoibW9iMTIzNDU2IiwiYSI6ImNsOXNvcjl4MjBhbXIzb2s3d3BsdW1iNmoifQ._ICdM8qPBLEVCPJN47mOAg&limit=1"
    request({url: geocodeurl, json:true},(error,response)=>{

        if (error){
            callback('Unable to connect to location services!', undefined)
        }
        else if(response.body.message){
            callback('Error access!', response.body.message)
            
        }
        else if(response.body.features==0){
            callback('Unable to find location. Try another search.!',undefined)
        }
        else{
            
        callback(undefined,{
             latitude: response.body.features[0].center[1],
             longitude : response.body.features[0].center[0],
             place_name : response.body.features[0].place_name

        })
        }
        
    })
}

module.exports = geocode;