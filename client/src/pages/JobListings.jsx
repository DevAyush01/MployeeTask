import { useState, useEffect } from 'react';
import axios from 'axios';
import JobDetails from '../components/JobDetails';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';

export default function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const apiUrl = import.meta.env.VITE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/jobs`);
        setJobs(response.data);
        setFilteredJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = jobs.filter(job =>
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
      // Clear selected job when search changes
      setSelectedJob(null);
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchTerm, jobs]);

  const handleSearch = (location) => {
    setSearchTerm(location);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col">
      {/* Search Bar */}
      <div className="p-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {/* Job List and Details */}
      <div className="flex flex-1">
        {/* Left panel - Job list */}
        <div className="w-1/3 overflow-y-auto">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => setSelectedJob(job)}
                isSelected={selectedJob?.id === job.id}
              />
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No jobs found matching your search
            </div>
          )}
        </div>
        
        {/* Right panel - Job details */}
        <div className="w-2/3 p-4">
          {selectedJob ? (
            <JobDetails job={selectedJob} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              {filteredJobs.length > 0 ? "Select a job" : "No jobs to display"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}