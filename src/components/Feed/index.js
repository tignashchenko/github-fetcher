import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  FlatList,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import repoActions from '../../actions';

console.disableYellowBox = true;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#95a5a6',
  },
  searchTitle: {
    textAlign: 'center',
    marginBottom: 10
  },
  flatListItem: {
    backgroundColor: '#ECF9FF',
    color: '#000',
    fontSize: 16,
    opacity: 0.7
  },
  searchButton: {
    backgroundColor: '#2c3e50',
    marginBottom: 35,
    marginTop: 15,
    borderRadius: 7,
  },
  searchButtonText: {
    color: '#fff',
    textAlign: 'center',
    padding: 5,
    opacity: 0.9
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
      pickerSelection: 'Name',
      searchTerm: ''
    });
  }

  render() {
    const { pickerSelection, searchTerm } = this.state;
    const { isLoading, repos } = this.props;
    return (
      <View style={ styles.container }>
        <Text style={ styles.searchTitle }>Please input search term:</Text>
        <TextInput
          autoCapitalize={ 'none' }
          onChangeText={ this.onChangeSearchTerm }
          textAlign={ 'center' } 
          value={ searchTerm } 
        />
        <TouchableOpacity
          onPress={ this.handleSearchRepos }
          style={ styles.searchButton }
        >
          <Text
            style={ styles.searchButtonText }
          >
            Search for repo
          </Text>
        </TouchableOpacity>
        <Text>Sorting by:</Text>
        <Picker
          itemStyle={{ height: 50 }}
          selectedValue={pickerSelection}
          style={{ borderWidth: 0.5, borderColor: '#d6d7da' }}
          onValueChange={(itemValue, itemIndex) => this.setState({pickerSelection: itemValue})}>
          <Picker.Item label="Name" value="Name" style={{paddingTop: 5}}/>
          <Picker.Item label="Stars" value="Stars" />
          <Picker.Item label="Forks" value="Forks" style={{paddingBottom: 5}} />
        </Picker>
        { isLoading
          ? <ActivityIndicator size='large' color='#0000ff' />
          : null
        }
         <FlatList 
          data={ repos }
          initialNumToRender={ 30 }
          ItemSeparatorComponent={ () => <View style={ { width: 2, height: 2, backgroundColor: 'transparent' } } /> }
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

const mapStateToProps = ({ repos, ui: { isLoading } }) => ({ repos, isLoading });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...repoActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);