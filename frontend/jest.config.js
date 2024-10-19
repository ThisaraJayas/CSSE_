module.exports = {
  // Specify the test environment (like jsdom for React)
  testEnvironment: 'jsdom',

  // Transform files
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', // Use Babel to transpile JS/JSX files
  },

  // Specify the pattern for ignoring transformation in node_modules
  transformIgnorePatterns: [
    "node_modules/(?!(react-leaflet)/)", // Add other modules here if needed
  ],

  // Optionally, add other Jest configurations
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // If you have setup files
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
};
