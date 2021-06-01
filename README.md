# SmartEnvironment

AbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstractAbstract

#### Tutorial Structure

* **[Architecture](#architecture)**
* **[Prerequisites](#prerequisites)**
* **[Installation](#installation)**


## Architecture
<p align="center"><img src="architecture/Architecture.png" width="1000"/></p>

## Prerequisites
- OS: 
    - Ubuntu 18.04 LTS
- Software:
    - Docker and Docker Compose (Application containers engine)
    - Nuclio (Serverless computing provider)
    - RabbitMQ (AMQP and MQTT message broker)
    - Node.js

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
### Nuclio 
Start [Nuclio](https://github.com/nuclio/nuclio) using a docker container.

```sh
$ docker run -p 8070:8070 -v /var/run/docker.sock:/var/run/docker.sock -v /tmp:/tmp nuclio/dashboard:stable-amd64
```

----------------------------------------------------------------------------------------------------------------------------

### RabbitMQ 

Start [RabbitMQ](https://www.rabbitmq.com) instance with MQTT enabled using docker.

```sh
$ docker run -p 9000:15672  -p 1883:1883 -p 5672:5672  cyrilix/rabbitmq-mqtt 
```

------------------------------------------------------------------------------------------------------------------------------

### Parameters
In each files replace this strings with you valid parameter<br>
* <b>MQTT-BROKER-IP</b> the ip of the MQTT broker
* <b>MQTT-USERNAME</b> the username for MQTT
* <b>MQTT-PASSWORD</b> the password for MQTT
* <b>IFTTT-KEY</b> the ifttt key that you can find [here]()


For .ino files (files for ESP8266 board)
* <b>WIFI-SSID</b> your WI-Fi ssid
* <b>WIFI-PASSWORD</b> your WI-Fi password 

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
Install MQTT library
```sh
npm install mqtt
```
Start logger
```sh
node logger.js
```

------------------------------------------------------------------------------------------------------------------------------
### Sensors Simulators
Install MQTT library
```sh
npm install mqtt
```
Start simulator
```sh
node light_sensor.js
```
This example takes into consideration only light sensor, you can run all sensors in this [directory](/sensors/simulators). Each simulator generate random numbers.

------------------------------------------------------------------------------------------------------------------------------
### Devices Simulators
Install MQTT library
```sh
npm install mqtt
```
Start simulator
```sh
node light.js
```
------------------------------------------------------------------------------------------------------------------------------

### ESP8266

For run code un ESP8266, you can compile and load .ino files with [Arduino IDE](https://www.arduino.cc/en/software).

------------------------------------------------------------------------------------------------------------------------------

### JS Libraries

For JavaScript MQTT we used this [library](https://www.npmjs.com/package/mqtt)<br>
For HTTP request we used this [library](https://www.npmjs.com/package/axios).

### ESP8266 Libraries

For ESP8266 MQTT we used this [library](https://www.arduino.cc/reference/en/libraries/pubsubclient/).<br>
For ESP8266 temperature and humidity sensor we used this [library](https://www.arduino.cc/reference/en/libraries/dht-sensor-library/).<br>
For ESP8266 WI-FI we used this [library](https://arduino-esp8266.readthedocs.io/en/latest/esp8266wifi/readme.html).

### MQTT Clients

We used a general purpose MQTT client for [Android](https://play.google.com/store/apps/details?id=in.dc297.mqttclpro) or [iOS](https://apps.apple.com/us/app/easymqtt/id1523099606).

-----------------------------------------------------------------------------------------------------------------------------

**Author**
Lorenzo Fasolino
