// UpdateWasteRequest.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WasteRequestsTable from '../pages/WasteRequestTable';

// Mocking the fetch API
global.fetch = jest.fn();

describe('WasteRequestsTable Component', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    test('shows an error message when the fetch fails', async () => {
        // Mocking fetch to simulate a failure
        fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch failed')));

        render(<WasteRequestsTable />);

        // Assert that the loading state is visible
        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        // Wait for the error message to appear
        await waitFor(() => {
            expect(screen.getByText(/error fetching waste requests/i)).toBeInTheDocument();
        });
    });

    test('updates the status and displays success message', async () => {
        // Mocking fetch to return a successful response
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve({ wasteRequests: [{ _id: '1', binId: 'B001', date: new Date(), notes: 'Recycling', status: 'Pending' }] })
            })
        );

        render(<WasteRequestsTable />);

        // Wait for the request data to load
        await waitFor(() => expect(screen.getByText('B001')).toBeInTheDocument());

        // Click on the Complete button
        fireEvent.click(screen.getByText(/complete/i));

        // Mock the update status response
        fetch.mockImplementationOnce(() =>
            Promise.resolve({ status: 200 })
        );

        // Assert the update call was made correctly
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/waste-requests/1', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Completed' }),
            });
        });

        // Wait for the status to update
        await waitFor(() => {
            expect(screen.getByText('Completed')).toBeInTheDocument();
        });
    });

    test('shows an error message when the update fails', async () => {
        // Set up initial fetch
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve({ wasteRequests: [{ _id: '1', binId: 'B001', date: new Date(), notes: 'Recycling', status: 'Pending' }] })
            })
        );

        render(<WasteRequestsTable />);

        // Wait for the request data to load
        await waitFor(() => expect(screen.getByText('B001')).toBeInTheDocument());

        // Click on the Cancel button
        fireEvent.click(screen.getByText(/cancel/i));

        // Mock the update status response to simulate failure
        fetch.mockImplementationOnce(() =>
            Promise.reject(new Error('Update failed'))
        );

        // Click on the Cancel button again
        fireEvent.click(screen.getByText(/cancel/i));

        // Wait for the error message to appear
        await waitFor(() => {
            expect(screen.getByText(/error updating status/i)).toBeInTheDocument();
        });
    });
});
