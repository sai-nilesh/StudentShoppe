const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    
    validate: {
      validator: function(value) {
        // Simple email validation regex
        return /\S+@\S+\.\S+/.test(value);
      },
      message: 'Invalid email format'
    }
  },
  products: [{
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true
    },
    image_url: {
      type: String,
      required: true
    },
    condition: {
      type: String,
      required: true
    },
    history: {
      type: String,
    },
    warranty: {
      type: String,
      
    },
    Owner_Name: {
      type: String,
      required: true
    },
    Owner_Number: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          // Regex to check if the phone number contains at least 10 digits
          return /^\d{10,}$/.test(value);
        },
        message: 'Phone number must contain at least 10 digits.'
      }
    }
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
