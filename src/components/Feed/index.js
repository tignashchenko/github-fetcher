import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import repoActions from '../../actions';

console.disableYellowBox = true;

const styles = StyleSheet.create({
  button: {
    
  },
  searchTitle: {
    textAlign: 'center',
    marginBottom: 10
  },
  flatListItem: {
    backgroundColor: '#ECF9FF',
    borderBottomWidth: 10,
    color: '#000',
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
        <Text style={ styles.searchTitle }>Please input search term:</Text>
        <TextInput
          autoCapitalize={ 'none' }
          onChangeText={ this.onChangeSearchTerm }
          textAlign={ 'center' } 
          value={ searchTerm } 
        />
        <Button
          color="#2196F3" 
          onPress={ this.handleSearchRepos }
          style={ styles.button } 
          title="Search repos"
        />
         <FlatList 
          data={ repos }
          initialNumToRender={ 30 }
          ItemSeparatorComponent={ () => <View style={ { width: 10, height: 10, backgroundColor: 'transparent' } } /> }
          renderItem={({ item }) => {
            return (
              <Text style={ styles.flatListItem }>{ item.name }</Text>
            )
          }}
          style={ styles.flatList }
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