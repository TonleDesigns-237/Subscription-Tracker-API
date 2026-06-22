import dayjs from 'dayjs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');

import Subscription from '../models/subscription.model.js';
import { sendReminderEmail } from '../utils/send-email.js';

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
    try {
        const { subscriptionId } = context.requestPayload;
        const subscription = await fetchSubscription(context, subscriptionId);

        if (!subscription || subscription.status !== 'active') {
            console.log(`Subscription ${subscriptionId} is not active. Stopping workflow.`);
            return;
        }

        const renewalDate = dayjs(subscription.renewalDate);

        if (renewalDate.isBefore(dayjs())) {
            console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
            return;
        }

        for (const daysBefore of REMINDERS) {
            const reminderDate = renewalDate.subtract(daysBefore, 'day');

            if (reminderDate.isAfter(dayjs())) {
                await sleepUntilReminder(context, `${daysBefore} days before reminder`, reminderDate);
            }

            if (dayjs().isSame(reminderDate, 'day')) {
                const labelMap = {
                    7: "7 days before reminder",
                    5: "5 days before reminder",
                    2: "2 days before reminder",
                    1: "1 days before reminder",
                };
                await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
            }}
    } catch (error) {
        console.error('Workflow error:', error);
        throw error;
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    });
};

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        console.log(`📧 Triggering ${label} reminder for ${subscription.user.email}`);
        
        try {
            await sendReminderEmail({
                to: subscription.user.email,
                type: label,
                subscription: subscription,
            });
            console.log(`✅ Email sent successfully to ${subscription.user.email}`);
        } catch (error) {
            console.error(`❌ Failed to send email:`, error.message);
        }
    });
};