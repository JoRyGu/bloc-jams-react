import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Library from '../Library/Library';
import Album from '../Album/Album';
import assets from '../../data/assets';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: assets.blocLogo,
      background: assets.background
    }
  }
  
  render() {
    return (
      <div className="App" >
        <header>
          <nav>
            <img src={this.state.logo} alt="bloc jams logo" />
            <div className="link-wrapper">
              <Link className="navLink" to="/">Landing</Link>
              <Link className="navLink" to="/library">Library</Link>
            </div>
          </nav>
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
