// const request = require('request')

// const forecast = (latitude,longitude,callback)=>{
//     const url = 'https://dark-sky.p.rapidapi.com/'+ latitude +','+ longitude+'?units=si?leng=es'

//     request({url:url,json:true},(error, response)=>{
//         if(error){
//             callback('Unable', undefined)
//         }else if(response.body.error){
//             callback('unable to find location',undefined)
//         }else{
//             callback(undefined,response.body.daily.data[0].summary+'It is currently '+ response.body.currently.temperature + 'degress out. There is a '+ response.body.currently.precipProbability + '% chance of rain.')
//         }
//     })
// }
//module.exports = forecast
//---------------------------------------------------------------------------------------
const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://dark-sky.p.rapidapi.com/'+ latitude +','+ longitude+'?units=si?leng=es'

    request({url,json:true},(error, {body})=>{
        if(error){
            callback('Unable', undefined)
        }else if(body.error){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary+'It is currently '+ body.currently.temperature + 'degress out. There is a '+ body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast