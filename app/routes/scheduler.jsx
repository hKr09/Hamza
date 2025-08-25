import React, { useState } from 'react';
import pkg from '@shopify/polaris';
const { Page, Layout, Card, Text, Stack, TextField, Button, ResourceList, ResourceItem, DatePicker, Select, Frame, TopBar, Navigation } = pkg;
import { HomeIcon, ImageIcon, ClockIcon } from '@shopify/polaris-icons';

const inMemory = { items: [] };

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get('title') || 'Untitled';
  const date = form.get('date');
  const time = form.get('time');
  const when = new Date(`${date}T${time}:00`);
  inMemory.items.unshift({ id: Date.now().toString(), title, when: when.toISOString() });
  return null;
};

export const loader = async () => {
  return { items: inMemory.items };
};

export default function Scheduler() {
  const [title, setTitle] = useState('New post');
  const [date, setDate] = useState(() => new Date());
  const [time, setTime] = useState('09:00');
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const times = [
    { label: '09:00', value: '09:00' },
    { label: '12:00', value: '12:00' },
    { label: '15:00', value: '15:00' },
    { label: '18:00', value: '18:00' },
  ];

  const navigation = (
    <Navigation location="/scheduler">
      <Navigation.Section
        items={[
          { label: 'Dashboard', icon: HomeIcon, url: '/dashboard' },
          { label: 'Agent Task', icon: ImageIcon, url: '/agent' },
          { label: 'Scheduler', icon: ClockIcon, url: '/scheduler', selected: true },
        ]}
      />
    </Navigation>
  );

  const topBar = <TopBar showNavigationToggle />;

  return (
    <Frame navigation={navigation} topBar={topBar}>
      <Page title="Scheduler" subtitle="Schedule upcoming posts">
        <Layout>
          <Layout.Section>
            <Card>
              <div className="p-6">
                <form method="post">
                  <Stack vertical spacing="loose">
                    <Text variant="headingMd" as="h3">Create a schedule</Text>
                    <TextField label="Title" name="title" value={title} onChange={setTitle} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Text variant="bodySm" tone="subdued">Date</Text>
                        <DatePicker month={month} year={year} onChange={({ start }) => { setDate(start); setMonth(start.getMonth()); setYear(start.getFullYear()); }} selected={date} />
                        <input type="hidden" name="date" value={`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`} />
                      </div>
                      <div>
                        <Select label="Time" options={times} value={time} onChange={setTime} name="time" />
                      </div>
                    </div>
                    <Button primary submit>Schedule</Button>
                  </Stack>
                </form>
              </div>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <div className="p-6">
                <Text variant="headingMd" as="h3">Upcoming</Text>
                <ResourceList
                  resourceName={{ singular: 'post', plural: 'posts' }}
                  items={inMemory.items}
                  renderItem={(item) => (
                    <ResourceItem id={item.id} accessibilityLabel={item.title}>
                      <div className="flex justify-between">
                        <Text as="h3" variant="bodyMd">{item.title}</Text>
                        <Text tone="subdued">{new Date(item.when).toLocaleString()}</Text>
                      </div>
                    </ResourceItem>
                  )}
                />
              </div>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}


