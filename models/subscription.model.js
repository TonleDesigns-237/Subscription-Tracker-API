import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
    }, 
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Subscription price must be greater than 0'],
    }, 
    currency: {
        type: String,
        required: [true, 'Subscription currency is required'],
        trim: true,
        uppercase: true,
        enum: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD'],
        default: 'EUR',
    }, 
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly',
    },
    category: {
        type: String,
        enum: ['entertainment', 'utilities', 'subscriptions', 'health', 'education', 'other'],
        required: [true, 'Subscription category is required'],
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'crypto', 'other'],
        required: [true, 'Subscription payment method is required'],
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'paused', 'cancelled'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, 'Subscription start date is required'],
        validate: {
            validator: function(value) {
                return value <= new Date();
            }, message: 'Subscription start date cannot be in the future',
        }
    }, 
    renewalDate: {
        type: Date,
        validate: {
            validator: function(value) {
                return !value || value > this.startDate;
            }, message: 'Subscription renewal date must be after the start date',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Subscription user is required'],
        index: true,
    },
},  {
        timestamps: true,
    }
);

//Auto-calculate renewalDate based on frequency and startDate if missing
subscriptionSchema.pre('save', function(next) {
    if (!this.renewalDate) {
        const renewalDate = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalDate[this.frequency]);
    }

    //Auto-update the status if renewalDate has passed
    if (this.renewalDate < new Date()) {
        this.status = 'expired'; 
    }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
