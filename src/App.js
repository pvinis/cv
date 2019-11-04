import React from 'react'
import {
	Text,
	View,
	Social,
} from './components'
import { Colors, Fonts } from './ui'

import me from './me'


export const App = () => {
	return (
		<View
			style={{

			}}
		>

			{/* header */}
			<View
				style={{
					marginTop: '0.6cm',
					alignItems: 'center',
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
				<Text style={styles.position}>
					{me.position}
				</Text>
				<Text style={styles.location}>
					{me.location}
				</Text>
			</View>

			<Social links={me.social} />

		</View>
	)
}

const styles = {
	name: {
		fontFamily: Fonts.header,
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
	position: {
		fontFamily: Fonts.body,
		fontSize: '7.6pt',
		fontVariant: ['small-caps'],
		color: Colors.accent,
		marginBottom: '0.4mm',
	},
	location: {
		fontSize: '8pt',
		color: Colors.lightGrey,
		fontStyle: 'italic',
		fontWeight: 300,
		marginBottom: '-0.5mm',
	},
}
