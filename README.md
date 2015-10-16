# koop-nl-ovfiets-provider 

## A OpenOV-ovfiets api provider for Koop 

This provider consumes the data on OVfiets stations from OpenOV and makes it available as a FeatureService.

------------

The OVfiets API from Open OV (http://fiets.openov.nl/locaties.json) serves a json file which contains live data on the number of available bikes at train and bus stations in the Netherlands.

The current version of this provider caches the data with koop-pgcache an therefore does not provide the live number of available bikes. And can be fount in the master branch.

The nocache branch contains an extra file: /models/Ovfietswithoutcache.js this is a version without cache, the feature service has some issues with querying the data, sometimes all features are returned.


