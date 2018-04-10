import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  FlatList,
  NetInfo,
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
    fontSize: 22,
    opacity: 0.7,
    paddingTop: 15,
    paddingBottom: 15
  },
  searchButton: {
    backgroundColor: '#2c3e50',
    marginBottom: 35,
    marginTop: 5,
    borderRadius: 7,
  },
  searchButtonText: {
    color: '#fff',
    textAlign: 'center',
    padding: 5,
    opacity: 0.9
  },
  picker: {
    borderWidth: 0.5, 
    borderColor: '#d6d7da'
  },
  spinner: {
    marginTop: 10
  }
});

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      previousSearchTerm: '',
      searchTerm: ''
    };
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('First, is ' + (isConnected ? 'online' : 'offline'));
    });
  }

  onChangeSearchTerm = (text) => {
    this.setState({
      previousSearchTerm: text,
      searchTerm: text
    });
  }

  handleOpenRepo = (url) => {
    const { navigation } = this.props;

    return () => {
      navigation.navigate('Web', { url });
    }
  }

  handleRefresh = () => {
    const { page, previousSearchTerm } = this.state;
    const { actions } = this.props;
    
    this.setState({
      page: 1
     }, () => actions.searchRepos(page, previousSearchTerm)
    );
  }

  handleLoadMoreRepos = () => {
    const { page, previousSearchTerm } = this.state;
    const { actions, repos } = this.props;

    if (previousSearchTerm) {
      this.setState({
        page: page + 1
      }, () => actions.getMoreRepos(page, repos, previousSearchTerm)
      );
    } else {
      return;
    }
  }

  handleSearchRepos = () => {
    const { page, searchTerm } = this.state;
    const { actions } = this.props;
    
    actions.searchRepos(page, searchTerm);
    this.setState({
      searchTerm: ''
    });
  }

  handleVisibilityFilterChange = (visibilityFilter, repos) => {
    const { actions } = this.props;

    actions.sortRepos(visibilityFilter, repos);
  }

  render() {
    const { searchTerm } = this.state;
    const { isLoading, isRefreshing, repos, sortBy } = this.props;
    return (
      <View style={ styles.container }>
        <Text style={ styles.searchTitle }>Please input search term:</Text>
        <TextInput
          autoCapitalize={ 'none' }
          maxLength={ 30 }
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
          <Text>{ repos.length }</Text>
        </TouchableOpacity>
        <Text>Sorting by:</Text>
        <Picker
          itemStyle={{ height: 50 }}
          selectedValue={ sortBy }
          style={ styles.picker }
          onValueChange={(itemValue) => this.handleVisibilityFilterChange(itemValue, repos)}>
          <Picker.Item label="Name" value="Name" style={{paddingTop: 5}}/>
          <Picker.Item label="Stars" value="Stars" />
          <Picker.Item label="Forks" value="Forks" style={{paddingBottom: 5}} />
        </Picker>
        { isLoading
          ? <ActivityIndicator size='large' color='#2c3e50' style={ styles.spinner } />
          : null
        }
         <FlatList 
          data={ repos }
          ItemSeparatorComponent={ () => <View style={ { width: 2, height: 2, backgroundColor: 'transparent' } } /> }
          renderItem={({ item }) => {
            return (
              <Text
                onPress={ this.handleOpenRepo(item.html_url) } 
                style={ styles.flatListItem }
              >
                { item.name }
              </Text>
            )
          }}
          onEndReached={ this.handleLoadMoreRepos }
          onEndReachedThreshold={ .40 }
          style={ styles.flatList }
        />
      </View>
    )
  }
}

const mapStateToProps = ({ repos, ui: { isLoading, isRefreshing }, visibilityFilter: { sortBy } }) => ({ repos, isLoading, isRefreshing, sortBy });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...repoActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);