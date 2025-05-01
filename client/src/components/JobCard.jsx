export default function JobCard({ job, isSelected, onClick }) {
    return (
      <div
        className={`p-4 rounded-lg cursor-pointer transition-all ${
          isSelected
            ? 'bg-blue-50 border-l-4 border-blue-500'
            : 'bg-white hover:bg-gray-50 border'
        }`}
        onClick={onClick}
      >
        <h3 className="font-semibold text-lg">{job.title}</h3>
        <p className="text-gray-600">
          {job.company} — {job.location}
        </p>
        <p className="text-gray-500 mt-2 line-clamp-2">{job.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {job.employment_type}
          </span>
          <span className="text-sm font-medium">
            ${job.min_salary || 'N/A'} - ${job.max_salary || 'N/A'} / hour
          </span>
        </div>
      </div>
    )
  }