module.exports = {
  preset: 'react-native',
  fakeTimers: {
    enableGlobally: true
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@react-native|react-native|@rneui)'
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect']
}
