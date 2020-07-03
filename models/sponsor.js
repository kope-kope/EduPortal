const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sponsorSchema = new Schema(
  {
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  maritalStatus: {
    type: String,
    required: true
  },
  maidenName: {
    type: String
    
  },
  mobileNumber: {
    type: Number,
    required: true
  },
  signature: {
    type: String,
    require: true
  },
  insuranceCover: {
    type: String,
    required: true
  },

   beneficiaries: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Beneficiaries'
    }
  ],

},

  { timestamps: true }
);

module.exports = mongoose.model('Sponsors', sponsorSchema);
