const diContainer = require('./di-config');


class ServiceC {
  static init(serA, serB){
    console.log('Service C inited');
    return new Promise(resolve => {
      setTimeout(()=>{
        serA.getData();
        serB.getData();

        resolve(ServiceC);
      }, 1000)
    })
  }

  static getData() {
    console.log('Hello I`m service C');
  };
}

module.exports = ServiceC;