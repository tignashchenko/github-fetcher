import React, { Component } from 'react';
import {
  Button,
  Text,
  TextInput,
  View
} from 'react-native';

export default class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };
  }

  onChangeSearchTerm = (text) => {
    this.setState({
      searchTerm: text
    });
  }

  render() {
    const { searchTerm } = this.state;
    return (
      <View>
        <Text>Please input search term</Text>
        <TextInput onChangeText={ this.onChangeSearchTerm } value={ searchTerm } />
        <Button title="Search repos">Click me!</Button>
      </View>
    )
  }
}