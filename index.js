var SensorTag = require('sensortag');

function onDiscover(sensorTag) {
	console.log("YO!");
	sensorTag.connectAndSetup(function () {
	    console.log('Connect and setup');
	    sensorTag.readDeviceName(function (error, deviceName) {
	    	console.log(deviceName, sensorTag.type, sensorTag.uuid, sensorTag.address);
	    });
	    sensorTag.enableIrTemperature(function(error) {
	    	sensorTag.readIrTemperature(function(error, objectTemperature, ambientTemperature) {
	    		console.log(error, objectTemperature, 'object temp', ambientTemperature, 'ambient temp');
	    	});
	    });
	    sensorTag.enableHumidity(function(error) {
	    	sensorTag.readHumidity(function(error, temperature, humidity) {
		    	console.log(error, temperature, 'temp', humidity, 'humidity');
		    });
	    });
	    sensorTag.enableBarometricPressure(function(error) {
		    sensorTag.readBarometricPressure(function(error, pressure) {
		    	console.log(error, pressure, 'pressure');
		    });
	    });
	    sensorTag.enableLuxometer(function(error) {
	    	sensorTag.readLuxometer(function(error, lux) {
		    	console.log(error, lux, 'lux');
		    });
	    });
  	});
}

SensorTag.discover(onDiscover);