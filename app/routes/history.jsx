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
  TextField,
  Select,
  EmptyState,
  Pagination,
  Icon
} = pkg;
import { 
  HomeIcon, 
  ImageIcon, 
  ClockIcon,
  SearchIcon,
  FilterIcon
} from '@shopify/polaris-icons';
import { useNavigate } from '@remix-run/react';
import CreditCounter from '../components/CreditCounter';
import HistoryCard from '../components/HistoryCard';

/**
 * History page displays all generated posts with filtering, search, and management options
 * Shows posts in different statuses: scheduled, posted, and drafts
 */
export default function History() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  
  // Mock posts data - replace with actual API call
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

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
          },
          {
            label: 'History',
            icon: ClockIcon,
            url: '/history',
            selected: true,
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

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockPosts = [
      {
        id: '1',
        title: 'Premium Headphones Launch',
        image: 'https://via.placeholder.com/80x80?text=Headphones',
        caption: '🎉 Introducing our amazing Premium Wireless Headphones! ✨ This incredible product is designed to enhance your daily life with premium quality and innovative features...',
        platform: 'instagram',
        status: 'posted',
        scheduledTime: null,
        postedAt: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        title: 'Smart Watch Promotion',
        image: 'https://via.placeholder.com/80x80?text=Watch',
        caption: '🚀 Upgrade your fitness game with our Smart Fitness Watch! Track your progress, monitor your health, and stay connected...',
        platform: 'facebook',
        status: 'scheduled',
        scheduledTime: '2024-01-20T14:00:00Z',
        postedAt: null
      },
      {
        id: '3',
        title: 'Organic T-Shirt Collection',
        image: 'https://via.placeholder.com/80x80?text=T-Shirt',
        caption: '🌱 Sustainable fashion meets comfort! Our Organic Cotton T-Shirt collection is perfect for eco-conscious consumers...',
        platform: 'instagram',
        status: 'draft',
        scheduledTime: null,
        postedAt: null
      },
      {
        id: '4',
        title: 'Ceramic Mug Launch',
        image: 'https://via.placeholder.com/80x80?text=Mug',
        caption: '☕ Start your mornings right with our Handcrafted Ceramic Mug! Beautiful design meets functionality...',
        platform: 'email',
        status: 'posted',
        scheduledTime: null,
        postedAt: '2024-01-10T09:15:00Z'
      },
      {
        id: '5',
        title: 'Holiday Collection Preview',
        image: 'https://via.placeholder.com/80x80?text=Holiday',
        caption: '🎄 Get ready for the holiday season with our exclusive collection! Perfect gifts for your loved ones...',
        platform: 'facebook',
        status: 'scheduled',
        scheduledTime: '2024-01-25T16:00:00Z',
        postedAt: null
      },
      {
        id: '6',
        title: 'Summer Sale Announcement',
        image: 'https://via.placeholder.com/80x80?text=Summer',
        caption: '☀️ Summer sale is here! Get up to 50% off on selected items. Don\'t miss out on these amazing deals...',
        platform: 'instagram',
        status: 'posted',
        scheduledTime: null,
        postedAt: '2024-01-08T11:45:00Z'
      }
    ];
    
    setPosts(mockPosts);
  }, []);

  // Filter and search posts
  useEffect(() => {
    let filtered = posts;
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(post => post.status === statusFilter);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.platform.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [posts, statusFilter, searchQuery]);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleDelete = (postId) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    // In real app, this would call API to delete from backend
  };

  const handleReschedule = (postId, newDateTime) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, scheduledTime: newDateTime.toISOString() }
        : post
    ));
    // In real app, this would call API to update backend
  };

  const handleEdit = (post) => {
    // Navigate to generate page with post data
    navigate('/generate', { 
      state: { 
        editMode: true, 
        postData: post 
      } 
    });
  };

  const statusOptions = [
    { label: 'All Posts', value: 'all' },
    { label: 'Scheduled', value: 'scheduled' },
    { label: 'Posted', value: 'posted' },
    { label: 'Drafts', value: 'draft' }
  ];

  const getStatusCount = (status) => {
    if (status === 'all') return posts.length;
    return posts.filter(post => post.status === status).length;
  };

  return (
    <Frame navigation={navigationMarkup} topBar={topBarMarkup}>
      <Page
        title="Post History"
        subtitle="Manage and review all your generated social media content"
      >
        <Layout>
          {/* Credits Display */}
          <Layout.Section>
            <div className="flex justify-end">
              <CreditCounter credits={23} />
            </div>
          </Layout.Section>

          {/* Filters and Search */}
          <Layout.Section>
            <Card>
              <div className="p-6">
                <Stack vertical spacing="loose">
                  <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                    <Text variant="headingMd" as="h2">
                      Your Content Library
                    </Text>
                    <Button
                      primary
                      icon={ImageIcon}
                      onClick={() => navigate('/generate')}
                    >
                      Create New Post
                    </Button>
                  </div>
                  
                  <Grid>
                    {/* Search */}
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                      <TextField
                        label="Search posts"
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search by title, caption, or platform..."
                        prefix={<Icon source={SearchIcon} />}
                        clearButton
                        onClearButtonClick={() => setSearchQuery('')}
                      />
                    </Grid.Cell>

                    {/* Status Filter */}
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                      <Select
                        label="Filter by status"
                        options={statusOptions}
                        value={statusFilter}
                        onChange={setStatusFilter}
                        prefix={<Icon source={FilterIcon} />}
                      />
                    </Grid.Cell>
                  </Grid>

                  {/* Status Counts */}
                  <div className="flex flex-wrap gap-4">
                    {statusOptions.map(option => (
                      <div key={option.value} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          option.value === 'all' ? 'bg-gray-400' :
                          option.value === 'scheduled' ? 'bg-blue-400' :
                          option.value === 'posted' ? 'bg-green-400' :
                          'bg-yellow-400'
                        }`}></div>
                        <Text variant="bodySm" tone="subdued">
                          {option.label}: {getStatusCount(option.value)}
                        </Text>
                      </div>
                    ))}
                  </div>
                </Stack>
              </div>
            </Card>
          </Layout.Section>

          {/* Posts Grid */}
          <Layout.Section>
            {currentPosts.length === 0 ? (
              <Card>
                <div className="p-12">
                  <EmptyState
                    heading="No posts found"
                    image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                  >
                    <p>
                      {searchQuery || statusFilter !== 'all' 
                        ? 'Try adjusting your search or filters to find what you\'re looking for.'
                        : 'Start creating amazing social media content for your store!'
                      }
                    </p>
                    {!searchQuery && statusFilter === 'all' && (
                      <Button primary onClick={() => navigate('/generate')}>
                        Create Your First Post
                      </Button>
                    )}
                  </EmptyState>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {currentPosts.map(post => (
                  <HistoryCard
                    key={post.id}
                    post={post}
                    onDelete={handleDelete}
                    onReschedule={handleReschedule}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            )}
          </Layout.Section>

          {/* Pagination */}
          {totalPages > 1 && (
            <Layout.Section>
              <div className="flex justify-center">
                <Pagination
                  label={`Page ${currentPage} of ${totalPages}`}
                  hasPrevious={currentPage > 1}
                  onPrevious={() => setCurrentPage(prev => prev - 1)}
                  hasNext={currentPage < totalPages}
                  onNext={() => setCurrentPage(prev => prev + 1)}
                />
              </div>
            </Layout.Section>
          )}
        </Layout>
      </Page>
    </Frame>
  );
}
