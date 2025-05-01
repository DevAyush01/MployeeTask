const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  job_link: {
    type: String,
    required: true
  },
  employment_type: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  postedDateTime: {
    type: Date,
    required: true
  },
  companyImageUrl: {
    type: String
  },
  min_exp: {
    type: Number
  },
  max_exp: {
    type: Number
  },
  seniority_level: {
    type: String
  },
  company_url: {
    type: String
  }
}, {
  timestamps: true
});

// Create index for faster location searches
jobSchema.index({ location: 'text' });

module.exports = mongoose.model('Job', jobSchema);