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


app.post('/alert', function (req, res) {

    var data = {

        temp: req.body.temp,
        smoke_level: req.body.smoke_level,
        location: req.body.location

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