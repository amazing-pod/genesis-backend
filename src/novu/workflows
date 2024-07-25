import { workflow } from "@novu/framework";

export const notificationWorkflow = workflow(
  "test-app-notification",
  async ({ step, payload }) => {
      await step.inApp(
        "app notification 123",
        async () => {
          return {
            body: `Let's test out a new notification`,
          };
        },
    )
  },
);
