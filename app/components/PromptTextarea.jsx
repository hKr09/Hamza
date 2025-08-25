import React, { useState, useCallback } from 'react';
import pkg from '@shopify/polaris';
const { TextField, Text, Stack } = pkg;

/**
 * PromptTextarea component for entering AI prompts with character count
 * @param {string} value - Current prompt value
 * @param {Function} onChange - Callback when prompt changes
 * @param {string} placeholder - Placeholder text
 * @param {number} maxLength - Maximum character limit
 */
export default function PromptTextarea({ 
  value, 
  onChange, 
  placeholder = "Describe the style, tone, or theme for your social post...",
  maxLength = 500 
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback((value) => {
    if (value.length <= maxLength) {
      onChange(value);
    }
  }, [onChange, maxLength]);

  const characterCount = value.length;
  const isNearLimit = characterCount > maxLength * 0.8;
  const isAtLimit = characterCount >= maxLength;

  return (
    <div className="w-full">
      <Stack vertical spacing="tight">
        <Text variant="headingMd" as="h3">
          AI Prompt
        </Text>
        <div className={`relative ${isFocused ? 'ring-2 ring-shopify-blue ring-opacity-50' : ''}`}>
          <TextField
            label="Customize your AI prompt"
            labelInline
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            multiline={4}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            helpText="Be specific about the style, tone, target audience, and any special requirements"
            maxLength={maxLength}
            showCharacterCount
          />
        </div>
        <div className="flex justify-between items-center text-sm">
          <Text variant="bodySm" tone="subdued">
            Tip: Include details like "casual tone", "professional style", "targeting millennials"
          </Text>
          <div className={`text-sm font-medium ${
            isAtLimit ? 'text-red-600' : 
            isNearLimit ? 'text-yellow-600' : 
            'text-gray-500'
          }`}>
            {characterCount}/{maxLength}
          </div>
        </div>
      </Stack>
    </div>
  );
}
