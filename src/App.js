import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

// App components
import Header from './components/Header.js';
import Nav from './components/Nav.js';
import Gallery from './components/Gallery.js';
import GalleryItem from './components/GalleryItem.js';
import SearchForm from './components/SearchForm.js';
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
    this.performSearch('otters');
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
        } else if (query === 'otters') {
          this.setState({ otters: responseData.photos.photo,
                          loading: false})
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
        <Header />
        <p> This is a simple search app </p>
         <Route path ="/" component={GalleryItem} />
        <SearchForm onSearch={this.performSearch} />
         <div>
           {
             (this.state.loading)
             ? <p>Loading...</p>
             : <Gallery data={this.state.images}/>
           }
         </div>
       </div>
      </BrowserRouter>
    );
  }
}
