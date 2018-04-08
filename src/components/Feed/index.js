import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import repoActions from '../../actions';

console.disableYellowBox = true;

const styles = StyleSheet.create({
  flatListItem: {
    backgroundColor: 'gray',
    color: 'black',
    padding: 10,
    fontSize: 16
  }
});

class Feed extends Component {
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

  handleSearchRepos = () => {
    const { searchTerm } = this.state;
    const { actions } = this.props;
    
    actions.searchRepos(searchTerm);
    this.setState({
      searchTerm: ''
    });
  }

  render() {
    const { searchTerm } = this.state;
    const { repos } = this.props;
    return (
      <View>
        <Text>Please input search term</Text>
        <TextInput onChangeText={ this.onChangeSearchTerm } value={ searchTerm } />
        <Button onPress={ this.handleSearchRepos } title="Search repos">Click me!</Button>
         <FlatList 
          data={ repos }
          renderItem={({ item }) => {
            return (
              <Text style={ styles.flatListItem }>{ item.name }</Text>
            )
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ repos }) => ({ repos });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...repoActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);