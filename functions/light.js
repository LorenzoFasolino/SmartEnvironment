var mqtt = require('mqtt');

var url = 'mqtt://MQTT-BROKER-IP'

var options = {
    port: 1883,
    host: url,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'MQTT-USERNAME',
    password: 'MQTT-PASSWORD',
};

var FUNCTION_NAME = "light";

function send_feedback_mqtt(msg,log){
    var q = 'iot/devices/brightness';
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

    var dataToSend = 100-parseInt(_data)


    console.log("TRIGGER "+_data);
    send_feedback_mqtt(""+dataToSend,""+_data);
};