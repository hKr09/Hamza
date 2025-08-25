import { redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import pkg from '@shopify/polaris';
const { Page, Card, Layout, Text, Button, Stack, Banner } = pkg;
import { 
  HomeIcon,
  ImageIcon,
  ClockIcon,
  PlusIcon,
  ChartBarIcon
} from '@shopify/polaris-icons';

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  
  // If there's a shop parameter, redirect to the app
  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }
  
  // For authenticated users, redirect to dashboard
  // In a real app, you'd check authentication status here
  // For now, we'll show the landing page
  return {};
};

export default function Index() {
  return (
    <Page 
      title="AI Social Post Studio" 
      subtitle="Create engaging social media content with AI"
      fullWidth
    >
      <Layout>
        <Layout.Section>
          <Banner
            title="Welcome to AI Social Post Studio"
            tone="info"
          >
            <p>Transform your social media presence with AI-powered content creation.</p>
          </Banner>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: '24px' }}>
              <Stack vertical spacing="loose">
                <Text variant="headingMd" as="h2">
                  Get Started
                </Text>
                <Text variant="bodyMd" as="p">
                  Choose an action to begin creating amazing social media content for your store.
                </Text>
                
                <Stack distribution="fillEvenly" spacing="tight">
                  <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <Button 
                      primary 
                      fullWidth
                      icon={HomeIcon}
                    >
                      Dashboard
                    </Button>
                  </Link>
                  
                  <Link to="/generate" style={{ textDecoration: 'none' }}>
                    <Button 
                      fullWidth
                      icon={PlusIcon}
                    >
                      Generate Post
                    </Button>
                  </Link>
                </Stack>
              </Stack>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section secondary>
          <Card>
            <div style={{ padding: '24px' }}>
              <Stack vertical spacing="loose">
                <Text variant="headingMd" as="h3">
                  Quick Actions
                </Text>
                
                <Stack vertical spacing="tight">
                  <Link to="/agent" style={{ textDecoration: 'none' }}>
                    <Button 
                      fullWidth 
                      variant="plain"
                      icon={ImageIcon}
                    >
                      AI Agent
                    </Button>
                  </Link>
                  
                  <Link to="/scheduler" style={{ textDecoration: 'none' }}>
                    <Button 
                      fullWidth 
                      variant="plain"
                      icon={ClockIcon}
                    >
                      Post Scheduler
                    </Button>
                  </Link>
                  
                  <Link to="/history" style={{ textDecoration: 'none' }}>
                    <Button 
                      fullWidth 
                      variant="plain"
                      icon={ChartBarIcon}
                    >
                      Post History
                    </Button>
                  </Link>
                </Stack>
              </Stack>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
