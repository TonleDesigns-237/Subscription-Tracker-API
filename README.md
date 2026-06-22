# Subscription Tracker API

A production-ready backend API for tracking subscriptions with automated reminders.

## 🚀 Features

- 🔐 JWT Authentication
- 📧 Email reminders via Nodemailer
- ⏰ Automated workflows with QStash
- 🛡️ Rate limiting with Arcjet
- 📊 MongoDB Atlas integration
- 📝 Subscription CRUD operations

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB Atlas
- JWT + bcrypt
- QStash (Upstash)
- Nodemailer
- Arcjet

## 📋 API Endpoints

### Auth
- `POST /api/v1/auth/signup` - Register a new user
- `POST /api/v1/auth/signin` - Login
- `POST /api/v1/auth/signout` - Logout

### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID

### Subscriptions
- `POST /api/v1/subscriptions` - Create a subscription
- `GET /api/v1/subscriptions/user/:id` - Get user subscriptions

### Workflows
- `POST /api/v1/workflows/subscription/reminder` - Trigger reminder workflow

## 🔧 Setup

1. Clone the repository
2. Copy `.env.example` to `.env.development.local`
3. Fill in environment variables
4. Run `npm install`
5. Run `npm run dev`

## 📄 License

MIT
EOF

# Add and commit
git add README.md .env.example .gitignore
git commit -m "Add README, .env.example, and .gitignore"
git push origin main