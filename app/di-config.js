const DI = require('easydi/core');

module.exports = new DI([
  {'StaticService': 'app/ser-a'},
  {
    name: 'DynamicService',
    path: 'app/ser-b',
    initiator: function(Service) {
      return new Service();
    }
  },
  {
    name: 'AsyncService',
    path: 'app/ser-c',
    initiator: function(Service) {
      return Service.init();
    }
  },
]);