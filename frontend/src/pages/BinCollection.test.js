// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import BinCollection from './BinCollection'; // Adjust the import based on your structure
// import axios from 'axios';

// jest.mock('axios');

// describe('BinCollection Component', () => {
//   test('renders the BinCollection component', () => {
//     render(<BinCollection />); // Render inside the test case

//     expect(screen.getByPlaceholderText('Search Bins...')).toBeInTheDocument();
//     expect(screen.getByText('Continue')).toBeInTheDocument();
//   });

//   test('opens QRScanner when Continue button is clicked', () => {
//     render(<BinCollection />); // Render inside the test case

//     const continueButton = screen.getByText('Continue');
//     fireEvent.click(continueButton);

//     expect(screen.queryByText('Add weight')).not.toBeInTheDocument(); // Weight modal should not be present yet
//     // Check if QRScanner is activated (can be done based on your QRScanner implementation)
//     expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument(); // Assuming QRScanner has a close button
//   });
//   test('submits weight and calls the API', async () => {
//     render(<BinCollection />); // Render inside the test case

//     const continueButton = screen.getByText('Continue');
//     fireEvent.click(continueButton);

//     // Mock the scanning completion
//     fireEvent.change(screen.getByPlaceholderText('Enter weight in KG'), {
//       target: { value: '10' },
//     });

//     // Mock binData set up for weight submission
//     const mockBinData = '123'; // Replace with the expected scanned data
//     screen.getByText('Add weight'); // Ensure the modal is present
//     axios.put.mockResolvedValueOnce({ data: { success: true } }); // Mock API response

//     const submitButton = screen.getByText('Submit');
//     fireEvent.click(submitButton);

//     // Wait for the async action to complete
//     await waitFor(() => {
//       expect(axios.put).toHaveBeenCalledWith(
//         `http://localhost:4000/api/bins/${mockBinData}/weight`,
//         {
//           weight: 10,
//         }
//       );
//     });

//     // Separate assertion for checking if the modal is closed
//     expect(screen.queryByText('Add weight')).not.toBeInTheDocument(); // Check if modal is closed after submit
//   });
// });
