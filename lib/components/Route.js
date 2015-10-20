import React from 'react'

export default class Route extends React.Component {
  render() {
    return null;
  }
}

Route.propTypes = {
  name:       React.PropTypes.string,
  pattern:    React.PropTypes.string.isRequired,
  component:  React.PropTypes.func.isRequired
};
