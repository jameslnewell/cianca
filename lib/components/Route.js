import React from 'react'

export default class RouteComponent extends React.Component {

  render() {
    return null;
  }

}

RouteComponent.propTypes = {
  name:       React.PropTypes.string,
  pattern:    React.PropTypes.string.isRequired,
  component:  React.PropTypes.func.isRequired
};
