const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <p className="text-sm text-slate-500 mb-1">{title}</p>
      <h2 className="text-3xl font-semibold text-slate-800">
        {value}
      </h2>
    </div>
  );
};

export default StatCard;
