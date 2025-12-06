import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: string;
  status?: 'up' | 'down' | 'neutral' | 'stable';
  icon: LucideIcon;
}

const MetricsCard = ({ title, value, change, status = 'neutral', icon: Icon }: MetricsCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      case 'stable':
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-white/5">
            <Icon className="w-5 h-5 text-blue-400" />
          </div>
          {change && (
            <div className={`flex items-center gap-1 text-sm ${getStatusColor()}`}>
              {getStatusIcon()}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-sm text-gray-400">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
