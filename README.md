# cianca

An isomorphic router for React.

Named after [Vic Cianca](https://www.youtube.com/watch?v=nSt4J2QxQgs) - Pittsburgh's Dancing Traffic Cop.

###### Why create a new router for react when `react-router` already exists?

- **Named routes** &mdash; So I don't have to manually insert params into a string and so I don't have to go and update all my links whenever a route pattern changes
  
- **Store additional information about a route** &mdash; e.g. a status codes for server side rendering, or function for server side initialisation

## Installation

    npm install --save cianca

## Usage

    var React = require('react');
    var ReactDOM = require('react-dom');
    
    var cianca = require('cianca');
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
