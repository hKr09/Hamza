import React, { useState, useCallback } from 'react';
import pkg from '@shopify/polaris';
const { Select, Thumbnail, Text, Stack } = pkg;

/**
 * ProductSelect component allows users to choose a product from store catalog
 * @param {Array} products - Array of product objects
 * @param {string} selectedProduct - Currently selected product ID
 * @param {Function} onProductChange - Callback when product selection changes
 */
export default function ProductSelect({ products, selectedProduct, onProductChange }) {
  const [selected, setSelected] = useState(selectedProduct || '');

  const handleSelectChange = useCallback((value) => {
    setSelected(value);
    onProductChange(value);
  }, [onProductChange]);

  const options = products.map(product => ({
    label: (
      <div className="flex items-center gap-3 py-1">
        <Thumbnail
          source={product.image}
          alt={product.title}
          size="small"
        />
        <div className="flex-1 min-w-0">
          <Text variant="bodyMd" as="p" className="font-medium truncate">
            {product.title}
          </Text>
          <Text variant="bodySm" as="p" tone="subdued">
            ${product.price}
          </Text>
        </div>
      </div>
    ),
    value: product.id,
  }));

  return (
    <div className="w-full">
      <Stack vertical spacing="tight">
        <Text variant="headingMd" as="h3">
          Select Product
        </Text>
        <Select
          label="Choose a product to generate content for"
          labelInline
          options={options}
          value={selected}
          onChange={handleSelectChange}
          placeholder="Select a product..."
          helpText="Choose the product you want to create social media content for"
        />
      </Stack>
    </div>
  );
}
