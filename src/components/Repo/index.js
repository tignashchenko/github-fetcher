import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  WebView
} from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

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
