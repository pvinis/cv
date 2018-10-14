import React from 'react'
import {
  Text,
  View,
} from '.'
import { Colors } from '../ui'
// import _ from 'lodash'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons'


const SocialInfo = {
  phone: {
    link: x => `tel: ${x}`,
    icon: faMobileAlt 
  }
}


const Social = props => (
  <View>
    <a href={SocialInfo['phone'].link(123)} 
      style={{
        textDecoration: 'none', 
        color: Colors.text,
      }} 
    >
      <Text>
        <FontAwesomeIcon icon={faMobileAlt} /> 
        {' '}
        {props.links.phone}
      </Text>
    </a>
  </View>
) 

export default Social
