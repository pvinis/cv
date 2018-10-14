import React from 'react'
import { Text as RNText } from 'react-native-web'


const Text = props => (
  <RNText
    {...props}
    style={[
      (props.bold ? { fontWeight: 'bold' } : null),
      props.style,
    ]}
  />
) 

export default Text
