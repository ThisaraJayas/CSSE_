// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { MemoryRouter as Router } from 'react-router-dom';
// import AddBin from './AddBin';
// import { AuthContext } from '../middleware/AuthContext'; // Make sure to import the correct context
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';

// // Mock axios
// const mock = new MockAdapter(axios);

// describe('AddBin Component', () => {
//   const mockAuthContext = {
//     user: { _id: '123' },
//     loading: false,
//   };

//   beforeEach(() => {
//     // Reset the mock before each test
//     mock.reset();
//   });

//   it('submits the form successfully', async () => {
//     mock.onPost('http://localhost:4000/api/bins').reply(200);

//     render(
//       <Router>
//         <AuthContext.Provider value={mockAuthContext}>
//           <AddBin />
//         </AuthContext.Provider>
//       </Router>
//     );

//     fireEvent.change(screen.getByLabelText(/bin name/i), {
//       target: { value: 'Test Bin' },
//     });

//     fireEvent.change(screen.getByLabelText(/bin type/i), {
//       target: { value: 'Recycling' },
//     });

//     fireEvent.click(screen.getByText(/add bin/i));

//     await waitFor(() => {
//       expect(screen.getByText(/submit review/i)).toBeInTheDocument();
//     });
//   });
// });
