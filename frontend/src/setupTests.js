// src/setupTests.js
import '@testing-library/jest-dom'; // This is sufficient for most matchers

// Mock window.alert for testing
global.alert = jest.fn();

