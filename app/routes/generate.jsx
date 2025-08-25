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
  Navigation,
  Spinner,
  Toast
} = pkg;
import { 
  HomeIcon, 
  ImageIcon, 
  ClockIcon,
  ArrowLeftIcon
} from '@shopify/polaris-icons';
import { useNavigate } from '@remix-run/react';
import CreditCounter from '../components/CreditCounter';
import ProductSelect from '../components/ProductSelect';
import PromptTextarea from '../components/PromptTextarea';
import PlatformSelect from '../components/PlatformSelect';
import PostPreview from '../components/PostPreview';

/**
 * Generate Post page allows users to create AI-powered social media content
 * Includes product selection, AI prompt input, platform selection, and content preview
 */
export default function GeneratePost() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastError, setToastError] = useState(false);
  
  // Form state
  const [selectedProduct, setSelectedProduct] = useState('');
  const [prompt, setPrompt] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [generatedPost, setGeneratedPost] = useState(null);
  
  // User data
  const [userCredits, setUserCredits] = useState(23);

  // Mock products data - replace with actual API call
  const mockProducts = [
    {
      id: '1',
      title: 'Premium Wireless Headphones',
      image: 'https://via.placeholder.com/60x60?text=Headphones',
      price: 199.99
    },
    {
      id: '2',
      title: 'Smart Fitness Watch',
      image: 'https://via.placeholder.com/60x60?text=Watch',
      price: 299.99
    },
    {
      id: '3',
      title: 'Organic Cotton T-Shirt',
      image: 'https://via.placeholder.com/60x60?text=T-Shirt',
      price: 29.99
    },
    {
      id: '4',
      title: 'Handcrafted Ceramic Mug',
      image: 'https://via.placeholder.com/60x60?text=Mug',
      price: 19.99
    }
  ];

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: 'Dashboard',
            icon: HomeIcon,
            url: '/dashboard',
          },
          {
            label: 'Generate Post',
            icon: ImageIcon,
            url: '/generate',
            selected: true,
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

  const showToastMessage = (message, isError = false) => {
    setToastMessage(message);
    setToastError(isError);
    setShowToast(true);
  };

  const handleGeneratePost = async () => {
    if (!selectedProduct) {
      showToastMessage('Please select a product first', true);
      return;
    }
    if (!prompt.trim()) {
      showToastMessage('Please enter a prompt for AI generation', true);
      return;
    }
    if (selectedPlatforms.length === 0) {
      showToastMessage('Please select at least one platform', true);
      return;
    }
    if (userCredits <= 0) {
      showToastMessage('Insufficient credits. Please purchase more credits.', true);
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate API call for AI generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock generated content
      const mockGeneratedPost = {
        id: Date.now().toString(),
        image: 'https://via.placeholder.com/400x400?text=AI+Generated+Social+Post',
        caption: `🎉 Introducing our amazing ${mockProducts.find(p => p.id === selectedProduct)?.title}! ✨\n\nThis incredible product is designed to enhance your daily life with premium quality and innovative features. Perfect for anyone who values excellence and style.\n\n🔥 Limited time offer available!\n💡 Perfect gift idea\n🚀 Free shipping on orders over $50\n\n#PremiumQuality #Innovation #Lifestyle #ShopNow #LimitedOffer`,
        platforms: selectedPlatforms,
        productId: selectedProduct,
        prompt: prompt,
        generatedAt: new Date().toISOString()
      };
      
      setGeneratedPost(mockGeneratedPost);
      setUserCredits(prev => prev - 1); // Deduct 1 credit
      showToastMessage('Content generated successfully! 🎉');
      
    } catch (error) {
      showToastMessage('Failed to generate content. Please try again.', true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    showToastMessage('Download started! 📥');
    // In real app, this would trigger actual download
  };

  const handleSchedule = (scheduleData) => {
    showToastMessage(`Post scheduled for ${scheduleData.date.toLocaleDateString()} at ${scheduleData.date.toLocaleTimeString()} 📅`);
    // In real app, this would save to backend
  };

  const handlePostNow = () => {
    showToastMessage('Post published successfully! 🚀');
    // In real app, this would publish to selected platforms
  };

  const handleCaptionEdit = (newCaption) => {
    setGeneratedPost(prev => ({
      ...prev,
      caption: newCaption
    }));
    showToastMessage('Caption updated successfully! ✏️');
  };

  const isFormValid = selectedProduct && prompt.trim() && selectedPlatforms.length > 0;

  return (
    <Frame navigation={navigationMarkup} topBar={topBarMarkup}>
      <Page
        title="Generate New Post"
        subtitle="Create AI-powered social media content for your products"
        backAction={{
          content: 'Dashboard',
          icon: ArrowLeftIcon,
          onAction: () => navigate('/dashboard'),
        }}
      >
        <Layout>
          {/* Credits Display */}
          <Layout.Section>
            <div className="flex justify-end">
              <CreditCounter credits={userCredits} />
            </div>
          </Layout.Section>

          {/* Main Form */}
          <Layout.Section>
            <Card>
              <div className="p-6">
                <Stack vertical spacing="loose">
                  <Text variant="headingLg" as="h2" className="text-gray-900">
                    Create Your Social Media Content
                  </Text>
                  
                  <Grid>
                    {/* Product Selection */}
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                      <ProductSelect
                        products={mockProducts}
                        selectedProduct={selectedProduct}
                        onProductChange={setSelectedProduct}
                      />
                    </Grid.Cell>

                    {/* Platform Selection */}
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                      <PlatformSelect
                        selectedPlatforms={selectedPlatforms}
                        onPlatformsChange={setSelectedPlatforms}
                      />
                    </Grid.Cell>
                  </Grid>

                  {/* AI Prompt */}
                  <PromptTextarea
                    value={prompt}
                    onChange={setPrompt}
                  />

                  {/* Generate Button */}
                  <div className="text-center pt-4">
                    <Button
                      primary
                      size="large"
                      onClick={handleGeneratePost}
                      disabled={!isFormValid || isGenerating}
                      loading={isGenerating}
                      className="px-12 py-3"
                    >
                      {isGenerating ? 'Generating Content...' : 'Generate Post'}
                    </Button>
                    
                    {isGenerating && (
                      <div className="mt-4 flex items-center justify-center gap-2">
                        <Spinner size="small" />
                        <Text variant="bodyMd" tone="subdued">
                          AI is creating your content... This may take a few moments.
                        </Text>
                      </div>
                    )}
                  </div>
                </Stack>
              </div>
            </Card>
          </Layout.Section>

          {/* Generated Content Preview */}
          {generatedPost && (
            <Layout.Section>
              <PostPreview
                post={generatedPost}
                onDownload={handleDownload}
                onSchedule={handleSchedule}
                onPostNow={handlePostNow}
                onCaptionEdit={handleCaptionEdit}
              />
            </Layout.Section>
          )}

          {/* Help Section */}
          <Layout.Section>
            <Card>
              <div className="p-6">
                <Stack vertical spacing="tight">
                  <Text variant="headingMd" as="h3">
                    💡 Tips for Better AI Generation
                  </Text>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <Text variant="bodyMd" as="p" className="font-medium mb-2">
                        Be Specific:
                      </Text>
                      <Text variant="bodySm" as="p" tone="subdued">
                        "Casual tone for Instagram, targeting millennials interested in fitness"
                      </Text>
                    </div>
                    <div>
                      <Text variant="bodyMd" as="p" className="font-medium mb-2">
                        Include Context:
                      </Text>
                      <Text variant="bodySm" as="p" tone="subdued">
                        "Highlight the premium quality and durability for professional audience"
                      </Text>
                    </div>
                  </div>
                </Stack>
              </div>
            </Card>
          </Layout.Section>
        </Layout>

        {/* Toast Notifications */}
        {showToast && (
          <Toast
            content={toastMessage}
            error={toastError}
            onDismiss={() => setShowToast(false)}
            duration={4000}
          />
        )}
      </Page>
    </Frame>
  );
}
