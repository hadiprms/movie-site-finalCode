import React from 'react';  
import { render, screen, fireEvent } from '@testing-library/react';  
import FeedbackForm from '../feedback/feedback';  // Adjust path according to your directory structure  
import { describe, it, expect, beforeEach } from 'vitest';  
import '@testing-library/jest-dom/vitest';

describe('<FeedbackForm />', () => {  
  let nameInput, emailInput, phoneInput, descriptionInput, submitButton;  

  const setup = () => {  
    render(<FeedbackForm />);  
    nameInput = screen.getByLabelText(/name/i);  
    emailInput = screen.getByLabelText(/email/i);  
    phoneInput = screen.getByLabelText(/phone/i);  
    descriptionInput = screen.getByLabelText(/description/i);  
    submitButton = screen.getByRole('button', { name: /submit/i });  
  };  

  beforeEach(() => {  
    setup();  
  });  

  it('renders the form fields', () => {  
    expect(nameInput).toBeInTheDocument();  
    expect(emailInput).toBeInTheDocument();  
    expect(phoneInput).toBeInTheDocument();  
    expect(descriptionInput).toBeInTheDocument();  
    expect(submitButton).toBeInTheDocument();  
  });  

  // it('validates required fields', async () => {  
  //   fireEvent.click(submitButton);  
    
  //   expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();  
  //   expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();  
  //   expect(await screen.findByText(/Phone number is required/i)).toBeInTheDocument();  
  //   expect(await screen.findByText(/Description is required/i)).toBeInTheDocument();  
  // });  

  // it('validates description length', async () => {  
  //   fireEvent.input(descriptionInput, { target: { value: 'short' } });  
  //   fireEvent.click(submitButton);  

  //   expect(await screen.findByText(/Description must be at least 10 characters/i)).toBeInTheDocument();  
  // });  

  it('submits the form when the inputs are valid', async () => {  
    fireEvent.input(nameInput, { target: { value: 'John Doe' } });  
    fireEvent.input(emailInput, { target: { value: 'john.doe@example.com' } });  
    fireEvent.input(phoneInput, { target: { value: '1234567890' } });  
    fireEvent.input(descriptionInput, { target: { value: 'This is a valid description.' } });  

    // Mock alert function  
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});  

    fireEvent.click(submitButton);  

    expect(alertMock).toHaveBeenCalledWith('Feedback submitted! Thank you!');  
    
    expect(nameInput.value).toBe('');  
    expect(emailInput.value).toBe('');  
    expect(phoneInput.value).toBe('');  
    expect(descriptionInput.value).toBe('');  
  });  
});