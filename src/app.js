const path = require ('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()

//Define paths para express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup de hbs/handlebars engine y views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup directorio estatico al serve
app.use(express.static(publicDirectoryPath))

//Index - Pagina principal
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name:'Andrew Mead'
    })
})

//Pagina About
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Andrew Mead'
    })
})

//Pagina Help
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        name: 'Andrew Mead'
    })
})

//--Mostrar datos del clima 
app.get('/weather',(req,res)=>{    
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }


//Muestra la informacion traida de la pagina darksky
    // geocode(req.query.address, (error,{latitude, longitude, location}={})=>{
    //     if(error){
    //         return res.send({error})
    //     }

    //     forecast (latitude, longitude, (error, forecast)=>{
    //         if(error){
    //             return res.send({error})
    //         }

    //         res.send({
    //             forecast: forecastData,
    //             location,
    //             address: res.query.address
    //         })
    //     })
    // })

    //muestra informacion predeterminada
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia',
        address: req.query.address
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//Si se busca la pagina con el nombre/incorrectamente se manda a pagina de ayuda
app.get('/help/',(req,res)=>{
    res.render('404',{
        title: 'Help',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found'
    })
})

//Si no se encontro ninguna pagina de las anteriores saltara este mensaje
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found'
    })
})

//aqui se define el puerto 
app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})
