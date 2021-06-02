
var mqtt = require('mqtt');

console.log(process.env.MQTT_BROKER_IP)

var url = 'mqtt://'+process.env.MQTT_BROKER_IP
var topic="iot/sensors/humidity"
var connected = false;

var options = {
    port: 1883,
    host: url,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
};

var client = mqtt.connect(url, options);

client.on("connect",function(){
	console.log("connected  "+ client.connected);
	connected = true;
	mainLoop();
})

function sendData(){
    var data = Math.floor(Math.random() * 100).toString()
	console.log("HUMIDITY sendData: "+data)
	client.publish(topic, data);
}

function mainLoop() {
    sendData()
    setTimeout( mainLoop, 5000 );
};













