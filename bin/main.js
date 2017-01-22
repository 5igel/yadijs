'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Dependency type
 * @readonly
 * @enum {number}
 */
var DependencyType = {
  PROVIDER: 0,
  CLASS: 1,
  SINGLE_INSTANCE: 2
};

/** @private */
var defaultDependency = {
  single: null,
  provider: function provider() {}
};

var Container = function () {
  function Container() {
    _classCallCheck(this, Container);

    /** @private */
    this.container_ = [];
  }

  /**
   * Injecting class
   * @param {string} name
   * @param {constructor} provider
   */


  _createClass(Container, [{
    key: 'inject',
    value: function inject(name, provider) {
      this.addDepenency_(name, provider, DependencyType.CLASS);
    }

    /**
     * Injecting function, useful for custom ititialization
     * @param {string} name
     * @param {function} provider
     */

  }, {
    key: 'provide',
    value: function provide( /** string */name, func) {
      this.addDepenency_(name, func, DependencyType.PROVIDER);
    }

    /**
     * Injecting function that would executed only once
     * @param {string} name
     * @param {function} provider
     */

  }, {
    key: 'single',
    value: function single( /** string */name, provider) {
      this.addDepenency_(name, provider, DependencyType.SINGLE_INSTANCE);
    }

    /**
     * Searching for a dependency in the list
     * @param {string} depName
     * @return {Object|undefined}
     */

  }, {
    key: 'get',
    value: function get(depName) {
      var dep = this.findDependency_(depName);
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
        throw new Error('Dependency not found');
      }
    }

    /**
     * Adding dependency to container
     * @param {string} name
     * @param {Function} provider
     * @param {DependencyType} depType
     * @private
     */

  }, {
    key: 'addDepenency_',
    value: function addDepenency_(name, provider, depType) {
      this.container_.push(Object.assign({}, defaultDependency, {
        name: name,
        provider: provider,
        type: depType
      }));
    }

    /**
     * Searching for a dependency in the list
     * @param {string} depName
     * @return {Object|undefined}
     * @private
     */

  }, {
    key: 'findDependency_',
    value: function findDependency_(depName) {
      return this.container_.find(function (dep) {
        return dep.name === depName;
      });
    }
  }]);

  return Container;
}();

module.exports = Container;
