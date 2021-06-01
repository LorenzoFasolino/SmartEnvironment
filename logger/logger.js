var mqtt    = require('mqtt');

var client  = mqtt.connect("mqtt://MQTT-BROKER-IP",{clientId:"mqttjs01",username: "MQTT-USERNAME",password: "MQTT-PASSWORD"});
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
