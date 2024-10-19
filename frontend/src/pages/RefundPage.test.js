import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RefundPage from './RefundPage';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Mock axios
const mock = new MockAdapter(axios);

describe('RefundPage', () => {
  beforeEach(() => {
    // Reset the mock before each test
    mock.reset();
  });

  it('renders refund data', async () => {
    const refundData = [
      {
        _id: '1',
        userId: { name: 'John Doe' },
        date: '2024-10-19T12:00:00Z',
        amount: 50,
        status: 'Pending',
      },
    ];

    mock.onGet('http://localhost:4000/api/refunds').reply(200, refundData);

    render(<RefundPage />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  
});
