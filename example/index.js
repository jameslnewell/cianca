var React = require('react');
var ReactDOM = require('react-dom');

var cianca = require('..');
var Link = cianca.Link;
var Route = cianca.Route;
var Router = cianca.Router;

class Nav extends React.Component {
  render() {
    return <nav>
      <Link name="home">Home</Link>
      <Link name="about">About</Link>
    </nav>;
  }
}

class Home extends React.Component {
  render() {
    return <section>
      <Nav/>
      <h1>Home</h1>
    </section>;
  }
}

class About extends React.Component {
  render() {
    return <section>
      <Nav/>
      <h1>About</h1>
    </section>;
  }
}

ReactDOM.render(
  <Router url={window.location.pathname+window.location.search}>
    <Route name="home" pattern="/" component={Home}/>
    <Route name="about" pattern="/about" component={About}/>
  </Router>,
  document.getElementById('app')
);
