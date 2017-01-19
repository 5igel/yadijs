/**
 * Dependency type
 * @readonly
 * @enum {number}
 */
const DependencyType = {
  PROVIDER: 0,
  CLASS: 1,
  SINGLE_INSTANCE: 2,
};

/** @private */
const defaultDependency = {
  single: null,
  provider: function() {},
};

class Container {
  constructor() {
    /** @private */
    this.container_ = [];
  }

  /**
   * Injecting class
   * @param {string} name
   * @param {constructor} provider
   */
  inject(name, provider) {
    this.addDepenency_(name, provider, DependencyType.CLASS);
  }

  /**
   * Injecting function, useful for custom ititialization
   * @param {string} name
   * @param {function} provider
   */
  provide(/** string */name, func) {
    this.addDepenency_(name, func, DependencyType.PROVIDER);
  }

  /**
   * Injecting function that would executed only once
   * @param {string} name
   * @param {function} provider
   */
  single(/** string */name, provider) {
    this.addDepenency_(name, provider, DependencyType.SINGLE_INSTANCE);
  }

  /**
   * Searching for a dependency in the list
   * @param {string} depName
   * @return {Object|undefined}
   * @private
   */
  get(depName) {
    const dep = this.findDependency_(depName);
    if (dep) {
      switch (dep.type) {
        case DependencyType.CLASS:
          return new dep.provider();
          break;

        case DependencyType.PROVIDER:
          return dep.provider.call(this, this);
          break;

        case DependencyType.SINGLE_INSTANCE:
          if (dep.single === null) {
            dep.single = dep.provider.call(this, this);
          }
          return dep.single;
          break;
      }
    } else {
      console.error('Dependency not found', depName);
      throw new Error('Dependency not found')
    }
  }

  /**
   * Adding dependency to container
   * @param {string} name
   * @param {Function} provider
   * @param {DependencyType} depType
   * @private
   */
  addDepenency_(name, provider, depType) {
    this.container_.push(Object.assign(
      {},
      defaultDependency,
      {
        name,
        provider,
        type: depType,
      }
    ));
  }

  /**
   * Searching for a dependency in the list
   * @param {string} depName
   * @return {Object|undefined}
   * @private
   */
  findDependency_(depName) {
    return this.container_.find(dep => {
      return dep.name === depName;
    });
  }
}

module.exports = Container;