#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <stdlib.h>
#include <DHT.h>


#define DHTPIN 4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "WIFI-SSID";
const char* password =  "WIFI-PASSWORD";

const char* mqttServer = "MQTT-BROKER-IP";
const int mqttPort = 1883;
const char* mqttUser = "MQTT-USERNAME";
const char* mqttPassword = "MQTT-PASSWORD";

WiFiClient espClient;
PubSubClient client(espClient);

int light = 0; 
int temp,hum;



void setup() {
    Serial.begin(115200);


    WiFi.begin(ssid, password);
 
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.println("Connecting to WiFi..");
    }
    Serial.println("Connected to the WiFi network");
   
    client.setServer(mqttServer, mqttPort);
    //client.setCallback(callback);
   
    while (!client.connected()) {
      Serial.println("Connecting to MQTT...");
   
      if (client.connect("ESP8266Client", mqttUser, mqttPassword )) {
   
        Serial.println("connected"); 
   
      } else {
   
        Serial.print("failed with state ");
        Serial.print(client.state());
        delay(2000);
   
      }
    }

}

void loop() {
    light = analogRead(A0); 
    temp = dht.readTemperature();
    hum = dht.readHumidity();

    light = map(light,1024,2,0,100);
    
    char lightStr[3];
    char tempStr[3];
    char humtStr[3];
    itoa(light,lightStr,10);
    itoa(temp,tempStr,10);
    itoa(hum,humtStr,10);

    client.publish("iot/sensors/light", lightStr);
    client.publish("iot/sensors/temperature", tempStr);
    client.publish("iot/sensors/humidity", humtStr);
    
    delay(5000);
}
