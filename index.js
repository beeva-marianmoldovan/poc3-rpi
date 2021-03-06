var SensorTag = require('sensortag');
var async = require('async');
var _ = require('lodash');

var pool = ['b0:b4:48:b8:55:86', 'b0:b4:48:b8:6b:06'];
var programNext = _.debounce(discoverNextDevice, 3000);

function discoverNextDevice(){
	if(pool.length < 1){
    		process.exit(1);
    }
	SensorTag.discoverByAddress(pool[0], onDiscover);
	console.log('discovering', pool[0]);
	pool.splice(0, 1);
	programNext();
}

function onDiscover(sensorTag) {
	programNext.cancel();
	console.log('Yo sensorTag: ' + sensorTag.address);

	sensorTag.on('disconnect', function() {
		console.log('disconnected!');
		if(pool.length > 0){
			discoverNextDevice();
		}
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
          callback(null, {'id' : sensorTag.id});
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

	        callback(null, {'object_temperature' : objectTemperature.toFixed(1), 'ambient_temperature' : ambientTemperature.toFixed(1)});
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

	        callback(null, {'temperature' : temperature.toFixed(1), 'humidity' : humidity.toFixed(1)});
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

	        callback(null, {'pressure' : pressure.toFixed(1)});
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

	        callback(null, {'lux' : lux.toFixed(1)});
		});
      },
     function(callback) {
        console.log('disconnect');
        sensorTag.disconnect(callback);
      }
    ],
    function(err, results){
    	results = _.compact(results);
    	var data = {};
    	results.forEach(function(element, index){
    		_.merge(data, element);
    	});
    	console.log(data);

    	if(pool.length < 1)
    		process.exit(1);
    }
  );
}


discoverNextDevice();