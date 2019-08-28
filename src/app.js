const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')
const app = express()


// Define path for Express config
const publicDir = path.join(__dirname , '../public')
const viewsPath =path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


// Setup handelbars enginbe and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


// Setup static directory to serve
app.use(express.static(publicDir))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Hava Durumu',
        name:'Amin Gh'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Hakkımda',
        name:'Amin Gh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'Yardım sayfası.',
        title:'Yardım',
        name:'Amin Gh'
    })
})


app.get('/weather',(req , res)=>{
    if(!req.query.address){
        return res.send({
            error:'Lütfen bir adres giriniz.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } ={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[],
    })
})

app.get('/help/*',(req,res)=>{

    res.render('404',{
        title : '404' , 
        errorMassage:'Yardım makalesi bulunamadı.',
        name: 'Amin Gh'
    })

})

app.get('*',(req,res)=>{

    res.render('404',{
        title : '404' , 
        errorMassage: '404-Sayfa bulunamadı.',
        name: 'Amin Gh'
    })
})


app.listen(3000 , ()=>{
    console.log('server is up on port 3000')
} )