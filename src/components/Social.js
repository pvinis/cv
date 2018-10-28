import React from 'react'
import {
  Text,
  View,
} from '.'
import { Colors } from '../ui'
// import _ from 'lodash'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fab, fas)


const SocialInfo = {
  phone: {
    link: ({number}) => `tel: ${number}`,
    icon: 'mobile-alt' 
  },
  github: {
    link: ({username}) => `https://github.com/${username}`,
    icon: ['fab', 'github'],
  },
  gitlab: {
    link: ({username}) => `https://gitlab.com/${username}`,
    icon: ['fab', 'gitlab'],
  },
  stackoverflow: {
    link: ({id, name}) => `https://stackoverflow.com/users/${id}/${name}`,
    icon: ['fab', 'stack-overflow'],
  },
  linkedin: {
    link: ({username}) => `https://linkedin.com/in/${username}`,
    icon: ['fab', 'linkedin'],
  },
  ghuser: {
    link: ({username}) => `https://ghuser.io/${username}`,
    icon: ['fab', 'github-alt'],
  },
  website: {
    link: ({url}) => url,
    icon: 'globe'
  },
  //email,
  //skype
}


const Social = props => (
  <View>
    {['phone', 'ghuser', 'github', 'gitlab', 'linkedin', 'stackoverflow', 'website'].map(si => {
      const { link, icon } = SocialInfo[si]
      return (
        <a 
          key={si}
          href={link(props.links[si])}
          style={{
            textDecoration: 'none', 
            color: Colors.text,
          }}
        >
          <Text>
            <FontAwesomeIcon icon={icon} />
            {' '}
            {props.links[si].display}
          </Text>
        </a>
      )
    })}
  </View>
) 

export default Social
