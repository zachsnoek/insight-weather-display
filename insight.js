const https = require("https");
const date = require(__dirname + "/date.js");

const key = process.env.API_KEY
const options = new URL("https://api.nasa.gov/insight_weather/?api_key=" + key + "&feedtype=json&ver=1.0");

const err = "Null"

exports.getData = new Promise(
    function(resolve, reject) {
        https.get(options, function(response) {
            console.log(response.statusCode);
    
            let chunks = [];
    
            response.on("data", function(chunk) {
                chunks.push(chunk);
            });
            
            response.on("end", function() {
                let data = Buffer.concat(chunks);
                let schema = JSON.parse(data);
                let solData = [];
    
                schema.sol_keys.forEach(function(key) {
                    const sol = {
                        sol: key,
                        date: date.formatMonthDay(new Date(schema[key].First_UTC))
                    };

                    try {
                        sol.temp = {
                            min: schema[key].AT.mn.toFixed(1),
                            max: schema[key].AT.mx.toFixed(1),
                            avg: schema[key].AT.av.toFixed(1) 
                        };
                    } catch(e) {
                        sol.temp = {
                            min: err,
                            max: err,
                            avg: err
                        }
                        console.log("Error retrieving temperature data for sol " + key);
                        console.log(e);
                    }

                    try {
                        sol.ws = schema[key].HWS.av.toFixed(1);
                    } catch(e) {
                        sol.ws = err;
                        console.log("Error retrieving wind speed data for sol " + key);
                        console.log(e);
                    }

                    solData.push(sol);
                });

                resolve(solData);
            });
        });
    }
)