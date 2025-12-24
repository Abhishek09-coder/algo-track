import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/ui/StatCard';
import { getDifficultyStats, getWeakTopics } from '../api/analytics.api';
import { getHeatmap } from '../api/analytics.api';
import Heatmap from '../components/heatmap/Heatmap';
import HeatmapLegend from '../components/heatmap/HeatmapLegend';
import RecommendationCard from '../components/recommendations/RecommendationCard';
import { getRecommendations } from '../api/analytics.api';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState(null);
  const [weakTopics, setWeakTopics] = useState([]);
  const [heatmap, setHeatmap] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const diffData = await getDifficultyStats();
      const weakData = await getWeakTopics();
      const heatmapData = await getHeatmap();
      setHeatmap(heatmapData.heatmap);

      const recData = await getRecommendations();
      setRecommendations(recData.recommendations);

      setDifficulty(diffData);
      setWeakTopics(weakData.weakTopics);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
  if (loading) {
  return (
    <DashboardLayout>
      <p className="text-slate-500">Loading dashboard...</p>
    </DashboardLayout>
  );
}
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-semibold text-slate-800 mb-6">
        Dashboard
      </h1>

      {/* Stat Cards */}
      {difficulty && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Easy Solved" value={difficulty.easy} />
          <StatCard title="Medium Solved" value={difficulty.medium} />
          <StatCard title="Hard Solved" value={difficulty.hard} />
        </div>
      )}
      <div className="mt-10">
  <h2 className="text-xl font-semibold text-slate-800 mb-4">
    Practice Heatmap
  </h2>

  {heatmap.length === 0 ? (
    <p className="text-slate-500">No practice data yet</p>
  ) : (
    <>
      <Heatmap data={heatmap} />
      <HeatmapLegend />

    </>
  )}
</div>



      {/* Weak Topics */}
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Weak Topics
        </h2>

        {weakTopics.length === 0 ? (
  <div className="bg-white rounded-xl p-6 text-slate-600 shadow-sm">
    🎉 No weak topics right now. Keep going!
  </div>
): (
          <ul className="space-y-2">
            {weakTopics.map((item) => (
              <li
                key={item.topic}
                className="bg-white rounded-lg p-4 shadow-sm flex justify-between"
              >
                <span className="font-medium">{item.topic}</span>
                <span className="text-sm text-slate-500">
                  {item.strength}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      
<div className="mt-12">
  <h2 className="text-xl font-semibold text-slate-800 mb-4">
    Revision Recommendations
  </h2>

  {recommendations.length === 0 ? (
    <div className="bg-white rounded-xl p-6 text-slate-600 shadow-sm">
      🎉 No urgent revisions needed. Keep practicing!
    </div>
  ) : (
    <div className="space-y-4">
      {recommendations.map((item) => (
        <RecommendationCard key={item.topic} item={item} />
      ))}
    </div>
  )}
</div>
    </DashboardLayout>
  );
};

export default Dashboard;
