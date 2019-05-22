import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// App components
import Header from './components/Header.js';
import Nav from './components/Nav.js';
import Gallery from './components/Gallery.js';
import GalleryItem from './components/GalleryItem.js';
import SearchForm from './components/SearchForm.js';
import NoImagesFound from './components/NoImagesFound.js';
import apiKey from './config.js';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      penguins: [],
      dolphins: [],
      otters: [],
      loading: true
    };
  }

  componentDidMount() {
    this.performSearch('penguins');
    this.performSearch('dolphins');
    this.performSearch('puffins');
  }

  performSearch = (query) => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        if (query === 'penguins') {
          this.setState({ penguins : responseData.photos.photo,
                          isLoading : false })
        } else if (query === 'dolphins'){
          this.setState({ dolphins: responseData.photos.photo,
                          loading: false})
        } else if (query === 'puffins') {
          this.setState({ puffins: responseData.photos.photo,
                          loading: false})
        } else {
          this.setState({ images : responseData.photo.photo,
                          query : SearchForm.input.name,
                          loading: false})
                          console.log(query);
        }
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render () {
      return (
        <BrowserRouter>
        <div>
          <h1> Amazing Aquatic Animals </h1>
          <p> This is a simple search app </p>
           <Route
             render={props =>
            <SearchForm {...props} onSearch={this.performSearch} /> } />
              <Header />
                <Switch>
                  <Route exact path="/search/:query" render={ () => (this.state.loading) ? <p>Loading...</p> : <Gallery data={this.state.images} query="searchText" /> } />
                  <Route path="/penguins" render={ () => (this.state.loading) ? <p>Loading...</p> : <Gallery data={this.state.penguins} query="penguins" /> } />
                  <Route path="/dolphins" render={ () => (this.state.loading) ? <p>Loading...</p> : <Gallery data={this.state.dolphins} query="dolphins" /> } />
                  <Route path="/puffins" render={ () => (this.state.loading) ? <p>Loading...</p> : <Gallery data={this.state.puffins} query="puffins" /> } />
                  <Route component={ NoImagesFound } />
                </Switch>
         </div>
        </BrowserRouter>
      );
    }
}
