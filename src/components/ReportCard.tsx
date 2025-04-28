
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface ReportCardProps {
  imageUrl: string;
  score: number;
  city: string;
  date: Date;
  badge?: string;
}

const ReportCard: React.FC<ReportCardProps> = ({ imageUrl, score, city, date, badge }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all animate-fade-in">
      <CardHeader className="p-0">
        <div className="aspect-video relative overflow-hidden bg-muted">
          <img 
            src={imageUrl} 
            alt={`Trash report from ${city}`} 
            className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
          />
          {badge && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="font-semibold text-xs">
                {badge}
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold text-primary">{score} points</p>
            <p className="text-sm text-muted-foreground">{city}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        {formatDistanceToNow(date, { addSuffix: true })}
      </CardFooter>
    </Card>
  );
};

export default ReportCard;
