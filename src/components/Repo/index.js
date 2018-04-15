import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView
} from 'react-native';
import Modal from 'react-native-modal';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  closeButton: {
    backgroundColor: '#2c3e50',
    padding: 10
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center'
  }
});

export default Repo = ({ isVisible, toggleModal, url }) => (
  <Modal isVisible={ isVisible }>
    <View style={ styles.container }>
      <WebView url={ url }/>
      <View>
        <TouchableOpacity 
          onPress={ toggleModal }
          style={ styles.closeButton }
        >
          <Text style={ styles.closeButtonText }>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);
