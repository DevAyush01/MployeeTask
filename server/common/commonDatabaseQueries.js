const Job = require('../models/Job');

// Create a new job
const createJob = async (jobData) => {
  try {
    const job = new Job(jobData);
    return await job.save();
  } catch (error) {
    throw new Error(`Error creating job: ${error.message}`);
  }
};

// Get all jobs with optional filters
const getJobs = async (filters = {}, sort = {}, pagination = {}) => {
  try {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    return await Job.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit);
  } catch (error) {
    throw new Error(`Error fetching jobs: ${error.message}`);
  }
};

// Get job by ID
const getJobById = async (jobId) => {
  try {
    return await Job.findOne({ jobId });
  } catch (error) {
    throw new Error(`Error fetching job by ID: ${error.message}`);
  }
};

// Update job by ID
const updateJob = async (jobId, updateData) => {
  try {
    return await Job.findOneAndUpdate(
      { jobId },
      { $set: updateData },
      { new: true }
    );
  } catch (error) {
    throw new Error(`Error updating job: ${error.message}`);
  }
};

// Delete job by ID
const deleteJob = async (jobId) => {
  try {
    return await Job.findOneAndDelete({ jobId });
  } catch (error) {
    throw new Error(`Error deleting job: ${error.message}`);
  }
};

// Search jobs by text (title, company, location)
const searchJobs = async (searchText) => {
  try {
    return await Job.find({
      $or: [
        { title: { $regex: searchText, $options: 'i' } },
        { company: { $regex: searchText, $options: 'i' } },
        { location: { $regex: searchText, $options: 'i' } }
      ]
    });
  } catch (error) {
    throw new Error(`Error searching jobs: ${error.message}`);
  }
};

// Get job statistics
const getJobStatistics = async () => {
  try {
    return await Job.aggregate([
      {
        $group: {
          _id: '$location',
          count: { $sum: 1 },
          avgMinExp: { $avg: '$min_exp' },
          avgMaxExp: { $avg: '$max_exp' }
        }
      },
      { $sort: { count: -1 } }
    ]);
  } catch (error) {
    throw new Error(`Error getting job statistics: ${error.message}`);
  }
};

// Get jobs by experience range
const getJobsByExperience = async (minExp, maxExp) => {
  try {
    return await Job.find({
      min_exp: { $gte: minExp },
      max_exp: { $lte: maxExp }
    });
  } catch (error) {
    throw new Error(`Error getting jobs by experience: ${error.message}`);
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  searchJobs,
  getJobStatistics,
  getJobsByExperience
};