import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  NetInfo,
  Picker,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import repoActions from '../../actions/repoActions';
import authActions from '../../actions/authActions';

console.disableYellowBox = true;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#95a5a6',
  },
  searchTitleAndroid: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginBottom: 10
  },
  searchTitleIOS: {
    fontFamily: 'Georgia',
    textAlign: 'center',
    marginBottom: 10
  },
  flatListItemAndroid: {
    backgroundColor: '#ECF9FF',
    color: '#000',
    fontFamily: 'Roboto',
    fontSize: 22,
    opacity: 0.7,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    marginLeft: 5,
    marginRight: 5,
    opacity: 0.6
  },
  flatListItemIOS: {
    backgroundColor: '#ECF9FF',
    color: '#000',
    fontFamily: 'Iowan Old Style',
    fontSize: 22,
    opacity: 0.7,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    marginLeft: 5,
    marginRight: 5,
    opacity: 0.6
  },
  signOutButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  signOutButton: {
    backgroundColor: '#2c3e50',
    marginRight: 5,
    marginTop: 10
  },
  signOutButtonText: {
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    padding: 5
  },
  searchButton: {
    backgroundColor: '#2c3e50',
    marginBottom: 15,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5
  },
  searchButtonText: {
    color: '#fff',
    textAlign: 'center',
    padding: 5,
    opacity: 0.9
  },
  picker: {
    borderWidth: 0.5, 
    borderColor: 'transparent',
  },
  reposAmountAndroid: {
    fontFamily: 'Roboto',
    marginLeft: 5,
    marginBottom: 5
  },
  reposAmountIOS: {
    fontFamily: 'Georgia',
    marginLeft: 5,
    marginBottom: 5
  },
  reposLengthAndroid: {
    fontFamily: 'Roboto'
  },
  reposLengthIOS: {
    fontFamily: 'Georgia-Bold',
  },
  reposAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  sortAndroid: {
    fontFamily: 'Roboto',
    marginLeft: 5
  },
  sortIOS: {
    fontFamily: 'Georgia',
    marginLeft: 5
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
    const { actions } = this.props;
    NetInfo.getConnectionInfo().then(onlineMode => {
      if (onlineMode.type === 'unknown' || onlineMode.type === 'none') {
        const repos = AsyncStorage.getItem('repos').then(repos => {
          const parsedRepos = JSON.parse(repos);
          actions.getReposOffline(parsedRepos);
        })
        .catch(err => {
          throw new Error(err);
        })
      } else {
        return;
      }
    })
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

  handleSignout = () => {
    const { actions, navigation } = this.props;

    actions.signOut();
    navigation.navigate('SignIn');
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
    const { isLoading, repos, sortBy } = this.props;
    return (
      <View style={ styles.container }>
        <View style={ styles.signOutButtonContainer }>
          <TouchableOpacity
            onPress={ this.handleSignout }
            style={ styles.signOutButton }
          >
            <Text style={ styles.signOutButtonText }>Sign out</Text>
          </TouchableOpacity>
        </View>
        <Text style={ Platform.OS === 'ios' ? styles.searchTitleIOS : styles.searchTitleAndroid }>Please input search term:</Text>
        <TextInput
          autoCapitalize={ 'none' }
          maxLength={ 30 }
          onChangeText={ this.onChangeSearchTerm }
          textAlign={ 'center' } 
          value={ searchTerm }
          underlineColorAndroid='rgba(0,0,0,0)' 
        />
        <TouchableOpacity
          onPress={ this.handleSearchRepos }
          style={ styles.searchButton }
        >
          <Text style={ styles.searchButtonText }>
            Search for repo
          </Text>
        </TouchableOpacity>
        <View style={ styles.reposAmountContainer }>
          <Text style={ Platform.OS === 'ios' ? styles.reposAmountIOS : styles.flatListItemAndroid }>Repos found:</Text>
          <Text style={ Platform.OS === 'ios' ? styles.reposLengthIOS : styles.reposLengthAndroid }> { repos ? repos.length : null } </Text>
        </View>
        <Text style={ Platform.OS === 'ios' ? styles.sortIOS : styles.sortAndroid }>Sorting by:</Text>
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
            const truncatedString = item.name.slice(0, 30);
            return (
              <Text
                onPress={ this.handleOpenRepo(item.html_url) } 
                style={ Platform.OS === 'ios' ? styles.flatListItemIOS : styles.flatListItemAndroid }
              >
                { truncatedString }
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

const mapStateToProps = ({ auth: { signedIn }, repos, ui: { isLoading }, visibilityFilter: { sortBy } }) => ({ repos, isLoading, signedIn, sortBy });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...authActions, ...repoActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);