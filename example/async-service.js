const diContainer = require('./sample-container');


class AsyncService {
  static init(serA, serB){
    console.log('Async Service inited');
    return new Promise(resolve => {
      setTimeout(()=>{
        serA.getData();
        serB.getData();

        resolve(AsyncService);
      }, 1000)
    })
  }

  static getData() {
    console.log('Hello I`m service C');
  };
}

module.exports = AsyncService;