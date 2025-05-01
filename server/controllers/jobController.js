const {
  getJobs,
  getJobById,
  searchJobs,
} = require('../common/commonDatabaseQueries');

const getAllJobs = async (req, res) => {
  try {
    const { location, title, employment_type, min_exp, max_exp, page = 1, limit = 10 } = req.query;
    
    const filters = {};
    const sort = { postedDateTime: -1 };
    const pagination = { page: parseInt(page), limit: parseInt(limit) };

    if (location) filters.location = { $regex: location, $options: 'i' };
    if (title) filters.title = { $regex: title, $options: 'i' };
    if (employment_type) filters.employment_type = employment_type;
    if (min_exp || max_exp) {
      filters.$and = [];
      if (min_exp) filters.$and.push({ min_exp: { $gte: parseInt(min_exp) } });
      if (max_exp) filters.$and.push({ max_exp: { $lte: parseInt(max_exp) } });
    }

    const jobs = await getJobs(filters, sort, pagination);
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


const getJobStats = async (req, res) => {
  try {
    const stats = await getJobStatistics();
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


const searchAllJobs = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const jobs = await searchJobs(q);
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllJobs,
  getJobStats,
  searchAllJobs
};