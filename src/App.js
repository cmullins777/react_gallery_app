// Import React libraries
import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

// import App components
import Header from './components/Header.js';
import Nav from './components/Nav.js';
import Gallery from './components/Gallery.js';
import SearchForm from './components/SearchForm.js';
import NoImagesFound from './components/NoImagesFound.js';
import PageNotFound from './components/PageNotFound.js';
import apiKey from './config.js';

// Assign state to App, the highest level component
export default class App extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      results: [],
      penguins: [],
      dolphins: [],
      angelfish: [],
      loading: true
    };
  }

// Initializations requiring DOM nodes, invoked immediately after a component is mounted.
  componentDidMount() {
    this._isMounted = true;
    this.performSearch();
    this.performSearch('penguins');
    this.performSearch('dolphins');
    this.performSearch('angelfish');
  }

//  API call using 'fetch' to flickr.com, conditional response of 3 choices and SearchForm query
//  2nd param abortController cancells promise API call to address memory leak
  performSearch = (query) => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1, { signal: this.abortController.signal }`)
      .then(response => response.json())
      .then(responseData => {
        if (this._isMounted) {
          if (query === 'penguins') {
            this.setState({ penguins : responseData.photos.photo,
                            isLoading : false })
          } else if (query === 'dolphins'){
            this.setState({ dolphins: responseData.photos.photo,
                            loading: false})
          } else if (query === 'angelfish') {
            this.setState({ angelfish: responseData.photos.photo,
                            loading: false})
          } else {
            this.setState({ results : responseData.photos.photo,
                            loading: false})
          }
         }
        })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }
// Calls abort method to unsubscribe API call and clean up class components
  componentWillUnmount() {
    this.abortController.abort()
  }
// App layout rendered to the DOM with routes for each selection option
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
            <p> This is a simple search app </p>
              <Route
                render={props =>
                <SearchForm {...props} onSearch={this.performSearch} /> } />
                  <Nav />
                    <Switch>
                      <Route exact path="/" render={ () => (this.state.loading) ? <p>Loading...</p> : <Redirect to="penguins" /> } />
                      <Route path="/search/:query" render={ ({ match }) => <Gallery data={this.state.results} /> } />
                      <Route exact path="/penguins" render={ () => (this.state.loading) ? <p>Loading...</p> : <Gallery data={this.state.penguins} query="penguins" /> } />
                      <Route exact path="/dolphins" render={ () => (this.state.loading) ? <p>Loading...</p> : <Gallery data={this.state.dolphins} query="dolphins" /> } />
                      <Route exact path="/angelfish" render={ () => (this.state.loading) ? <p>Loading...</p> : <Gallery data={this.state.angelfish} query="angelfish" /> } />
                      <Route component={ NoImagesFound } />
                      <Route component={ PageNotFound } />
                    </Switch>
          </div>
        </BrowserRouter>
      );
   }
}
