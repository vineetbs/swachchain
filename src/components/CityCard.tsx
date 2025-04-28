
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CityCardProps {
  rank: number;
  city: string;
  score: number;
  reportCount: number;
}

const CityCard: React.FC<CityCardProps> = ({ rank, city, score, reportCount }) => {
  // Determine badge color based on rank
  const getBadgeColor = () => {
    if (rank === 1) return 'bg-yellow-400 hover:bg-yellow-400';
    if (rank === 2) return 'bg-slate-300 hover:bg-slate-300';
    if (rank === 3) return 'bg-amber-700 hover:bg-amber-700';
    return 'bg-muted hover:bg-muted';
  };

  return (
    <Card className="hover:shadow-md transition-all animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{city}</CardTitle>
          <Badge className={getBadgeColor()}>
            <Trophy className="h-3 w-3 mr-1" />
            #{rank}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-primary">{score.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Score</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{reportCount}</p>
            <p className="text-xs text-muted-foreground">Reports</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CityCard;
