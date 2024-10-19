// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import { MemoryRouter as Router, Route } from 'react-router-dom';
// import BinDetails from '../components/BinDetailsModal'; // Ensure the correct import path
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';

// const mock = new MockAdapter(axios);

// describe('BinDetails Component', () => {
//   beforeEach(() => {
//     // Reset the mock before each test
//     mock.reset();
//   });

//   it('shows loading message while fetching data', () => {
//     // Render the BinDetails component with a mock route
//     render(
//       <Router initialEntries={['/bins/1']}>
//         <Route path="/bins/:binId">
//           <BinDetails />
//         </Route>
//       </Router>
//     );

//     // Check if the loading message is displayed
//     expect(screen.getByText(/loading bin details/i)).toBeInTheDocument();
//   });

//   it('displays error message on fetch failure', async () => {
//     // Simulate a server error response
//     mock.onGet('/api/bins/1').reply(500);

//     // Render the BinDetails component with the mock route
//     render(
//       <Router initialEntries={['/bins/1']}>
//         <Route path="/bins/:binId">
//           <BinDetails />
//         </Route>
//       </Router>
//     );

//     // Wait for the error message to be displayed
//     await waitFor(() =>
//       expect(
//         screen.getByText(/failed to fetch bin details/i)
//       ).toBeInTheDocument()
//     );
//   });

//   it('displays bin details when data is fetched successfully', async () => {
//     // Mock the successful response with bin data
//     const mockBinData = {
//       binType: 'Recycling',
//       location: { lat: 6.9271, lng: 79.8612 },
//       ownerId: '12345',
//       isVerified: true,
//       qrCode: 'http://example.com/qrcode.png',
//     };

//     // Simulate a successful response
//     mock.onGet('/api/bins/1').reply(200, mockBinData);

//     // Render the BinDetails component with the mock route
//     render(
//       <Router initialEntries={['/bins/1']}>
//         <Route path="/bins/:binId">
//           <BinDetails />
//         </Route>
//       </Router>
//     );

//     // Wait for the bin type to be displayed
//     await waitFor(() =>
//       expect(screen.getByText(/bin type/i)).toBeInTheDocument()
//     );

//     // Check that the bin details are displayed correctly
//     expect(screen.getByText(/bin type: recycling/i)).toBeInTheDocument();
//     expect(
//       screen.getByText(/location: latitude 6.9271, longitude 79.8612/i)
//     ).toBeInTheDocument();
//     expect(screen.getByText(/owner id: 12345/i)).toBeInTheDocument();
//     expect(screen.getByText(/status: verified/i)).toBeInTheDocument();
//     expect(screen.getByAltText(/qr code/i)).toHaveAttribute(
//       'src',
//       'http://example.com/qrcode.png'
//     );
//   });
// });
