import React from 'react'
import extend from 'extend'

import Context from './Context';
import Router from '../router';
import Location from '../location';

/**
 * A router component
 */
export default class Component extends React.Component {

  /**
   * Construct the router
   * @constructor
   * @param   {Object} props
   * @param   {Object} context
   */
  constructor(props, context) {
    super(props, context);

    //initialise the router
    if (this.props.router) {
      this.router = this.props.router;
    } else {
      this.router = new Router();
    }

    //initialise the location
    if (this.props.location) {
      this.location = this.props.location;
    } else {
      this.location = new Location();
    }

    //create routes from children
    var self = this;
    React.Children.forEach(this.props.children, function(child) {
      if (React.isValidElement(child)) {
        self.router.map(child.props.name, child.props.pattern, child.props.component);
      }
    });

    //set the initial state
    this.state = {
      match: this.router.match(this.props.url, extend({}, this.props.context, {
        router:   this,
        location: this.location
      }))
    };

    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentWillMount() {

    //start listening for location changes
    if (this.location) {
      this.location
        .register()
        .on('changed', this.handleLocationChange)
      ;
    }

  }

  componentWillUnmount() {

    //stop listening for location changes
    if (this.location) {
      this.location
        .off('changed', this.handleLocationChange)
        .unregister()
      ;
    }

  }

  handleLocationChange(url) {
    this.setState({
      match: this.router.match(url, extend({}, this.props.context, {
        router:   this,
        location: this.location
      }))
    });
  }

  render() {
    var match = this.state.match;

    //TODO: error handling?
    if (!match) {
      return <div>
        <h1>Page not found!</h1>
        <p>No route was matched.</p>
      </div>;
    }

    return match.component;
  }

}

Component.propTypes = {
  url:      React.PropTypes.string.isRequired,  //TODO: need to prefix with initial?
  router:   React.PropTypes.object,
  location: React.PropTypes.object,
  context:  React.PropTypes.object
};

Component.defaultProps = {
  url:      '/'                                 //TODO: need to prefix with initial?
};

//TODO: render layers of views like react-router
//TODO: wait for async tasks on server side before rendering
//TODO: clean up creation of routes