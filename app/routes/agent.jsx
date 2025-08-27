import React, { useMemo, useState } from 'react';
import pkg from '@shopify/polaris';
const { Page, Layout, Card, Text, Grid, Button, TextField, Select, Stack, Thumbnail, Frame, TopBar, Navigation, Toast } = pkg;
import { HomeIcon, ImageIcon, ClockIcon, DuplicateIcon, ExportIcon } from '@shopify/polaris-icons';

export const meta = () => [{ title: 'Agent Task - AI Social Post Studio' }];

export default function AgentPage() {
  const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/400x400?text=AI+Image');
  const [prompt, setPrompt] = useState('Write a playful caption about our new ceramic mug.');
  const [tone, setTone] = useState('playful');
  const [style, setStyle] = useState('short');
  const [postType, setPostType] = useState('instagram');
  const [caption, setCaption] = useState('☕ Meet your new morning ritual! Our handcrafted ceramic mug keeps vibes cozy and coffee hotter. #MorningMood #CozySips');
  const [toast, setToast] = useState({ open: false, content: '', error: false });

  const tones = [
    { label: 'Playful', value: 'playful' },
    { label: 'Professional', value: 'professional' },
    { label: 'Inspirational', value: 'inspirational' },
  ];

  const styles = [
    { label: 'Short', value: 'short' },
    { label: 'Medium', value: 'medium' },
    { label: 'Long', value: 'long' },
  ];

  const postTypes = [
    { label: 'Instagram', value: 'instagram' },
    { label: 'Facebook', value: 'facebook' },
    { label: 'Twitter/X', value: 'twitter' },
    { label: 'Email', value: 'email' },
  ];

  const navigation = (
    <Navigation location="/agent">
      <Navigation.Section
        items={[
          { label: 'Dashboard', icon: HomeIcon, url: '/dashboard' },
          { label: 'Agent Task', icon: ImageIcon, url: '/agent', selected: true },
          { label: 'Scheduler', icon: ClockIcon, url: '/scheduler' },
        ]}
      />
    </Navigation>
  );

  const topBar = <TopBar showNavigationToggle />;

  const preview = useMemo(() => ({ imageUrl, caption }), [imageUrl, caption]);

  const copyCaption = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setToast({ open: true, content: 'Caption copied', error: false });
    } catch {
      setToast({ open: true, content: 'Failed to copy', error: true });
    }
  };

  const downloadImage = async () => {
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'post-image.png';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setToast({ open: true, content: 'Image downloaded', error: false });
    } catch {
      setToast({ open: true, content: 'Download failed', error: true });
    }
  };

  return (
    <Frame navigation={navigation} topBar={topBar}>
      <Page title="Agent Task" subtitle="Inputs on left, live preview on right">
        <Layout>
          <Layout.Section>
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <Card>
                  <div className="p-6">
                    <Stack vertical spacing="loose">
                      <Text variant="headingMd" as="h3">Inputs</Text>
                      <TextField label="Image URL" value={imageUrl} onChange={setImageUrl} placeholder="https://..." autoComplete="off" />
                      <TextField label="Prompt" value={prompt} onChange={setPrompt} multiline={4} />
                      <Select label="Tone" options={tones} value={tone} onChange={setTone} />
                      <Select label="Style" options={styles} value={style} onChange={setStyle} />
                      <Select label="Post type" options={postTypes} value={postType} onChange={setPostType} />
                      <Button primary onClick={() => setCaption(`${caption} ✨`)}>Generate (stub)</Button>
                    </Stack>
                  </div>
                </Card>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <Card>
                  <div className="p-6">
                    <Stack vertical spacing="loose">
                      <Text variant="headingMd" as="h3">Live Preview</Text>
                      <Thumbnail source={preview.imageUrl} alt="Preview" size="large" />
                      <TextField label="Caption" value={caption} onChange={setCaption} multiline={6} />
                      <div className="flex gap-3">
                        <Button icon={DuplicateIcon} onClick={copyCaption} variant="primary">Copy Caption</Button>
                        <Button icon={ExportIcon} onClick={downloadImage} variant="secondary">Download Image</Button>
                      </div>
                    </Stack>
                  </div>
                </Card>
              </Grid.Cell>
            </Grid>
          </Layout.Section>
        </Layout>
        {toast.open && (
          <Toast content={toast.content} error={toast.error} onDismiss={() => setToast({ ...toast, open: false })} />
        )}
      </Page>
    </Frame>
  );
}


