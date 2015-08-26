var SensorTag = require('sensortag');
var async = require('async');

function onDiscover(sensorTag) {
	console.log('Yo sensorTag: ' + sensorTag.address);

	sensorTag.on('disconnect', function() {
		console.log('disconnected!');
		SensorTag.discover();
	});

	async.series([
      function(callback) {
        console.log('connectAndSetUp');
        sensorTag.connectAndSetUp(callback);
      },
      function(callback) {
        console.log('readDeviceName');
        sensorTag.readDeviceName(function(error, deviceName) {
          console.log('\tdevice name = ' + deviceName);
          callback();
        });
      },
      function(callback) {
        console.log('enableIrTemperature');
        sensorTag.enableIrTemperature(callback);
      },
      function(callback) {
        setTimeout(callback, 2000);
      },
      function(callback) {
	      console.log('readIrTemperature');
	      sensorTag.readIrTemperature(function(error, objectTemperature, ambientTemperature) {
	        console.log('\tobject temperature = %d °C', objectTemperature.toFixed(1));
	        console.log('\tambient temperature = %d °C', ambientTemperature.toFixed(1));

	        callback();
	      });
      },
      function(callback) {
        console.log('enableAccelerometer');
        sensorTag.enableAccelerometer(callback);
      },
      function(callback) {
        setTimeout(callback, 2000);
      },
      function(callback) {
	      console.log('readAccelerometer');
	      sensorTag.readAccelerometer(function(error, x, y, z) {
	        console.log('\tx = %d G', x.toFixed(1));
	        console.log('\ty = %d G', y.toFixed(1));
	        console.log('\tz = %d G', z.toFixed(1));

	        callback();
	      });
	  },
      function(callback) {
        console.log('enableHumidity');
        sensorTag.enableHumidity(callback);
      },
      function(callback) {
        setTimeout(callback, 2000);
      },
      function(callback) {
	      console.log('readHumidity');
	      sensorTag.readHumidity(function(error, temperature, humidity) {
	        console.log('\ttemperature = %d °C', temperature.toFixed(1));
	        console.log('\thumidity = %d %', humidity.toFixed(1));

	        callback();
	      });
      },
      function(callback) {
        console.log('enableBarometricPressure');
        sensorTag.enableBarometricPressure(callback);
      },
      function(callback) {
        setTimeout(callback, 2000);
      },
      function(callback) {
          console.log('readBarometricPressure');
          sensorTag.readBarometricPressure(function(error, pressure) {
            console.log('\tpressure = %d mBar', pressure.toFixed(1));

            callback();
          });
      },
      function(callback) {
        console.log('enableLuxometer');
        sensorTag.enableLuxometer(callback);
      },
      function(callback) {
        setTimeout(callback, 2000);
      },
      function(callback) {
      	console.log('readLuxometer');
		sensorTag.readLuxometer(function(error, lux) {
		  console.log('\tlux = %d', lux.toFixed(1));

		  callback();
		});
      },
     function(callback) {
        console.log('disconnect');
        sensorTag.disconnect(callback);
      }
    ]
  );
}

SensorTag.discover(onDiscover);