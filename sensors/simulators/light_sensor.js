
var mqtt = require('mqtt');

var url = 'mqtt://MQTT-BROKER-IP'
var topic="iot/sensors/light"
var connected = false;

var options = {
    port: 1883,
    host: url,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'MQTT-USERNAME',
    password: 'MQTT-PASSWORD',
};

var client = mqtt.connect(url, options);

client.on("connect",function(){
	console.log("connected  "+ client.connected);
	connected = true;
	mainLoop();
})

function sendData(){
	console.log("sendData")
	client.publish(topic, Math.floor(Math.random() * 100).toString());
}

function mainLoop() {
    sendData()
    setTimeout( mainLoop, 5000 );
};













