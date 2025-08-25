import React, { useState, useCallback } from 'react';
import pkg from '@shopify/polaris';
const { ChoiceList, Text, Stack, Thumbnail } = pkg;

/**
 * PlatformSelect component allows users to select multiple social media platforms
 * @param {Array} selectedPlatforms - Array of selected platform IDs
 * @param {Function} onPlatformsChange - Callback when platform selection changes
 */
export default function PlatformSelect({ selectedPlatforms, onPlatformsChange }) {
  const [selected, setSelected] = useState(selectedPlatforms || []);

  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'https://cdn-icons-png.flaticon.com/512/174/174855.png',
      description: 'Perfect for visual content and stories'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'https://cdn-icons-png.flaticon.com/512/174/174848.png',
      description: 'Great for community engagement and sharing'
    },
    {
      id: 'email',
      name: 'Email Newsletter',
      icon: 'https://cdn-icons-png.flaticon.com/512/552/552489.png',
      description: 'Direct communication with your subscribers'
    }
  ];

  const handleChange = useCallback((value) => {
    setSelected(value);
    onPlatformsChange(value);
  }, [onPlatformsChange]);

  const choices = platforms.map(platform => ({
    label: (
      <div className="flex items-center gap-3 py-2">
        <Thumbnail
          source={platform.icon}
          alt={platform.name}
          size="small"
        />
        <div>
          <Text variant="bodyMd" as="p" className="font-medium">
            {platform.name}
          </Text>
          <Text variant="bodySm" as="p" tone="subdued">
            {platform.description}
          </Text>
        </div>
      </div>
    ),
    value: platform.id,
  }));

  return (
    <div className="w-full">
      <Stack vertical spacing="tight">
        <Text variant="headingMd" as="h3">
          Select Platforms
        </Text>
        <ChoiceList
          title="Choose where to publish your content"
          allowMultiple
          choices={choices}
          selected={selected}
          onChange={handleChange}
          helpText="Select one or more platforms. Content will be optimized for each platform's requirements."
        />
        {selected.length > 0 && (
          <div className="mt-2 p-3 bg-blue-50 rounded-md">
            <Text variant="bodySm" tone="subdued">
              Selected: {selected.length} platform{selected.length !== 1 ? 's' : ''}
            </Text>
          </div>
        )}
      </Stack>
    </div>
  );
}
