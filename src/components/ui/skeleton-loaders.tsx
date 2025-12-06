import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const SkeletonCard = ({ className }: { className?: string }) => (
  <Card className={cn("bg-card/50 border-border", className)}>
    <CardContent className="p-4">
      <div className="flex items-center space-x-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export const SkeletonTable = ({ 
  rows = 5, 
  columns = 4,
  className 
}: { 
  rows?: number; 
  columns?: number;
  className?: string;
}) => (
  <Card className={cn("bg-card/50 border-border", className)}>
    <CardHeader>
      <Skeleton className="h-6 w-48" />
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex gap-4 pb-2 border-b border-border">
        {[...Array(columns)].map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {[...Array(columns)].map((_, colIndex) => (
            <Skeleton 
              key={colIndex} 
              className={cn("h-10 flex-1", colIndex === 0 && "w-1/4")} 
            />
          ))}
        </div>
      ))}
    </CardContent>
  </Card>
);

export const SkeletonChart = ({ className }: { className?: string }) => (
  <Card className={cn("bg-card/50 border-border", className)}>
    <CardHeader>
      <Skeleton className="h-6 w-32" />
    </CardHeader>
    <CardContent>
      <div className="h-64 flex items-end gap-2">
        {[...Array(12)].map((_, i) => (
          <Skeleton 
            key={i} 
            className="flex-1" 
            style={{ height: `${Math.random() * 60 + 20}%` }} 
          />
        ))}
      </div>
    </CardContent>
  </Card>
);

export const SkeletonForm = ({ fields = 5 }: { fields?: number }) => (
  <div className="space-y-4">
    {[...Array(fields)].map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
    ))}
    <Skeleton className="h-10 w-32 mt-4" />
  </div>
);

export const SkeletonDashboardStats = ({ count = 4 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {[...Array(count)].map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);
