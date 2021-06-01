#include <RGBLed.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

int portarossa = 13; 
int portaverde = 12; 
int portablu = 14;

const char* ssid = "WIFI-SSID";
const char* password =  "WIFI-PASSWORD";

const char* mqttServer = "MQTT-BROKER-IP";
const int mqttPort = 1883;
const char* mqttUser = "MQTT-USERNAME";
const char* mqttPassword = "MQTT-PASSWORD";
const char* topicBrightness = "iot/devices/brightness";
const char* topicColor = "iot/devices/color";

String msgIn = "";
int brigh,color;
int red=255;
int green=255;
int blue=255;


WiFiClient espClient;
PubSubClient client(espClient);

RGBLed led(13, 12, 14, RGBLed::COMMON_CATHODE);

void callback(char* topic, byte* payload, unsigned int length) {
  msgIn = "";
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    msgIn = msgIn + ((char)payload[i]);
  }

  if(strcmp(topic,topicBrightness)==0){

    brigh = msgIn.toInt();
    led.brightness(red, green, blue, brigh);
  
  }
  if(strcmp(topic,topicColor)==0){

    color = msgIn.toInt();

    switch(color){

      case 0: red=255;green=118;blue=0; led.brightness(red, green, blue, brigh);  break;
      case 1: red=252;green=178;blue=50; led.brightness(red, green, blue, brigh);  break;
      case 2: red=252;green=255;blue=255; led.brightness(red, green, blue, brigh);  break;
      default: led.brightness(RGBLed::WHITE, brigh); break;
    }
    
  
  }
  
  Serial.println(msgIn);
  
}

void setup()
{
   // put your setup code here, to run once:
    Serial.begin(115200); //configure serial to talk to computer

    //THSensor.begin(SENSOR_PIN);

    WiFi.begin(ssid, password);
 
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.println("Connecting to WiFi..");
    }
    Serial.println("Connected to the WiFi network");
   
    client.setServer(mqttServer, mqttPort);
    client.setCallback(callback);
   
    while (!client.connected()) {
      Serial.println("Connecting to MQTT...");
   
      if (client.connect("LEDClient", mqttUser, mqttPassword )) {
   
        Serial.println("connected"); 
        client.subscribe(topicBrightness);
        client.subscribe(topicColor);
   
      } else {
   
        Serial.print("failed with state ");
        Serial.print(client.state());
        delay(2000);
   
      }
    }
}

void loop()
{
  client.loop();
}
