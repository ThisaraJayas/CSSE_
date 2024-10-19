// import React from 'react';
// import { render, fireEvent, screen, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom'; // For better assertions
// import SignUp from './SignUp'; // Import the component
// import axios from 'axios'; // Import axios to mock requests
// import MockAdapter from 'axios-mock-adapter';
// import { BrowserRouter } from 'react-router-dom'; // For routing support

// // Mock API
// const mockAxios = new MockAdapter(axios);

// const renderWithRouter = (ui) => {
//   return render(<BrowserRouter>{ui}</BrowserRouter>);
// };

// describe('SignUp Component', () => {
//   beforeEach(() => {
//     mockAxios.reset(); // Reset any mock data between tests
//   });

//   test('renders sign-up form and allows input', () => {
//     renderWithRouter(<SignUp />);

//     // Check if the form elements are rendered
//     expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
//   });

//   test('successful sign-up redirects to sign-in page', async () => {
//     renderWithRouter(<SignUp />);

//     // Mock the successful API response
//     mockAxios.onPost('/signup').reply(200, { message: 'User signed up' });

//     // Simulate user inputs
//     fireEvent.change(screen.getByPlaceholderText('Name'), {
//       target: { value: 'John Doe' },
//     });
//     fireEvent.change(screen.getByPlaceholderText('Email'), {
//       target: { value: 'johndoe@example.com' },
//     });
//     fireEvent.change(screen.getByPlaceholderText('Password'), {
//       target: { value: 'password123' },
//     });

//     // Simulate form submission
//     fireEvent.click(screen.getAllByText('Sign Up')[0]);

//     // Expect loading text to appear
//     expect(screen.getByText('Signing Up...')).toBeInTheDocument();

//     // Wait for the redirection to happen
//     await waitFor(() => {
//       // After successful sign-up, you should be redirected to the sign-in page
//       expect(window.location.pathname).toBe('/signin');
//     });
//   });

//   test('shows error message when sign-up fails', async () => {
//     renderWithRouter(<SignUp />);

//     // Mock a failed API response
//     mockAxios.onPost('/signup').reply(400, { message: 'Sign-up failed' });

//     // Simulate user inputs
//     fireEvent.change(screen.getByPlaceholderText('Name'), {
//       target: { value: 'Jane Doe' },
//     });
//     fireEvent.change(screen.getByPlaceholderText('Email'), {
//       target: { value: 'janedoe@example.com' },
//     });
//     fireEvent.change(screen.getByPlaceholderText('Password'), {
//       target: { value: 'password456' },
//     });

//     // Simulate form submission
//     fireEvent.click(screen.getAllByText('Sign Up')[0]);

//     // Wait for the error message to show
//     await waitFor(
//       () => {
//         expect(
//           screen.getByText('Error signing up, please try again')
//         ).toBeInTheDocument();
//       },
//       { timeout: 3000 } // increase timeout to 3 seconds
//     );
//     // Wait up to 3 seconds for the error message
//   });

//   test('prevents sign-up when fields are missing', () => {
//     renderWithRouter(<SignUp />);

//     // Leave fields empty and submit
//     fireEvent.click(screen.getAllByText('Sign Up')[0]);

//     // Ensure form is not submitted, no API request made, and error message is not shown yet
//     expect(mockAxios.history.post.length).toBe(0); // No API calls
//     expect(screen.queryByText('Signing Up...')).not.toBeInTheDocument();
//   });
// });
