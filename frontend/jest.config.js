export const transform = {
  '^.+\\.(js|jsx)$': 'babel-jest', // Transforms JS and JSX files using Babel
};
export const transformIgnorePatterns = [
  'node_modules/(?!(axios)/)', // Transforms axios since it uses ES modules
];
export const testEnvironment = 'jsdom';
