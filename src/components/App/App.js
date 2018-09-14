import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Library from '../Library/Library';
import Album from '../Album/Album';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <Link to="/">Landing</Link>
            <Link to="/library">Library</Link>
          </nav>
          <h1>Bloc Jams</h1>
        </header>
        <main>
          <Route exact path="/" component={ Landing } />
          <Route path="/library" component={ Library } />
          <Route path="/album/:slug" component={ Album } />
        </main>
      </div>
    );
  }
}

export default App;
