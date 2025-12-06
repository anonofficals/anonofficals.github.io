
import { Activity, Users, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import MetricsCard from "@/components/analytics/MetricsCard";
import ChartCard from "@/components/analytics/ChartCard";
import { useSystemAnalytics } from "@/hooks/useAnalyticsData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const SystemAnalytics = () => {
  const { systemMetrics, departmentData, monthlyData, roleData, loading } = useSystemAnalytics();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-white">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4">
      {/* System Overview Metrics - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {systemMetrics.length > 0 ? (
          systemMetrics.map((metric) => (
            <MetricsCard
              key={metric.id}
              title={metric.metric}
              value={metric.value}
              change={metric.change}
              status={metric.status}
              icon={Activity}
            />
          ))
        ) : (
          <div className="col-span-2 lg:col-span-4 text-center text-gray-400 py-8">
            No system metrics available. Connect to backend to load data.
          </div>
        )}
      </div>

      {/* Charts Section - Responsive Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Department Performance */}
        <ChartCard title="Department Performance">
          {departmentData.length > 0 ? (
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
                stroke="#9CA3AF" 
                fontSize={12}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="performance" fill="#3B82F6" />
            </BarChart>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No department data available
            </div>
          )}
        </ChartCard>

        {/* Role Distribution */}
        <ChartCard title="Role Distribution">
          {roleData.length > 0 ? (
            <PieChart>
              <Pie
                data={roleData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No role data available
            </div>
          )}
        </ChartCard>

        {/* Monthly Growth Trend */}
        <ChartCard title="Monthly Growth Trend" className="xl:col-span-2">
          {monthlyData.length > 0 ? (
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Revenue"
              />
              <Line 
                type="monotone" 
                dataKey="projects" 
                stroke="#F59E0B" 
                strokeWidth={2}
                name="Projects"
              />
            </LineChart>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No monthly data available
            </div>
          )}
        </ChartCard>
      </div>

      {/* Detailed Department Analytics */}
      {departmentData.length > 0 && (
        <ChartCard title="Detailed Department Analytics" className="col-span-full">
          <div className="space-y-2 sm:space-y-4 max-h-96 overflow-y-auto">
            {departmentData.map((dept) => (
              <div key={dept.id} className="p-2 sm:p-4 bg-gray-800/50 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 space-y-2 sm:space-y-0">
                  <h4 className="text-white font-semibold text-sm sm:text-base">{dept.name}</h4>
                  <div className={`inline-flex px-2 py-1 rounded text-xs ${
                    dept.performance >= 90 ? 'bg-green-600' : 
                    dept.performance >= 85 ? 'bg-yellow-600' : 'bg-red-600'
                  }`}>
                    {dept.performance}% Performance
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <p className="text-gray-400">Revenue</p>
                    <p className="text-white font-medium">${(dept.revenue / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Active Projects</p>
                    <p className="text-white font-medium">{dept.projects}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Avg Revenue/Project</p>
                    <p className="text-white font-medium">${(dept.revenue / dept.projects / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      )}
    </div>
  );
};

export default SystemAnalytics;
