class ServiceB {
  constructor(){
    console.log('Service B constructed');
  }

  getData() {
    console.log('Hello I`m service B');
  };
}

module.exports = ServiceB;