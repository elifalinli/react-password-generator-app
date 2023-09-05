import React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import App from '../App';
import { expect, it } from 'vitest';

describe('App Component', () => {
    beforeEach(() => {
      render(<App />);
    });
  
    it('should render the initial UI', () => {
      expect(screen.getByPlaceholderText(/Minimum of 6 character/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Generate me a password!/ })).toBeInTheDocument();
    });

    it('should generate a password and updates the result field', async () => {
      const generateButton = screen.getByRole('button', {name: /Generate me a password!/});
      fireEvent.click(generateButton);

      await act(async () => {
        const resultField = await screen.findByPlaceholderText('Minimum of 6 character');
        expect(resultField).toBeInTheDocument();
        expect(resultField.value).toHaveLength(6);
      })
    });
    // it('should copy the generated password to the clipboard', async () => {
    //   const clipboardButton = screen.getByTestId('clipboard');
    //   fireEvent.click(clipboardButton)
    //   await waitFor(() => {
    //     expect(screen.getByText(/Copied to your clipboard!/)).toBeInTheDocument();
    //   });
    // });
})