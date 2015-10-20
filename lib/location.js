var util = require('util');
var EventEmitter = require('events').EventEmitter;

//check whether the HTML5 History is supported in the current environment
var supported = typeof window !== 'undefined' && typeof window.history !== 'undefined';

/**
 * Location
 * @constructor
 */
function Location() {
  this.onPopState = this.onPopState.bind(this);
}
util.inherits(Location, EventEmitter);

/**
 * Start listening for location events
 * @returns {Location}
 */
Location.prototype.register = function() {
  if (supported) {
    window.addEventListener('popstate', this.onPopState);
  }
  return this;
};

/**
 * Stop listening for location events
 * @returns {Location}
 */
Location.prototype.unregister = function() {
  if (supported) {
    window.removeEventListener('popstate', this.onPopState);
  }
  return this;
};

/**
 * Navigate to a URL
 * @param   {string} url
 * @returns {Location}
 */
Location.prototype.navigate = function(url) {
  if (supported) {
    window.history.pushState({}, null, url);
    this.onPopState({state: {}});
  }
  return this;
};

/**
 * Handle navigate events
 * @param {} event
 */
Location.prototype.onPopState = function(event) {
  if (event.state) {//state is null on page load
    this.emit('changed', document.location.pathname + document.location.search);
  }
};

module.exports = Location;