import React, { useState, useCallback } from 'react';
import pkg from '@shopify/polaris';
const { 
  Card, 
  Text, 
  Button, 
  Stack, 
  Thumbnail, 
  Badge, 
  Icon, 
  Modal, 
  DatePicker, 
  Select 
} = pkg;
import { 
  DeleteIcon, 
  CalendarIcon, 
  EditIcon
} from '@shopify/polaris-icons';

/**
 * HistoryCard component displays a single post history item with actions
 * @param {Object} post - Post history item
 * @param {Function} onDelete - Callback for deleting post
 * @param {Function} onReschedule - Callback for rescheduling post
 * @param {Function} onEdit - Callback for editing post
 */
export default function HistoryCard({ post, onDelete, onReschedule, onEdit }) {
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(new Date(post.scheduledTime || new Date()));
  const [scheduledTime, setScheduledTime] = useState('09:00');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'scheduled':
        return <Badge tone="info">Scheduled</Badge>;
      case 'posted':
        return <Badge tone="success">Posted</Badge>;
      case 'draft':
        return <Badge tone="warning">Draft</Badge>;
      default:
        return <Badge tone="subdued">Unknown</Badge>;
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram':
        return 'https://cdn-icons-png.flaticon.com/512/174/174855.png';
      case 'facebook':
        return 'https://cdn-icons-png.flaticon.com/512/174/174848.png';
      case 'email':
        return 'https://cdn-icons-png.flaticon.com/512/552/552489.png';
      default:
        return 'https://cdn-icons-png.flaticon.com/512/174/174855.png';
    }
  };

  const handleReschedule = useCallback(() => {
    const scheduledDateTime = new Date(scheduledDate);
    const [hours, minutes] = scheduledTime.split(':');
    scheduledDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    onReschedule(post.id, scheduledDateTime);
    setRescheduleModalOpen(false);
  }, [scheduledDate, scheduledTime, onReschedule, post.id]);

  const timeOptions = [
    { label: '9:00 AM', value: '09:00' },
    { label: '12:00 PM', value: '12:00' },
    { label: '3:00 PM', value: '15:00' },
    { label: '6:00 PM', value: '18:00' },
  ];

  return (
    <div className="w-full">
      <Card className="card-hover">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Image and Basic Info */}
            <div className="flex items-start gap-3">
              <Thumbnail
                source={post.image || 'https://via.placeholder.com/80x80?text=Post+Image'}
                alt="Post thumbnail"
                size="medium"
              />
              <div className="flex-1 min-w-0">
                <Text variant="headingMd" as="h3" className="font-medium truncate">
                  {post.title || 'Untitled Post'}
                </Text>
                <div className="flex items-center gap-2 mt-1">
                  <Thumbnail
                    source={getPlatformIcon(post.platform)}
                    alt={post.platform}
                    size="small"
                  />
                  <Text variant="bodySm" as="p" tone="subdued" className="capitalize">
                    {post.platform}
                  </Text>
                </div>
              </div>
            </div>

            {/* Caption Preview */}
            <div className="flex-1 min-w-0">
              <Text variant="bodyMd" as="p" className="line-clamp-3">
                {post.caption || 'No caption available'}
              </Text>
              {post.scheduledTime && (
                <div className="flex items-center gap-1 mt-2">
                  <Icon source={CalendarIcon} />
                  <Text variant="bodySm" as="p" tone="subdued">
                    {new Date(post.scheduledTime).toLocaleDateString()} at{' '}
                    {new Date(post.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </div>
              )}
              {post.postedAt && (
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <Text variant="bodySm" as="p" tone="subdued">
                    Posted {new Date(post.postedAt).toLocaleDateString()}
                  </Text>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                {getStatusBadge(post.status)}
                <div className="flex gap-1">
                  <Button
                    icon={EditIcon}
                    onClick={() => onEdit(post)}
                    variant="plain"
                    size="slim"
                  >
                    Edit
                  </Button>
                  <Button
                    icon={DeleteIcon}
                    onClick={() => onDelete(post.id)}
                    variant="plain"
                    size="slim"
                    tone="critical"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              
              {post.status === 'scheduled' && (
                <Button
                  icon={CalendarIcon}
                  onClick={() => setRescheduleModalOpen(true)}
                  variant="secondary"
                  size="slim"
                >
                  Reschedule
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Reschedule Modal */}
      <Modal
        open={rescheduleModalOpen}
        onClose={() => setRescheduleModalOpen(false)}
        title="Reschedule Post"
        primaryAction={{
          content: 'Reschedule',
          onAction: handleReschedule,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => setRescheduleModalOpen(false),
          },
        ]}
      >
        <Modal.Section>
          <Stack vertical spacing="loose">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Text variant="bodySm" tone="subdued">Date</Text>
                <DatePicker
                  month={scheduledDate.getMonth()}
                  year={scheduledDate.getFullYear()}
                  onChange={({ start }) => setScheduledDate(start)}
                  selected={scheduledDate}
                />
              </div>
              <div>
                <Select
                  label="Time"
                  options={timeOptions}
                  value={scheduledTime}
                  onChange={setScheduledTime}
                />
              </div>
            </div>
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  );
}
