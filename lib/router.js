var React = require('react');
var router = require('no-frills-router');
var Container = require('./components/Container');
var extend = require('extend');

/**
 * Router
 * @constructor
 * @returns {Router}
 */
function Router() {

  if (!(this instanceof Router)) {
    return new Router();
  }

  /**
   * The router
   * @private
   * @type {router}
   */
  this._router = router();

}

Router.prototype = {

  /**
   * Map a URL pattern to a component
   * @param   {string}          [name]
   * @param   {string|RegExp}   pattern
   * @param   {React.Component} component
   * @param   {Object}          [context]
   * @returns {Router}
   */
  map: function(name, pattern, component, context) {
    this._router.map.apply(this._router, arguments);
    return this;
  },

  /**
   * Match a URL to a component
   * @param   {string}    url       The URL
   * @param   {object}    context
   * @returns {Router}
   */
  match: function(url, context) {
    var match = this._router.match(url);

    //check if there is a route
    if (!match) {
      return match;
    }

    match.component = React.createElement(Container, extend({}, context, {

      //TODO: pass through other match properties?
      name:       match.name,
      params:     match.params,

      router:     this,
      component:  match.handler

    }));

    delete match.handler;

    return match;
  },

  /**
   * Assemble a URL to a component
   * @param name
   * @param params
   * @returns {*|string|null}
   */
  assemble: function(name, params) {
    return this._router.assemble(name, params);
  }

};

Object.defineProperty(Router.prototype, 'routes', {
  get: function() {
    return this._router.routes;
  }
});

module.exports = Router;