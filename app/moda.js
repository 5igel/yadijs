const diContainer = require('./di-config');
const SerA = diContainer.get('StaticService');
const SerB = diContainer.get('DynamicService');
const SerC = diContainer.get('AsyncService');

var A = function () {
  console.log('Init module a');

      SerA.getData();
      SerB.getData();
      SerC.
        then( service => {
          service.getData();
        });

      const SerD = diContainer.get('AsyncService');
      SerD.
        then( service => {
          service.getData();
        });
};

module.exports = A;