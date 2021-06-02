# SmartEnvironment

SmartEnvironment is a project whose goal is to realize an iot application without using a server. So the main goal is to have a serverless architecture. The main functionality of this project is to set brightness and color of a LED light according to the conditions of the surrounding environment. So the idea is to have the brightness of the LED light that is inversely proportional to the ambient brightness in order to always have a constant brightness, in a room, during the different hours of the day. Moreover the color of the light can change according to the ambient temperature, if the temperature is cold, the color of LED light is warm and vice versa. 
For the realization of the idea I have used an MQTT broker, and different sensors can send their values on different queues. In this architecture there are three sensors, light sensor, temperature sensor and humidity sensor. Each of these publish a message on an MQTT topic. Then there are three nuclio functions, one for each sensor, each of which is subscribed to the related topic. When a function, that is subscribed to a topic, receives a message, it sends a value of the brightness or of the color which must be set. All sensors messages are captured by a logger which stores messages and all values can be monitored on a smartphone. Moreover if the temperature or humidity are too high an alert email is sent.

#### Structure

* **[Architecture](#architecture)**
* **[Prerequisites](#prerequisites)**
* **[Installation](#installation)**


## Architecture
<p align="center"><img src="architecture/Architecture.png" width="1000"/></p>

* <b>Sensors</b>: there are light, temperature and humidity sensors that send their values on differents MQTT topics.
* <b>Devices</b>:
  * <b>LED light</b> that is subscibed to topics, where recive messages for change brightness and color
  * <b>logger</b> recive informations about sensors values
  * <b>monitor</b> a smartphone that can recive information ablut sensors values
* <b>Nuclio functions</b>:
  * <b>light</b> is triggred by message on topic "iot/sensors/light", when message arrive, it publish a message on topic "iot/devices/brightness" to signal the right brightness to be set
  * <b>temperature</b> is triggred by message on topic "iot/sensors/temperature", when message arrive, it publish a message on topic "iot/devices/color" to signal the right color to be set. If temperature if too high an IFTT applet if trggered by REST API for send an alert e-mail
  * <b>monitor</b> If the humidity if too high an IFTT applet if trggered by REST API for send an alert e-mail

<br><br>

## Prerequisites
- OS: 
    - Ubuntu 21.04
- Software:
    - Docker and Docker Compose (Application containers engine)
    - Nuclio (Serverless computing provider)
    - RabbitMQ (AMQP and MQTT message broker)
    - Node.js
    - IFTTT account
- Hardware (<b>optional</b>):
    - 2 x ESP8266
    - 1 DHT11 sensor
    - 1 Analog light sensor
    - 1 RGB LED stripe

You don't have to have hardware requirements, if you don't have these, you can run the project with simulators for [devices](/devices/simulators/) and [sensors](/sensors/simulators/).

<br><br>

## Installation

### Docker
Install [Docker](https://www.docker.com) using the Docker CE installation [guide](https://docs.docker.com/install/linux/docker-ce/ubuntu/#extra-steps-for-aufs).

```sh
$ sudo apt-get update
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
$ echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
$ sudo apt-get update
$ sudo apt-get install docker-ce
```

------------------------------------------------------------------------------------------------------------------------------

### Docker Compose

Install Docker Compose using the Docker Compose installation [guide](https://docs.docker.com/compose/install/#install-compose).

```sh
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
```

----------------------------------------------------------------------------------------------------------------------------


### Nuclio 
Start [Nuclio](https://github.com/nuclio/nuclio) using a docker container.

```sh
$ docker run -p 8070:8070 -v /var/run/docker.sock:/var/run/docker.sock -v /tmp:/tmp nuclio/dashboard:stable-amd64
```

Browse to http://localhost:8070.

----------------------------------------------------------------------------------------------------------------------------

### RabbitMQ 

Start [RabbitMQ](https://www.rabbitmq.com) instance with MQTT enabled using docker.

```sh
$ docker run -p 9000:15672  -p 1883:1883 -p 5672:5672  cyrilix/rabbitmq-mqtt 
```

Browse to http://localhost:9000. The default username is <b>guest</b>, and the password is <b>guest</b>

------------------------------------------------------------------------------------------------------------------------------
### Node.JS
If you haven't Node.JS, you heve to install it. <br>
Install [Node.JS](https://nodejs.org/it/).

```sh
sudo apt install nodejs
```

------------------------------------------------------------------------------------------------------------------------------
### IFTTT 

You have to create two new applet. <br>
<b>Attention:</b> You have to create two applets that are similar. But for the first the event name must be "<b>burning</b>" and for the second, the event name must be "<b>humidity</b>".
* For trigger use WebHookes in "if" section:
<p align="center"><img src="assets/WebHooks.PNG" width="200"/></p>

* For action use Gmail in "than" section:
<p align="center"><img src="assets/Gmail.PNG" width="200"/></p>

------------------------------------------------------------------------------------------------------------------------------

### Parameters
In each files replace this strings with you valid parameter<br>
* <b>MQTT-BROKER-IP</b> the ip of the MQTT broker
* <b>MQTT-USERNAME</b> the username for MQTT
* <b>MQTT-PASSWORD</b> the password for MQTT
* <b>IFTTT-KEY</b> the ifttt key that you can find [here](https://ifttt.com/maker_webhooks). (click on _Documentation_ in top right corner)


For .ino files (files for ESP8266 board)
* <b>WIFI-SSID</b> your WI-Fi ssid
* <b>WIFI-PASSWORD</b> your WI-Fi password 

<b>Attention:</b> files you have to modity are .env, all .ino file and all .yaml files

------------------------------------------------------------------------------------------------------------------------------

### Nuclio function
1. Set up in all .yaml files,in this [directory](/functions/), the required [parameters](#parameters)
2. Open nuclio Dashboard http://localhost:8070
3. Create a new nuclio project
4. Inside the project click on <b>NEW FUNCTION</b>
5. Import each .yaml file that is in functions [directory](/functions), one by one
6. Set up [parameters](#parameters) in each function
7. Deploy each function


------------------------------------------------------------------------------------------------------------------------------

### Logger
Start logger
```sh
node logger/logger.js
```

<b>Attention:</b> [Install](#js-libraries) MQTT and dotenv Node.JS libraries if you haven't installed it yet.

------------------------------------------------------------------------------------------------------------------------------
### Sensors Simulators
Start simulator
```sh
node sensors/simulators/light_sensor.js
```
This example takes into consideration only light sensor, you can run all sensors in this [directory](/sensors/simulators). Each simulator generate random numbers.<br>
<b>Attention:</b> [Install](#js-libraries) MQTT and dotenv Node.JS libraries if you haven't installed it yet.

------------------------------------------------------------------------------------------------------------------------------
### Devices Simulators
Start simulator
```sh
node devices/simulators/light.js
```

<b>Attention:</b> [Install](#js-libraries) MQTT and dotenv Node.JS libraries if you haven't installed it yet.

------------------------------------------------------------------------------------------------------------------------------

### ESP8266

For run code on ESP8266, you can compile and load .ino files with [Arduino IDE](https://www.arduino.cc/en/software).

------------------------------------------------------------------------------------------------------------------------------

### JS Libraries

For JavaScript MQTT I used this [library](https://www.npmjs.com/package/mqtt)<br>
For HTTP request I used this [library](https://www.npmjs.com/package/axios).<br>
For read .env file I used this [library](https://www.npmjs.com/package/dotenv).

For install MQTT library:
```sh
npm install mqtt
```
For install dotenv library:
```sh
npm install dotenv
```

### ESP8266 Libraries

For ESP8266 MQTT I used this [library](https://www.arduino.cc/reference/en/libraries/pubsubclient/).<br>
For ESP8266 temperature and humidity sensor I used this [library](https://www.arduino.cc/reference/en/libraries/dht-sensor-library/).<br>
For ESP8266 WI-FI I used this [library](https://arduino-esp8266.readthedocs.io/en/latest/esp8266wifi/readme.html).

### MQTT Clients

We used a general purpose MQTT client for [Android](https://play.google.com/store/apps/details?id=in.dc297.mqttclpro) or [iOS](https://apps.apple.com/us/app/easymqtt/id1523099606).

-----------------------------------------------------------------------------------------------------------------------------

**Author**
Lorenzo Fasolino
