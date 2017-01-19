const SimpleClass = require('./simple-class');
const SingleInstanceClass = require('./single-instance-class');
const StaticService = require('./static-service');
const AsyncService = require('./async-service');

const sampleCont = new DI();
sampleCont.inject('SimpleClass', SimpleClass);
sampleCont.single('SingleInstanceClass', function() {
  return new SingleInstanceClass();
});
sampleCont.provide('StaticService', function() {
  return StaticService;
});
sampleCont.single('AsyncService', function(container) {
  return AsyncService.init(container.get('SimpleClass'), container.get('SingleInstanceClass'));
});

module.exports = sampleCont;
