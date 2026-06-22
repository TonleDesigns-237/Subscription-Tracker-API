import { sendReminderEmail } from './utils/send-email.js';

const testSubscription = {
    user: {
        name: 'Test User',
        email: 'tonledjatsajeanyves@gmail.com', // Replace with your email
    },
    name: 'Test Subscription',
    price: 9.99,
    currency: 'USD',
    frequency: 'monthly',
    paymentMethod: 'credit_card',
    renewalDate: new Date('2026-06-15'),
};

await sendReminderEmail({
    to: 'tonledjatsajeanyves@gmail.com', // Replace with your email
    type: '7 days before reminder',
    subscription: testSubscription,
});
