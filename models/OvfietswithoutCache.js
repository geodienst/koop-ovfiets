var request = require('request');

var Ovfiets = function( koop ){

  var ovfiets = {};
  ovfiets.__proto__ = koop.BaseModel( koop );
  
  // adds a service to the Cache.db
  // needs a host, generates an id 
  ovfiets.register = function (id, host, callback) {
    var type = 'ovfiets';
    koop.Cache.db.serviceCount( type, function (error, count) {
      id = id || count++;
      koop.Cache.db.serviceRegister( type, {'id': id, 'host': host},  function (err, success) {
        callback( err, id );
      });
    });
  };
  // get service by id, no id == return all
  ovfiets.find = function( id, options,callback ){
	  var options = options;
    
	var type = 'Ovfiets';
			
		  
			// if we get an err then get the data and insert it 
			koop.Cache.db.serviceGet( 'ovfiets', parseInt(id) || id, function(err, service){
			
				if (err){
					callback('No service table found for that id. Try POSTing {"id":"arcgis", "host":"http://www.arcgis.com"} to /jsonurl', null);
				} 
				else {
					var url = service.host;
					console.log(url);
					request.get(url, function(e, res){
					  var json = JSON.parse(res.body);
					  var geojson = {"type": "FeatureCollection","features": []	};
					  for (var i in json.locaties){	
						//"ck001": {"name": "OV-fiets", "extra": {"fetchTime": 1444988292, "rentalBikes": "14", "locationCode": "ck001"}, "lat": 51.72659, "link": {"params": {}, "uri": "https://places.ns-mlab.nl/api/v2/places/station-retail/OV-fiets-ck001"}, "stationCode": "CK", "openingHours": [{"dayOfWeek": 1, "endTime": "00:00", "startTime": "00:00"}, {"dayOfWeek": 2, "endTime": "00:00", "startTime": "00:00"}, {"dayOfWeek": 3, "endTime": "00:00", "startTime": "00:00"}, {"dayOfWeek": 4, "endTime": "00:00", "startTime": "00:00"}, {"dayOfWeek": 5, "endTime": "00:00", "startTime": "00:00"}, {"dayOfWeek": 6, "endTime": "00:00", "startTime": "00:00"}, {"dayOfWeek": 7, "endTime": "00:00", "startTime": "00:00"} ], "lng": 5.87423, "open": "Yes", "description": "Cuijk"}, 						  var feature = {
							var feature = {
							"type": "Feature",
							"geometry": {
								"type": "Point",
								"coordinates": [
									parseFloat(json.locaties[i].lng),parseFloat(json.locaties[i].lat)
								]
							},
							"properties": json.locaties[i]
						  }
						  delete feature.properties.lng;
						  delete feature.properties.lat;
						  feature.properties.locationCode = i;
						  if (feature.properties.extra && feature.properties.extra.rentalBikes){
						  	  feature.properties.rentalBikes = parseInt(feature.properties.extra.rentalBikes);		
						  }
						  else{
						  	feature.properties.rentalBikes = null;
						  }
						  delete feature.properties.name;
						  delete feature.properties.extra;
						  delete feature.properties.fetchTime;
						  delete feature.properties.link;
						  delete feature.properties.params;
						  delete feature.properties.uri;
						  delete feature.properties.openingHours;
						  geojson.features.push(feature);
					  }
					  callback(null, [geojson])
					  });
					}
					
				  }); 
		
	
      
  }

  
  
  return ovfiets;

};

module.exports = Ovfiets;
