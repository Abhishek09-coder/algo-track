const getColor = (count) => {
  if (count === 0) return 'bg-slate-200';
  if (count === 1) return 'bg-green-200';
  if (count === 2) return 'bg-green-400';
  return 'bg-green-600';
};

const Heatmap = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-7 gap-2 w-max">
        {data.map((day) => (
          <div
            key={day.date}
            title={`${day.date}: ${day.count} problems`}
            className={`w-8 h-8 rounded ${getColor(day.count)}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Heatmap;
