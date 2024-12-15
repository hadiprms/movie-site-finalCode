import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const filteredValue = value.replace(/[^0-9]/g, '');
      setFeedback({ ...feedback, [name]: filteredValue });
    } else {
      setFeedback({ ...feedback, [name]: value });
    }
  };

  const handleKeyPress = (e) => {
    const invalidKeys = [
      'e', 'E', '+', '-', '.'
    ];

    if (e.target.name === 'phone' && invalidKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!feedback.name) newErrors.name = 'Name is required';
    if (!feedback.email) newErrors.email = 'Email is required';
    if (!feedback.phone) newErrors.phone = 'Phone number is required';
    if (!feedback.description) newErrors.description = 'Description is required';
    else if (feedback.description.length < 10) newErrors.description = 'Description must be at least 10 characters';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    console.log(feedback);
    alert('Feedback submitted! Thank you!');
    setFeedback({ name: '', email: '', phone: '', description: '' });
    setErrors({});
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{color: 'white'}}>
        Submit Your Feedback
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={feedback.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={Boolean(errors.name)}
          helperText={errors.name}
          InputLabelProps={{
            style: { color: 'orange'},
          }}
          InputProps={{
            style: { color: 'white' },
          }}
          sx={{  
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'orange',
              },  
              '&:hover fieldset': {
                borderColor: 'orange',
              },  
              '&.Mui-focused fieldset': {
                borderColor: 'orange',
              },
            },
          }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={feedback.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={Boolean(errors.email)}
          helperText={errors.email}
          InputLabelProps={{
            style: { color: 'orange' },
          }}
          InputProps={{
            style: { color: 'white' },
          }}
          sx={{  
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'orange',
              },  
              '&:hover fieldset': {
                borderColor: 'orange',
              },  
              '&.Mui-focused fieldset': {
                borderColor: 'orange',
              },
            },
          }}
        />
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          value={feedback.phone}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          fullWidth
          margin="normal"
          required
          error={Boolean(errors.phone)}
          helperText={errors.phone}
          InputLabelProps={{
            style: { color: 'orange' },
          }}
          InputProps={{
            style: { color: 'white' },
          }}
          sx={{  
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'orange',
              },  
              '&:hover fieldset': {
                borderColor: 'orange',
              },  
              '&.Mui-focused fieldset': {
                borderColor: 'orange',
              },
            },
          }}
        />
        <TextField
          label="Description"
          name="description"
          value={feedback.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
          error={Boolean(errors.description)}
          helperText={errors.description}
          InputLabelProps={{
            style: { color: 'orange' },
          }}
          InputProps={{
            style: { color: 'white' },
          }}
          sx={{  
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'orange',
              },  
              '&:hover fieldset': {
                borderColor: 'orange',
              },  
              '&.Mui-focused fieldset': {
                borderColor: 'orange',
              },
            },
          }}
        />  
        <Button type="submit" variant="contained" style={{backgroundColor: 'orange', color: 'white'}}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default FeedbackForm;