// Defines the routes and params name that will be passed in req.params 
// routes tell Koop what controller method should handle what request route

module.exports = {
  // route : handler
  'post /ovfiets': 'register',
  'get /ovfiets': 'index',
  'get /ovfiets/:id/FeatureServer': 'featureserver',
  'get /ovfiets/:id/FeatureServer/:layer': 'featureserver',
  'get /ovfiets/:id/FeatureServer/:layer/:method': 'featureserver',
  'post /ovfiets/:id/FeatureServer': 'featureserver',
  'post /ovfiets/:id/FeatureServer/:layer': 'featureserver',
  'post /ovfiets/:id/FeatureServer/:layer/:method': 'featureserver'
}
