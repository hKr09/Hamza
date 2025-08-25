import React from 'react';
import pkg from '@shopify/polaris';
const { Badge, Text } = pkg;

/**
 * CreditCounter component displays the remaining credits for the user
 * @param {number} credits - Number of credits remaining
 * @param {string} size - Size of the badge (small, medium, large)
 */
export default function CreditCounter({ credits, size = 'medium' }) {
  const getBadgeTone = (credits) => {
    if (credits <= 5) return 'critical';
    if (credits <= 15) return 'warning';
    return 'success';
  };

  return (
    <div className="flex items-center gap-2">
      <Badge tone={getBadgeTone(credits)} size={size}>
        {credits} Credits Left
      </Badge>
      {credits <= 5 && (
        <Text variant="bodySm" tone="critical">
          Low credits - consider purchasing more
        </Text>
      )}
    </div>
  );
}
