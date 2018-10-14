

const contactInfo = [
  {
    info: me.contact.phone,
    link: `tel:${me.contact.phone}`,
    icon: 'fab fa-mobile-alt',
  },
  {
    info: me.contact.github,
    link: `https://github.com/${me.contact.github}`,
    icon: 'fab fa-github',
  },
  {
    info: me.contact.stackoverflow.name,
    link: `https://stackoverflow.com/users/${me.contact.stackoverflow.id}/${me.contact.stackoverflow.name}`,
    icon: 'fab fa-stack-overflow',

  },
  {
    info: me.contact.gitlab,
    link: `https://gitlab.com/${me.contact.gitlab}`,
    icon: 'fab fa-gitlab',

  },
  // TEMPLATE FOR FUTURE ONES
  {
    info: me.contact.latex,
    link: 'https://stackoverflow.com/users/' + me.contact.stackoverflowid,
    icon: 'fab fa-stack-overflow',

  },
]

const contactInfoSeparator = '\u2001|\u2001'

// TODO: move this to a file and make functional
class ContactList extends Component {
  render() {
    let listItems = this.props.list.map((link, i) => {
      if (link.info === null || link.info === undefined) return null
      return (
        <View horizontal key={'' + i}>
          <a href={link.link} style={{ textDecoration: 'none', color: Colors.text }}>
            <Text>
              <i className={link.icon} />
              {' '}
              {link.info}
            </Text>
          </a>
        </View>
      )
    })

    // remove the null elements :P
    listItems = _.filter(listItems, null)

    // add the separators for each contact information
    listItems = _.flatMap(listItems, (v, i, a) => {
      if (i < a.length - 1) return [v, <Text key={'s' + i}>{contactInfoSeparator}</Text>]
      return v
    })

    return (
      <View centered horizontal style={{ fontFamily: Fonts.header, color: Colors.text, fontSize: '6.8pt' }}>
        {listItems}
      </View>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <ContactList list={contactInfo} />
        <View centered style={{ marginBottom: '5mm' }}>
          <Text style={{ color: Colors.darkText, fontSize: '9pt', fontStyle: 'italic', fontWeight: 300, fontFamily: Fonts.body }}>
            {`"${me.quote}"`}
          </Text>
        </View>
        <View>
          <View  horizontal style={{
            marginVertical: '3mm',
          }}>
            <span style={{
              fontSize: 16,
              fontFamily: Fonts.body,
              fontWeight: 500,
            }}>Teaching Assistance</span>
            <hr style={{ flex: 1, borderWidth: 0, borderBottomWidth: 0.9, marginBottom: 3, borderStyle: 'solid', borderBottomColor: Colors.grey }} />
          </View>
          {me.teachingAssistance.map((section) => {
            return (
              <View key={section.title}>
                <Text>{section.title}</Text>
                {section.content.map((assistance, i) => {
                  return (
                    <View key={`${i}`} style={{
                      marginTop: '0.5mm',
                    }}>
                      <Text>{assistance.semester} {assistance.class}, {assistance.teacher} {assistance.location}</Text>
                    </View>
                  )
                })}
              </View>
            )
          })}
        </View>
      </div>
    )
  }
}
