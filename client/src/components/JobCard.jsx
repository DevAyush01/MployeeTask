export default function JobCard({ job, isSelected, onClick }) {
  return (
    <div
      className={`p-3 md:p-4 rounded-lg cursor-pointer transition-all ${
        isSelected
          ? 'bg-blue-50 border-l-4 border-blue-500'
          : 'bg-white hover:bg-gray-50 border'
      }`}
      onClick={onClick}
    >
      <h3 className="font-semibold text-base md:text-lg">{job.title}</h3>
      <p className="text-gray-600 text-sm md:text-base">
        {job.company} — {job.location}
      </p>
      <p className="text-gray-500 mt-1 md:mt-2 text-sm line-clamp-2">{job.description}</p>
      <div className="mt-2 md:mt-3 flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
        <span className="text-xs md:text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {job.employment_type}
        </span>
        <span className="text-xs md:text-sm font-medium">
          ${job.min_salary || 'N/A'} - ${job.max_salary || 'N/A'} / hour
        </span>
      </div>
    </div>
  );
}