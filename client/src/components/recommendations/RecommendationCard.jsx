const priorityColor = {
  'very-high': 'border-red-500 bg-red-50',
  high: 'border-orange-400 bg-orange-50',
};

const RecommendationCard = ({ item }) => {
  return (
    <div
      className={`border-l-4 rounded-xl p-5 shadow-sm ${priorityColor[item.priority]}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            {item.topic}
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            {item.reason}
          </p>
        </div>

        <span className="text-xs font-medium text-slate-700 uppercase">
          {item.priority}
        </span>
      </div>

      <p className="mt-4 text-slate-700">
        👉 {item.suggestion}
      </p>
    </div>
  );
};

export default RecommendationCard;
