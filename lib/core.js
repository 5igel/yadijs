const defaultDependency = {
  name: '',
  path: '',
  instance: false,
  initiated: false,
  initiator: undefined,
};

class Di {
  constructor(/** Object */config) {
    /** @private */
    this.depsList_ = [];

    //Parsing dependency list, and normalize it
    this.depsList_ = config.map(d => {
      if (d.name && d.path) {
        return Object.assign({}, defaultDependency, d);
      } else {
        let keys = Object.keys(d);
        if (keys.length === 1) {
          return Object.assign({}, defaultDependency, {
            name: keys[0],
            path: d[keys[0]],
          });
        }
      }
    })
  }

  inject(/** string */depName) {
    return new Promise((resolve, reject) => {
      const dep = this.findDependency_(depName);
      if (dep) {
        if(!dep.initiated && dep.initiator) {
          dep.instance = dep.initiator.call(this, require(dep.path));

          if(dep.instance.then && dep.instance.then instanceof Function){
            //return dep.instance;
            //resolve(
            dep.instance
              .then(instance => {
                dep.initiated = true;
                return instance;
              })
              .then(a => {
                4
              })
            //)


          } else {
            dep.initiated = true;
          }
        } else if(!dep.initiated) {
          dep.initiated = true;
          dep.instance = require(dep.path);
        }

        resolve(dep.instance);
      } else {
        console.error('Dependency not found', depName);
        reject('Dependency not found')
      }
    })
  }

  provide(deps){
    return Promise.all(deps.map(dep => this.inject(dep)))
  }

  /**
   * Searching for a dependency in the list
   * @param {string} depName
   * @return {Object|undefined}
   * @private
   */
  findDependency_(depName) {
    return this.depsList_.find(dep => {
      return dep.name === depName;
    });
  }
}

module.exports = Di;