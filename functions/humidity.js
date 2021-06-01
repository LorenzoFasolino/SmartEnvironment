var mqtt = require('mqtt');

var url = 'mqtt://MQTT-BROCKER-IP'
var ifttt_key = 'IFTTT-KEY'
var iftttEndpoint = "https://maker.ifttt.com/trigger/humidity/with/key/"+ifttt_key

var options = {
    port: 1883,
    host: url,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'MQTT-USERNAME',
    password: 'MQTT-PASSWORD',
};

var FUNCTION_NAME = "humidity";

function send_feedback_mqtt(msg){
    var q = 'iot/logs';

    var client = mqtt.connect(url, options);

    client.on('connect', function() {
        client.publish(q, msg,function(){
            client.end();
        });             
    });        
}

function bin2string(array){
    var result = "";
    for(var i = 0; i < array.length; ++i){
    result+= (String.fromCharCode(array[i]));
    }
    return result;
}

exports.handler = function(context, event) {
    var _event = JSON.parse(JSON.stringify(event));
    var _data = bin2string(_event.body.data);

    context.callback("feedback "+_data);

    var hum = parseInt(_data)
    if(hum >= 95){
        axios.post(iftttEndpoint, {})
    }

    console.log("TRIGGER "+_data);
    send_feedback_mqtt("Invoked Function MQTT: "+FUNCTION_NAME+" received "+_data);
};