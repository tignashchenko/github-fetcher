import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  Image,
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
    fontFamily: 'monospace',
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  forksStarsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 160
  },
  forksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 60
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 5,
    width: 60
  },
  forksImage: {
    height: 10,
    width: 10
  },
  starsImage: {
    height: 10,
    width: 10
  },
  forksCountIOS: {
    fontFamily: 'Iowan Old Style'
  },
  forksCountAndroid: {
    fontFamily: 'monospace'
  },
  starsCountIOS: {
    fontFamily: 'Iowan Old Style'
  },
  starsCountAndroid: {
    fontFamily: 'monospace'
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
    fontFamily: 'serif',
    fontWeight: 'bold'
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
  },
  noReposContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  noReposText: {
    fontSize: 50
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
          <Text style={ Platform.OS === 'ios' ? styles.reposAmountIOS : styles.reposAmountAndroid }>Repos found:</Text>
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
        {
          repos 
          ? <FlatList 
          data={ repos }
          ItemSeparatorComponent={ () => <View style={ { width: 2, height: 2, backgroundColor: 'transparent' } } /> }
          renderItem={({ item }) => {
            const truncatedString = item.name.slice(0, 30);
            return (
              <View style={ Platform.OS === 'ios' ? styles.flatListItemIOS : styles.flatListItemAndroid }>
                <Text onPress={ this.handleOpenRepo(item.html_url) }>
                  { truncatedString }
                </Text>
                <View style={ styles.forksStarsContainer }>
                  <View style={ styles.forksContainer }>
                  <Image
                    style={ styles.forksImage } 
                    source={ require('../../../public/assets/Fork/code-fork-512.png') } 
                  />
                  <Text style={ Platform.OS === 'ios' ? styles.forksCountIOS : styles.forksCountAndroid }>{ item.forks_count }</Text>
                  </View>
                  <View style={ styles.starsContainer }>
                  <Image
                    style={ styles.starsImage }
                    source={ require('../../../public/assets/Star/flatIconImage.png') } 
                  />
                  <Text style={ Platform.OS === 'ios' ? styles.starsCountIOS : styles.starsCountAndroid }>{ item.stargazers_count }</Text>
                  </View>
                </View>
              </View>
            )
          }}
          onEndReached={ this.handleLoadMoreRepos }
          onEndReachedThreshold={ .40 }
          style={ styles.flatList }
        />
        : <View style={ styles.noReposContainer }>
            <Text style={ styles.noReposText }>O</Text>
          </View>
        }
      </View>
    )
  }
}

const mapStateToProps = ({ auth: { signedIn }, repos, ui: { isLoading }, visibilityFilter: { sortBy } }) => ({ repos, isLoading, signedIn, sortBy });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...authActions, ...repoActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);