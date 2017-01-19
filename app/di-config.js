const DI = require('easydi/core');
const diContainer = new DI();

const StaticService = require('./ser-a');
const DynamicService = require('./ser-b');

const AsyncService = require('./ser-c');

diContainer.inject('DynamicService', DynamicService);
diContainer.provide('StaticService', function() {
  return StaticService;
});
diContainer.single('AsyncService', function(container) {
  return AsyncService.init(container.get('DynamicService'), container.get('StaticService'));
});

module.exports = diContainer;
