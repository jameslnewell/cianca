var React = require('react');

export default class Context extends React.Component {

  getChildContext() {
    return {
      router:   this.props.router,
      location: this.props.location
    };
  }

  render() {
    var {router, location, component, ...props} = this.props;
    return React.createElement(component, props);
  }

}

Context.childContextTypes = {
  router:       React.PropTypes.object.isRequired,
  location:     React.PropTypes.object
};

Context.propTypes = {
  router:       React.PropTypes.object.isRequired,
  location:     React.PropTypes.object,
  component:    React.PropTypes.func.isRequired
};