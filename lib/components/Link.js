import React from 'react'

export default class Link extends React.Component {

  getHref() {
    if (this.context.router) {
      return this.context.router.assemble(this.props.name, this.props.params);
    } else {
      console.error('Context does not contain a router', this.context.router);
    }
  }

  handleClick(event) {
    if (this.context.location) {
      event.preventDefault();
      this.context.location.navigate(this.getHref());
    }
  }

  render() {
    var {name, ...props} = this.props;
    return <a href={this.getHref()} onClick={this.handleClick.bind(this)} {...props}>
      {this.props.children}
    </a>;
  }

};

Link.contextTypes = {
  router:   React.PropTypes.object.isRequired,
  location: React.PropTypes.object
};

Link.propTypes = {
  name:   React.PropTypes.string.isRequired,
  params: React.PropTypes.object
};

Link.defaultProps = {
  params: {}
};