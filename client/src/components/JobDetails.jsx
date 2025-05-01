export default function JobDetails({ job }) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold">{job.title}</h2>
          <p className="text-gray-600 text-lg">
            {job.company} — {job.location}
          </p>
          <div className="flex gap-2 mt-2">
            <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
              {job.employment_type}
            </span>
            <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
              Posted {new Date(job.postedDateTime).toLocaleDateString()}
            </span>
          </div>
        </div>
  
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Job Description</h3>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>
  
        {job.qualifications?.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Qualifications</h3>
            <ul className="list-disc pl-5 space-y-1">
              {job.qualifications.map((qual, index) => (
                <li key={index} className="text-gray-700">
                  {qual}
                </li>
              ))}
            </ul>
          </div>
        )}
  
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Salary Range</h3>
          <p className="text-gray-700">
            ${job.min_salary || 'N/A'} - ${job.max_salary || 'N/A'} per hour
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Experience</h3>
          <p className="text-gray-700">
            {job.experience || 'N/A'} 
          </p>
        </div>
  
        <a
          href={job.job_link || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Apply Now
        </a>
      </div>
    )
  }