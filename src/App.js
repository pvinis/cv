import React from 'react'
import './App.css'
import {
  View,
} from 'react-native-web'
import {
  Text,
} from './components'
import { Colors } from './ui'

import me from './me'


export default
class App extends React.Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: '0.6cm',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.name}>
          <Text style={styles.nameFirst}>
            {me.name.first} 
          </Text>
          {' '}
          <Text style={styles.nameSecond}>
            {me.name.second}
          </Text>
        </Text>
      </View>
    )
  }
}
 
const styles = {
  name: {
    fontFamily: 'Roboto',
    fontSize: '32pt',
    marginBottom: '0.4mm',
  },
  nameFirst: {
    fontWeight: 100,
    color: Colors.textGray,
  },
  nameSecond: {
    fontWeight: 'bold',
    color: Colors.text,
  },
}
