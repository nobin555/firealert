var express = require('express')
var app = express()
var request = require('request')
var bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


app.get('/alert', function (req, res) {

    var data = {

        temp: req.query.temp,
        smoke_level: req.query.smoke_level,
        longitude: req.query.lng,
        latitude: req.query.lat
        

    }



    res.json(data);



});



app.get('/location/:lng/:lat', function (req, res) {


    res.render('location.ejs', {
        lat: req.params.lat,
        lng: req.params.lng
    })


})

app.get('/', function (req, res) {

    var data = {};

    data['status'] = 'OK'
    data['code'] = 200

    res.json(data)

})

app.listen(process.env.PORT || 8005)