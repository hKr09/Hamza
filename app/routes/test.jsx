import React from 'react';
import pkg from '@shopify/polaris';
const { Page, Layout, Card, Text } = pkg;
import CreditCounter from '../components/CreditCounter';
import StatsCard from '../components/StatsCard';

/**
 * Test page to verify components are working correctly
 */
export default function TestPage() {
  return (
    <Page title="Component Test" subtitle="Testing all components">
      <Layout>
        <Layout.Section>
          <Card>
            <div className="p-6">
              <Text variant="headingLg" as="h2">
                Component Test Page
              </Text>
              <p className="mt-4 text-gray-600">
                This page tests if all components are working correctly.
              </p>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div className="p-6">
              <Text variant="headingMd" as="h3" className="mb-4">
                Credit Counter Test
              </Text>
              <CreditCounter credits={25} />
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard
              title="Test Stat 1"
              value={123}
              icon="posts"
              color="bg-blue-100"
            />
            <StatsCard
              title="Test Stat 2"
              value={456}
              icon="scheduled"
              color="bg-yellow-100"
            />
            <StatsCard
              title="Test Stat 3"
              value={789}
              icon="posted"
              color="bg-green-100"
            />
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
