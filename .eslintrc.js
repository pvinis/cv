const OFF = 0
const WARN = 1
const ERR = 2
module.exports = {
	extends: 'react-app',
	rules: {
		semi: [ERR, 'never'],
		indent: [ERR, 'tab'],
		'comma-dangle': [ERR, 'always-multiline'],
		quotes: [ERR, 'single'],
		'jsx-quotes': [ERR, 'prefer-single'],
	},
}

