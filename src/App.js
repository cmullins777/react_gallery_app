import React, { Component } from 'react';
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
      loading: true
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = 'skyscrapers') => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({images: responseData.photos.photo,
                       loading: false});
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render () {
    return (
      <div>
        <h1> Natural and Engineered Design</h1>
        <p> This is a simple search app </p>
        <SearchForm onSearch={this.performSearch} />
        <div>
          {
            (this.state.loading)
            ? <p>Loading...</p>
            : <Gallery data={this.state.images}/>
          }
        </div>
      </div>
    );
  }
}
