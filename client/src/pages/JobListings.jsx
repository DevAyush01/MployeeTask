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
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  const apiUrl = import.meta.env.VITE_URL || 'http://localhost:5000';

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      if (isMobileView) setSelectedJob(null);
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchTerm, jobs, isMobileView]);

  const handleSearch = (location) => {
    setSearchTerm(location);
  };

  const handleBackToList = () => {
    setSelectedJob(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen">Error: {error}</div>;
  }

  // Mobile view - Show either list or details
  if (isMobileView && selectedJob) {
    return (
      <div className="flex flex-col h-screen">
        <div className="p-4 bg-white border-b">
          <button 
            onClick={handleBackToList}
            className="flex items-center text-blue-600"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Jobs
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <JobDetails job={selectedJob} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 bg-white sticky top-0 z-10 shadow-sm">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {/* Job List and Details */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Left panel - Job list */}
        <div className={`${selectedJob && isMobileView ? 'hidden' : 'block'} w-full md:w-1/3 lg:w-2/5 overflow-y-auto`}>
          {filteredJobs.length > 0 ? (
            <div className="space-y-2 p-2">
              {filteredJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onClick={() => setSelectedJob(job)}
                  isSelected={selectedJob?.id === job.id}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No jobs found Matched
            </div>
          )}
        </div>
        
        {/* Right panel - Job details */}
        <div className={`${!selectedJob && isMobileView ? 'hidden' : 'block'} w-full md:w-2/3 lg:w-3/5 p-4 overflow-y-auto bg-gray-50`}>
          {selectedJob ? (
            <JobDetails job={selectedJob} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              {filteredJobs.length > 0 ? "Select a job to view details" : "No jobs to display"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}