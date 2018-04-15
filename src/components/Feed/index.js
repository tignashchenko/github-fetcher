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
  Text,
  TextInput,
  TouchableOpacity,
  View,
  WebView
} from 'react-native';
import { array, bool, object, string } from 'prop-types';
import Modal from 'react-native-modal';

import Repo from '../Repo';
import styles from './styles';

import repoActions from '../../actions/repoActions';
import authActions from '../../actions/authActions';

console.disableYellowBox = true;

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      page: 1,
      previousSearchTerm: '',
      searchTerm: ''
    };
  }

  componentDidMount() {
    const { page } = this.state;
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

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    });
  }

  onChangeSearchTerm = (text) => {
    this.setState({
      previousSearchTerm: text,
      searchTerm: text
    });
  }

  handleSignout = () => {
    const { actions, navigation } = this.props;

    actions.signOut();
    navigation.navigate('SignIn');
  }

  handleLoadMoreRepos = () => {
    const { page, previousSearchTerm } = this.state;
    const { actions, repos } = this.props;
    const { pastSearchTerm } = this.context;

    const searchTerm = previousSearchTerm ? previousSearchTerm : pastSearchTerm;

    if (searchTerm) {
      this.setState({
        page: page + 1
      }, () => actions.getMoreRepos(page, repos, searchTerm)
      );
    } else {
      return;
    }
  }

  handleSearchRepos = () => {
    const { page, searchTerm } = this.state;
    const { actions } = this.props;

    AsyncStorage.setItem('searchTerm', JSON.stringify(searchTerm));
    
    actions.searchRepos(page, searchTerm);
    this.setState({
      searchTerm: ''
    });
  }

  handleVisibilityFilterChange = (visibilityFilter, repos) => {
    const { actions } = this.props;

    actions.sortRepos(visibilityFilter, repos);
  }

  handleKeyExtractor = (item, index) => item.id;

  render() {
    const { isModalVisible, searchTerm } = this.state;
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
              <View style={ styles.flatListItem }>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={ this.toggleModal }>
                      <Text>
                        { truncatedString }
                      </Text>
                    </TouchableOpacity>
                    <Repo 
                      isVisible={ isModalVisible }
                      toggleModal={ this.toggleModal }
                      url={ item.html_url } 
                    />
                  </View>
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
          keyExtractor={ this.handleKeyExtractor }
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

Feed.propTypes = {
  actions: object,
  isLoading: bool,
  repos: array,
  sortBy: string
}

Feed.contextTypes = {
  pastSearchTerm: object
}

const mapStateToProps = ({ auth: { signedIn }, repos, ui: { isLoading }, visibilityFilter: { sortBy } }) => ({ repos, isLoading, signedIn, sortBy });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...authActions, ...repoActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);