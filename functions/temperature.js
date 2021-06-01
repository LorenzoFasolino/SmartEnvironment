var mqtt = require('mqtt');
const axios = require('axios')

var url = 'mqtt://MQTT-BROKER-IP'
var ifttt_key = "IFTTT-KEY"

var iftttEndpoint = "https://maker.ifttt.com/trigger/burning/with/key/"+ifttt_key

var options = {
    port: 1883,
    host: url,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'MQTT-USERNAME',
    password: 'MQTT-PASSWORD',
};

var FUNCTION_NAME = "temperature";

function send_feedback_mqtt(msg,log){
    var q = 'iot/devices/color';
    var qLog = 'iot/logs';

    var client = mqtt.connect(url, options);

    client.on('connect', function() {
        client.publish(q, msg,function(){
            client.publish(qLog, "Invoked Function MQTT: "+FUNCTION_NAME+" received "+log,function(){
                client.end();
            });
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

    var temp = parseInt(_data)

    var color

    if(temp < 20){
        color = 0;
    }else if(temp >= 20 && temp<=30){
        color = 1;
    }else{
        color = 2;
    }

    if(temp > 45){
      axios.post(iftttEndpoint, {})
    }

    console.log("TRIGGER "+_data);
    send_feedback_mqtt(""+color,""+_data);
};