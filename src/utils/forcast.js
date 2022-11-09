const request = require('postman-request');




const forcast = (address,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=6c5c2dca022e6304da741091be4e8de2&query="+address+"&units=m";

    request({url: url, json:true},(error,response)=>{
            // const data = JSON.parse(response.body.current);
            if (error){
                console.log("Check Your Internet Connections!!!", undefined);
            }
            else if(response.body.success == false){
                callback("Invalid acesss"+response.body.success," ", undefined);
            }
            else{
            const data =  response.body.current;

            callback(undefined, "Todays temp is " + data.temperature)
        }
        })
}
module.exports = forcast;