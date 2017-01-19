const sampleCont = require('./sample-container');
const SimpleClass = sampleCont.get('SimpleClass');
const SingleInstanceClass = sampleCont.get('SingleInstanceClass');
const SameSingleInstanceClass = sampleCont.get('SingleInstanceClass');
const StaticService = sampleCont.get('StaticService');
const AsyncService = sampleCont.get('AsyncService');

var moduleExample = function () {
  console.log('Init module a');

  SimpleClass.getData();
  SingleInstanceClass.getData();
  SameSingleInstanceClass.getData();
  StaticService.getData();
  AsyncService.
      then( service => {
        service.getData();
      });
};

module.exports = moduleExample;