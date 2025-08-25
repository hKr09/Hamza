import React, { useState, useEffect } from 'react';
import pkg from '@shopify/polaris';
const { 
  Page, 
  Layout, 
  Card, 
  Text, 
  Button, 
  Stack, 
  Grid,
  Frame,
  TopBar,
  Navigation
} = pkg;
import {
  HomeIcon,
  ImageIcon,
  ClockIcon,
  PlusIcon
} from '@shopify/polaris-icons';
import { useNavigate } from '@remix-run/react';
import CreditCounter from '../components/CreditCounter';
import StatsCard from '../components/StatsCard';

/**
 * Dashboard page displays user credits, statistics, and navigation
 * Uses mock data for demonstration purposes
 */
export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    credits: 23,
    stats: {
      totalPosts: 156,
      scheduledPosts: 8,
      postedPosts: 148
    }
  });

  // Mock data fetching - replace with actual API calls
  useEffect(() => {
    // Simulate API call
    const fetchUserData = async () => {
      // In real app, this would be: const data = await api.getUserData();
      console.log('Fetching user data...');
    };
    
    fetchUserData();
  }, []);

  const handleGeneratePost = () => {
    navigate('/generate');
  };

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: 'Dashboard',
            icon: HomeIcon,
            url: '/dashboard',
            selected: true,
          },
          {
            label: 'Generate Post',
            icon: ImageIcon,
            url: '/generate',
          },
          {
            label: 'History',
            icon: ClockIcon,
            url: '/history',
          },
        ]}
      />
    </Navigation>
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={
        <TopBar.UserMenu
          actions={[
            {
              items: [{ content: 'Settings' }],
            },
          ]}
          name="Shop Owner"
          detail="Store Name"
          initials="SO"
          open={false}
          onToggle={() => {}}
        />
      }
    />
  );

  return (
    <Frame navigation={navigationMarkup} topBar={topBarMarkup}>
      <Page title="Dashboard" subtitle="AI-Powered Social Media Content Generator">
        <Layout>
          {/* Credits Section */}
          <Layout.Section>
            <Card>
              <div className="p-6 gradient-bg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <Text variant="headingLg" as="h2" className="text-gray-900 mb-2">
                      Welcome back! 🎉
                    </Text>
                    <Text variant="bodyMd" as="p" tone="subdued">
                      Ready to create amazing social media content for your store?
                    </Text>
                  </div>
                  <div className="flex-shrink-0">
                    <CreditCounter credits={userData.credits} size="large" />
                  </div>
                </div>
              </div>
            </Card>
          </Layout.Section>

          {/* Quick Actions */}
          <Layout.Section>
            <Card>
              <div className="p-6">
                <Stack vertical spacing="loose">
                  <div className="text-center">
                    <Text variant="headingMd" as="h3" className="mb-4">
                      Ready to create content?
                    </Text>
                    <Button
                      primary
                      size="large"
                      icon={PlusIcon}
                      onClick={handleGeneratePost}
                      className="px-8 py-3"
                    >
                      Generate New Post
                    </Button>
                  </div>
                </Stack>
              </div>
            </Card>
          </Layout.Section>

          {/* Stats Grid */}
          <Layout.Section>
            <div className="mb-4">
              <Text variant="headingMd" as="h3" className="text-gray-700">
                Your Content Statistics
              </Text>
            </div>
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 4 }}>
                <StatsCard
                  title="Total Posts Generated"
                  value={userData.stats.totalPosts}
                  icon="posts"
                  color="bg-blue-100"
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 4 }}>
                <StatsCard
                  title="Scheduled Posts"
                  value={userData.stats.scheduledPosts}
                  icon="scheduled"
                  color="bg-yellow-100"
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 4 }}>
                <StatsCard
                  title="Posted Successfully"
                  value={userData.stats.postedPosts}
                  icon="posted"
                  color="bg-green-100"
                />
              </Grid.Cell>
            </Grid>
          </Layout.Section>

          {/* Recent Activity */}
          <Layout.Section>
            <Card>
              <div className="p-6">
                <Stack vertical spacing="loose">
                  <Text variant="headingMd" as="h3">
                    Recent Activity
                  </Text>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <Text variant="bodyMd" as="p">
                        New post scheduled for Instagram on Friday at 2:00 PM
                      </Text>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <Text variant="bodyMd" as="p">
                        Facebook post published successfully
                      </Text>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <Text variant="bodyMd" as="p">
                        Email newsletter content generated
                      </Text>
                    </div>
                  </div>
                </Stack>
              </div>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}
