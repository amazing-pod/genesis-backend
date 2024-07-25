import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { serve } from '@novu/framework/express';
import { Novu } from '@novu/node';
import { testWorkflow } from './novu/workflows';
import axios from 'axios'; // Use default import for axios

import limiter from './middleware/rateLimiter.js'; // Ensure correct import path

import userRoutes from './routes/userRoutes';

const PORT = 3000;
const novu = new Novu('e4fe13f5dc5d1f4097993d6c4360d6fc');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(limiter);

// Required for Novu POST requests
app.use('/api/novu', serve({ workflows: [testWorkflow] }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Dummy function to simulate database update
async function likePostInDatabase(postId, userId) {
  // Simulate a database update for liking a post
  console.log(`User ${userId} liked post ${postId}`);
  return true;
}

// Function to send the notification
async function sendLikeNotification() {
  try {
    await novu.trigger('like-post-notification', {
      to: {
        subscriberId: '6695569b2b72370872914016', // Replace with the actual subscriberId
        email: 'anitadugbartey@college.harvard.edu', // Replace with the actual email
      },
      payload: {
        // Include additional data here if needed
      }
    });
    console.log('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

app.post('/like-post', async (req, res) => {
  const { postId, userId } = req.body;

  if (!postId || !userId) {
    return res.status(400).send('Post ID and User ID are required');
  }

  try {
    // Handle the logic for liking a post
    const result = await likePostInDatabase(postId, userId);

    if (result) {
      // Send the notification
      await sendLikeNotification();
      return res.status(200).send('Post liked and notification sent');
    } else {
      return res.status(500).send('Failed to like post');
    }
  } catch (error) {
    console.error('Error liking post:', error);
    return res.status(500).send('An error occurred');
  }
});

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
