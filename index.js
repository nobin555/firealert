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


    sendNoti(req.query.lat, req.query.lng);

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




function sendNoti(lng, lat) {





    var restKey = 'YTc5NDgxNDYtMDk1MC00ZGRiLTgxZWUtMjk3ZmEyOGZmNzU0';
    var appID = 'cf2f39e8-0fec-4809-b4eb-9ffcb74329c4';
    var push_data = {
        method: 'POST',
        uri: 'https://onesignal.com/api/v1/notifications',
        headers: {
            "authorization": "Basic " + restKey,
            "content-type": "application/json"
        },
        json: true,
        body: {
            'app_id': appID,
            'contents': {
                en: "Click to view location "
            },
            'headings': {
                en: "FireAlert"
            },
            'included_segments': ['All'],
            'url': 'https://quiet-refuge-45087.herokuapp.com/location/' + lng + '/' + lat,


            priority: 10,
            ttl: 0
        }
    };



    request(push_data, function (err, body, response) {

        if (err) {

            console.log(err);
            return;
        }


    })




}



app.listen(process.env.PORT || 8005)