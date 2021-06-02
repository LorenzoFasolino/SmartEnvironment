var mqtt = require('mqtt');
require('dotenv').config()


var client  = mqtt.connect("mqtt://"+process.env.MQTT_BROCKER_IP,{clientId:"mqttjs01",username: process.env.MQTT_USERNAME,password: process.env.MQTT_PASSWORD});
console.log("connected flag  " + client.connected);

//handle incoming messages
client.on('message',function(topic, message, packet){
	console.log(new Date()+": message is "+ message+", topic: "+topic);
});


client.on("connect",function(){	
console.log("connected  "+ client.connected);

})
var topic="iot/logs";
console.log("subscribing to topics");
client.subscribe(topic,{qos:1}); 
