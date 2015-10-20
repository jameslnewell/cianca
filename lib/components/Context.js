var React = require('react');

export default class ContextComponent extends React.Component {

  getChildContext() {
    return {
      router:   this.props.router,
      location: this.props.location
    };
  }

  render() {
    var {router, location, container, component, ...props} = this.props;
    return <component {...props}/>;
  }

}

ContextComponent.childContextTypes = {
  router:       React.PropTypes.object.isRequired,
  location:     React.PropTypes.object
};

ContextComponent.propTypes = {
  router:       React.PropTypes.object.isRequired,
  location:     React.PropTypes.object,
  component:    React.PropTypes.func.isRequired
};