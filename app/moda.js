const di = require('./di-config');


var A = function () {
  // const serviceA = di.inject();
  // const serviceB = di.inject();
  // const serviceC = di.inject();

  console.log('Init module a');
  //depends on Service
  //var a = di.provide(['StaticService', 'DynamicService', 'AsyncService']);
  //console.log(a);

  di.provide(['StaticService', 'DynamicService', 'AsyncService'])
    .then(([serA, serB, serC]) => {
      serA.getData();
      serB.getData();
      serC.getData();
    })
    .catch(e => {
      console.log(e)
    });
 // var dataSerB = serviceB.getData();
};

module.exports = A;