import React, { Component } from 'react';
import { connect } from 'react-redux';
class Header extends Component {

  state = {
    searchText: '',
  }

  handleInputChange = event => {
    this.setState({searchText: event.target.value});
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.handleAddressSearch(this.searchText);
    this.setState({searchText: ''});
  };

  render() {
    return (
      <header>
        <div>Latitude: {this.props.latitude.toFixed(4)}</div>
        <div>Longitude: {this.props.longitude.toFixed(4)}</div>
        <div>Address: {this.props.address}</div>
        <div>
          <form onSubmit={this.handleFormSubmit}>
            <input
              type='text'
              id='city_search'
              placeholder={this.props.city}
              value={this.searchText}
              onChange={this.handleInputChange}
            />
            <img src='./images/icons/search.svg' alt='search icon' />
            <button type='submit' />
          </form>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    latitude: state.latitude,
    longitude: state.longitude,
    address: state.address,
    city: state.city
  }
}


export default connect(mapStateToProps)(Header);
