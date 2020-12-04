const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  fullName: {
    type: String,
    required: true
  },

 idNumber: {
    type: String,
    required: true
  },

  nationality: {
    type: String,
    required: true
  },

  Gender: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phoneNumber: {
    type: Number,
    required:true
  },

  date_of_birth: {
    type: String,
    required: true
  },

  accountName: {
    type: String,
    required: true
  },

  accountNumber: {
    type: Number,
    required: true
  },

  maritalStatus: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }

});

UserSchema.methods.validPassword = function (password) {
  if (password === this.password) {
    return true; 
  } else {
    return false;
  }
}
const User = mongoose.model('User', UserSchema);


module.exports = User;