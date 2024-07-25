import { workflow } from "@novu/framework";
import { Novu } from '@novu/node'; 

const novu = new Novu('e4fe13f5dc5d1f4097993d6c4360d6fc');

export const inAppNotification = workflow(
  "test-app-notification",
  async ({ step, payload }) => {
      await step.inApp(
        "app notification 123",
        async () => {
          return {
            body: `A user liked your post`,
          };
        },
    )
  },
);
// Trigger the workflow

async function sendLikeNotification() {
  try {
    await novu.trigger('like-post-notification', {
      to: {
        subscriberId: '6695569b2b72370872914016', // Replace with the actual subscriberId
        email: 'anitadugbartey@college.harvard.edu', // Replace with the actual email
      },
      payload: {
        // You can include additional data here if needed
      }
    });
    console.log('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

// Call the function when a user likes a post
sendLikeNotification();
