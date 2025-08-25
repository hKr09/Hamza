import React from 'react';
import pkg from '@shopify/polaris';
const { Card, Text, Icon } = pkg;
import { 
  ImageIcon, 
  CalendarIcon, 
  CheckCircleIcon 
} from '@shopify/polaris-icons';

/**
 * StatsCard component displays a single statistic with icon and value
 * @param {string} title - Title of the stat
 * @param {number} value - Numeric value to display
 * @param {string} icon - Polaris icon to display
 * @param {string} color - Tailwind color class for the icon background
 */
export default function StatsCard({ title, value, icon, color = 'bg-blue-100' }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'posts':
        return ImageIcon;
      case 'scheduled':
        return CalendarIcon;
      case 'posted':
        return CheckCircleIcon;
      default:
        return ImageIcon;
    }
  };

  const iconSource = getIcon(icon);

  return (
    <Card className="card-hover">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <Text variant="headingMd" as="h3" className="text-gray-700">
              {title}
            </Text>
            <Text variant="headingLg" as="p" className="text-2xl font-bold text-gray-900 mt-1">
              {value.toLocaleString()}
            </Text>
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon source={iconSource} />
          </div>
        </div>
      </div>
    </Card>
  );
}
