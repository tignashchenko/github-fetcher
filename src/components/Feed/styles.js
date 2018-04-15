import { Platform, StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
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
  flatListItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ECF9FF',
    color: '#000',
    fontFamily: Platform.OS === 'ios' ? 'Iowan Old Style' : 'monospace',
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