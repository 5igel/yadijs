const DI = require('easydi/core');
const di = require('./di-config');
//const serviceA = di.inject('StaticService');
//const serviceB = di.inject('DynamicService');

class ServiceC {
  static init(){
    return new Promise(resolve => {
      console.log('Init Service C');
      resolve(ServiceC);
    });
  }
  static getData() {
    console.log('Hello I`m service C');
  };
}

module.exports = ServiceC;