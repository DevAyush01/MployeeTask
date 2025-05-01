const mongoose = require('mongoose');
const Job = require('../models/Job');
const dbConnect = require('../config/dbConnect');
const fs = require('fs');
const path = require('path');

dbConnect();

const filePath = path.join(__dirname, '../config/MployeeData.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const jobs = JSON.parse(rawData);

const insertJobs = async () => {
  try {
    const insertCount = {
      inserted: 0,
      skipped: 0
    };

    for (const job of jobs) {
      // Validate and prepare fields
      const jobId = parseInt(job["Job ID (Numeric)"]);
      if (!jobId) continue;

      const exists = await Job.findOne({ jobId });
      if (exists) {
        insertCount.skipped++;
        continue;
      }

      const newJob = new Job({
        jobId,
        title: job.title,
        company: job.company,
        location: job.location,
        job_link: job.job_link,
        employment_type: job.employment_type,
        experience: job.experience,
        source: job.source,
        country: job.country || 'India', // Default if missing
        postedDateTime: new Date(job.postedDateTime?.$date || Date.now()),
        companyImageUrl: job.companyImageUrl || '',
        min_exp: job.min_exp || 0,
        max_exp: job.max_exp || 0,
        seniority_level: job.seniority_level || '',
        company_url: job.company_url || ''
      });

      await newJob.save();
      insertCount.inserted++;
    }

    console.log(`Jobs inserted: ${insertCount.inserted}, skipped (duplicates): ${insertCount.skipped}`);
  } catch (err) {
    console.error('Error inserting jobs:', err);
  } finally {
    mongoose.disconnect();
  }
};

insertJobs();
