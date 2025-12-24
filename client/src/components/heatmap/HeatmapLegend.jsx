const LegendItem = ({ color, label }) => (
  <div className="flex items-center space-x-2">
    <div className={`w-4 h-4 rounded ${color}`} />
    <span className="text-sm text-slate-600">{label}</span>
  </div>
);

const HeatmapLegend = () => {
  return (
    <div className="flex space-x-4 mt-4">
      <LegendItem color="bg-slate-200" label="No practice" />
      <LegendItem color="bg-green-200" label="1 problem" />
      <LegendItem color="bg-green-400" label="2 problems" />
      <LegendItem color="bg-green-600" label="3+ problems" />
    </div>
  );
};

export default HeatmapLegend;
