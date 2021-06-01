var mqtt    = require('mqtt');

var client  = mqtt.connect("mqtt://MQTT-BROCKER-IP",{clientId:"mqttjsLight01",username: "MQTT-USERNAME",password: "MQTT-PASSWORD"});
console.log("connected flag  " + client.connected);

//handle incoming messages
client.on('message',function(topic, message, packet){
	var setting = "brightness";
	if(topic == topicColor)
		setting = "color"
	console.log(new Date()+": Set "+setting+" "+ message+", topic: "+topic);
});


client.on("connect",function(){	
console.log("connected  "+ client.connected);

})
var topicBrightness="iot/devices/brightness";
var topicColor="iot/devices/color";

console.log("subscribing to topics");
client.subscribe(topicBrightness,{qos:1}); 
client.subscribe(topicColor,{qos:1}); 
