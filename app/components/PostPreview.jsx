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
  Select, 
  TextField 
} = pkg;
import { 
  ExportIcon, 
  EditIcon, 
  CalendarIcon, 
  SendIcon
} from '@shopify/polaris-icons';

/**
 * PostPreview component displays generated AI content with action buttons
 * @param {Object} post - Generated post data
 * @param {Function} onDownload - Callback for downloading image
 * @param {Function} onSchedule - Callback for scheduling post
 * @param {Function} onPostNow - Callback for posting immediately
 * @param {Function} onCaptionEdit - Callback for caption editing
 */
export default function PostPreview({ 
  post, 
  onDownload, 
  onSchedule, 
  onPostNow, 
  onCaptionEdit 
}) {
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [editedCaption, setEditedCaption] = useState(post?.caption || '');
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [scheduledTime, setScheduledTime] = useState('09:00');

  const handleCaptionSave = useCallback(() => {
    onCaptionEdit(editedCaption);
    setIsEditingCaption(false);
  }, [editedCaption, onCaptionEdit]);

  const handleSchedule = useCallback(() => {
    const scheduledDateTime = new Date(scheduledDate);
    const [hours, minutes] = scheduledTime.split(':');
    scheduledDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    onSchedule({
      date: scheduledDateTime,
      platforms: post.platforms
    });
    setScheduleModalOpen(false);
  }, [scheduledDate, scheduledTime, onSchedule, post]);

  const timeOptions = [
    { label: '9:00 AM', value: '09:00' },
    { label: '12:00 PM', value: '12:00' },
    { label: '3:00 PM', value: '15:00' },
    { label: '6:00 PM', value: '18:00' },
    { label: '8:00 PM', value: '20:00' },
  ];

  if (!post) return null;

  return (
    <div className="w-full">
      <Card className="overflow-hidden">
        <div className="p-6">
          <Stack vertical spacing="loose">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Text variant="headingLg" as="h2">
                Generated Content
              </Text>
              <div className="flex gap-2">
                {post.platforms?.map(platform => (
                  <Badge key={platform} tone="info">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Image Preview */}
              <div className="space-y-4">
                <Text variant="headingMd" as="h3">
                  Generated Image
                </Text>
                <div className="relative">
                  <Thumbnail
                    source={post.image || 'https://via.placeholder.com/400x400?text=AI+Generated+Image'}
                    alt="AI Generated Post"
                    size="large"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge tone="success">AI Generated</Badge>
                  </div>
                </div>
                <Button
                  icon={ExportIcon}
                  onClick={onDownload}
                  fullWidth
                  variant="secondary"
                >
                  Download Image
                </Button>
              </div>

              {/* Caption Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Text variant="headingMd" as="h3">
                    Generated Caption
                  </Text>
                  <Button
                    icon={EditIcon}
                    onClick={() => setIsEditingCaption(true)}
                    variant="plain"
                    size="slim"
                  >
                    Edit
                  </Button>
                </div>
                
                {isEditingCaption ? (
                  <div className="space-y-3">
                    <TextField
                      label="Edit Caption"
                      value={editedCaption}
                      onChange={setEditedCaption}
                      multiline={8}
                      autoComplete="off"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleCaptionSave} primary>
                        Save Changes
                      </Button>
                      <Button 
                        onClick={() => {
                          setIsEditingCaption(false);
                          setEditedCaption(post.caption || '');
                        }}
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 rounded-md">
                    <Text variant="bodyMd" as="p" className="whitespace-pre-wrap">
                      {post.caption || 'No caption generated'}
                    </Text>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button
                icon={CalendarIcon}
                onClick={() => setScheduleModalOpen(true)}
                variant="secondary"
                fullWidth
              >
                Schedule Post
              </Button>
              <Button
                icon={SendIcon}
                onClick={onPostNow}
                primary
                fullWidth
              >
                Post Now
              </Button>
            </div>

            {/* Generation Info */}
            <div className="pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <Text variant="bodySm" as="p" tone="subdued">
                    Generated: {new Date(post.generatedAt).toLocaleString()}
                  </Text>
                </div>
                <div>
                  <Text variant="bodySm" as="p" tone="subdued">
                    Product: {post.productId || 'N/A'}
                  </Text>
                </div>
                <div>
                  <Text variant="bodySm" as="p" tone="subdued">
                    Platforms: {post.platforms?.join(', ') || 'None'}
                  </Text>
                </div>
              </div>
            </div>
          </Stack>
        </div>
      </Card>

      {/* Schedule Modal */}
      <Modal
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        title="Schedule Post"
        primaryAction={{
          content: 'Schedule',
          onAction: handleSchedule,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => setScheduleModalOpen(false),
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
            <div className="p-3 bg-blue-50 rounded-md">
              <Text variant="bodySm" tone="subdued">
                Post will be scheduled for {scheduledDate.toLocaleDateString()} at {timeOptions.find(t => t.value === scheduledTime)?.label}
              </Text>
            </div>
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  );
}
