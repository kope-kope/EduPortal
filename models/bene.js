const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beneSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    presentClass: {
      type: String,
      required: true
    },
    sponsor: {
      type: Schema.Types.ObjectId,
      ref: 'Sponsor',
      required: true
    },
    phD: {
      country: String,
      institutionName: String
    },
    postGraduate:{
      country: String,
      institutionName: String
  },
  underGraduate:{
    country: String,
    institutionName: String
},
secondarySchool:{
  country: String,
  institutionName: String
},
primarySchool:{
  country: String,
  institutionName: String
}

  },
  { timestamps: true }
);

module.exports = mongoose.model('Beneficiaries', beneSchema);
