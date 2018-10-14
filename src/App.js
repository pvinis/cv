import React from 'react'
import './App.css'
import {
  View,
} from 'react-native-web'
import {
  Text,
} from './components'


// TODO: put this in a file
const pavlos = {
  name: {
    first: 'Pavlos',
    second: 'Vinieratos',
  },
  position: 'Software Developer \u00b7 Software Engineer',
  location: 'Amsterdam, Netherlands',
  quote: 'I enjoy experimenting with new technologies, competing in coding contests and working with like-minded people.',
  contact: {
    phone: '+31 6-2723-9822',
    github: 'pvinis',
    stackoverflow: { id: '377456', name: 'pvinis' },
    gitlab: 'pvinis',
  },
}

const me = pavlos

export default
class App extends React.Component {
  render() {
    return (
      <View
      style={{
        flexDirection: 'row',
        marginTop: 10, 
        justifyContent: 'center',
        // display: flex
        // flex-direction: ${props => props.horizontal ? 'row' : 'column'}
        // align-items: ${props => props.centered ? 'center' : null}
        // justify-content: ${props => (props.centered && props.horizontal) ? 'center' : null}
      }}
      >
        <Text
        style={{
          fontSize: 30
        }}
        >{me.name.first} </Text>
        <Text bold
        style={{
          fontSize: 30
        }}
        >{me.name.second}</Text>
      </View>
    )
  }
}
