class SingleInstanceClass {
  constructor(){
    console.log('Single instance class');
  }

  getData(){
    console.log('Hello I`m Single instance class');
  }
}

module.exports = SingleInstanceClass;