const drumbID = 1338;

var sensorLib = require('node-dht-sensor');
var requestify = require('requestify');

var sensor = {
    initialize: function () { return sensorLib.initialize(22, 21); },
    read: function () {
        try {
            var readout = sensorLib.read();
            var data = {
                location : ['-34.2', '150.78'],
                temp : readout.temperature.toFixed(2),
                humidity : readout.humidity.toFixed(2)
            };
            return data;
        } catch(err) { console.log('You fucked something you idiot: ' + err); }
    },
    post: function() {
        var postData = sensor.read();
	console.log('posting...');        
        if (postData.temp != 0 && postData.humidity != 0){
            requestify.request('http://ec2-54-206-19-157.ap-southeast-2.compute.amazonaws.com:3000/api/drum/update/' + drumbID, {
                method: 'POST',
                body: postData,
                dataType: 'json'
            })
                .then(function(response) {
                    console.log('Status Code: ' + response.getCode());
                    console.log('Data Sent: ' + JSON.stringify(postData));
            });
        }
    }
};

if (sensor.initialize()) {
    setInterval(function(){
        sensor.post()}
    , 4000);
} else console.log('Failed to initialize sensor');
