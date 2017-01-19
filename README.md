[yadiJS](https://github.com/5igel/yadijs) — Yet Another Dependency Injector
==================================================

Install
--------------------------------------

`npm install -S https://github.com/5igel/yadijs`


Examples
--------------------------------------

Examples are located in `example` folder, here you find most common usa cases


Getting Started
--------------------------------------

Create instance of container by simple constructing it
```js
const Di = require('yadijs');
const myCont = new Di();
```

Inject class dependency use `inject`, use it for everything with `new`
```js
const SomeClass = require('someclass');
myCont.inject('InterfaceName', SomeClass);
```

Inject as single instance
```js
const SomeSingleClass = require('somesinngleclass');
myCont.single('InterfaceName', SomeSingleClass);
```

For custom injection logic use `provide`
Inject as single instance
```js
sampleCont.single('AsyncService', function(container) {
  return AsyncService.init(container.get('SimpleClass'), container.get('SingleInstanceClass'));
});
```

Resolving dependency by calling `get`
```js
const someDep = myCont.get('InterfaceName');
```