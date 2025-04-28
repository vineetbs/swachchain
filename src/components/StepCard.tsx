
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface StepCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  step: number;
  className?: string;
  isActive?: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ 
  title, 
  description, 
  icon, 
  step,
  className,
  isActive = false
}) => {
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all", 
      isActive ? "border-primary shadow-lg" : "hover:shadow-md",
      className
    )}>
      <div 
        className={cn(
          "absolute top-0 left-0 h-full w-1", 
          isActive ? "bg-primary" : "bg-muted"
        )} 
      />
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full text-primary-foreground",
            isActive ? "bg-primary" : "bg-muted text-muted-foreground"
          )}>
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg">
              <span className="text-muted-foreground mr-2">Step {step}:</span> {title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default StepCard;
