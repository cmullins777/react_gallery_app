import React, { Component } from 'react';

// Sets state to searched query text
export default class SearchForm extends Component {
  state = {
    searchText: ''
  }
// Ties search event to change in state
  onSearchChange = e => {
    this.setState({ searchText: e.target.value});
  }
// Submits query text and resets input field
// Updates search URL to route to queried topic
  handleSubmit = e => {
    this.props.history.push(
     `/search/${this.state.searchText}`
    );
    e.preventDefault();
    this.props.onSearch(this.query.value);
    e.currentTarget.reset();
  }
// Renders search field and button to the DOM
  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit} >
      <input type="search"
              onChange={this.onSearchChange}
              name="search"
              ref={(input => this.query = input)}
              placeholder="Search..."
              required />
       <button type="submit"
              id="submit"
              className="search-button">
         <i className="material-icons icn-search">search</i>
       </button>
    </form>
  );
 }
}
