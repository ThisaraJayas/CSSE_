// src/__tests__/AddWasteType.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddWasteType from '../pages/AddWasteType';
import { AuthProvider } from '../middleware/AuthContext'; 

describe('AddWasteType Component', () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <AddWasteType />
        </MemoryRouter>
      </AuthProvider>
    );
  });

  test('renders the Add Waste Type form', () => {
    const titleElement = screen.getByText(/add a waste type/i);
    expect(titleElement).toBeInTheDocument();

    const typeNameInput = screen.getByPlaceholderText(/enter the waste type name/i);
    expect(typeNameInput).toBeInTheDocument();
    // ... (other input checks)
  });

  test('allows the user to fill out the form', () => {
    // (same as before)
  });

  test('submits the form successfully', async () => {
    // (same as before)
    // Add assert to check if fields are cleared
    expect(screen.getByPlaceholderText(/enter the waste type name/i).value).toBe('');
    expect(screen.getByPlaceholderText(/add rate/i).value).toBe('');
    expect(screen.getByPlaceholderText(/enter maximum weight/i).value).toBe('');
    expect(screen.getByPlaceholderText(/enter a description/i).value).toBe('');
  });

  test('shows an alert on submission error', async () => {
    // (same as before)
  });

  test('prevents submission if required fields are empty', async () => {
    fireEvent.click(screen.getByText(/add waste type/i));
    
    // Check if an alert was shown or form was not submitted
    expect(window.alert).not.toHaveBeenCalled(); // Adjust according to your actual alert logic
    // You can also check for specific validation messages if you implement them.
  });
});
