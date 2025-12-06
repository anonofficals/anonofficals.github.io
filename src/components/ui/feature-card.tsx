import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

export interface FeatureCardAction {
  label: string;
  onClick?: () => void;
  href?: string;
  icon?: LucideIcon;
  variant?: 'default' | 'outline' | 'secondary';
}

export interface FeatureCardProps {
  title: string;
  description?: string;
  image?: string;
  badges?: { label: string; variant?: 'default' | 'secondary' | 'destructive' | 'outline' }[];
  icon?: LucideIcon;
  actions?: FeatureCardAction[];
  metadata?: { icon: LucideIcon; label: string }[];
  className?: string;
  imageClassName?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  image,
  badges,
  icon: Icon,
  actions,
  metadata,
  className = '',
  imageClassName = ''
}) => {
  return (
    <Card className={`bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:scale-105 group ${className}`}>
      {image && (
        <div className={`aspect-video overflow-hidden rounded-t-lg ${imageClassName}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}
      
      <CardHeader>
        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {badges.map((badge, index) => (
              <Badge key={index} variant={badge.variant || 'secondary'} className="bg-blue-500/20 text-blue-300">
                {badge.label}
              </Badge>
            ))}
          </div>
        )}
        
        <CardTitle className="text-white text-xl flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5" />}
          {title}
        </CardTitle>
        
        {description && (
          <CardDescription className="text-gray-300">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {metadata && metadata.length > 0 && (
          <div className="grid grid-cols-2 gap-3 text-sm">
            {metadata.map((item, index) => (
              <div key={index} className="flex items-center text-gray-300">
                <item.icon className="w-4 h-4 mr-2" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        )}
        
        {actions && actions.length > 0 && (
          <div className="flex gap-2 pt-2">
            {actions.map((action, index) => {
              const ButtonContent = (
                <>
                  {action.icon && <action.icon className="w-4 h-4 mr-2" />}
                  {action.label}
                </>
              );
              
              if (action.href) {
                return (
                  <Button
                    key={index}
                    variant={action.variant || 'default'}
                    className="flex-1"
                    asChild
                  >
                    <a href={action.href} target="_blank" rel="noopener noreferrer">
                      {ButtonContent}
                    </a>
                  </Button>
                );
              }
              
              return (
                <Button
                  key={index}
                  variant={action.variant || 'default'}
                  className="flex-1"
                  onClick={action.onClick}
                >
                  {ButtonContent}
                </Button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
