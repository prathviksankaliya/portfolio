# EmailJS Setup Guide

## Current Configuration
The contact form is configured to send emails to: **prathviksankaliya@gmail.com**

## How It Works
Currently, the form uses a **mailto** fallback that opens the user's default email client. To enable direct email sending without opening an email client, follow these steps:

## Setup EmailJS (Free Service)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month free)

### Step 2: Create Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred service)
4. Click **Connect Account** and authorize with your Gmail
5. Note down your **Service ID** (e.g., "service_abc123")

### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Set up the template:

**Subject:**
```
{{subject}} - Portfolio Contact Form
```

**Content:**
```
You have received a new message from your portfolio contact form:

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. In the **To Email** field, set: `{{to_email}}`
5. Save the template and note down your **Template ID** (e.g., "template_xyz789")

### Step 4: Get Your Public Key
1. Go to **Account** → **API Keys**
2. Copy your **Public Key**

### Step 5: Update Your Code
In `src/components/Contact.jsx`, replace these lines (around line 36-38):

```javascript
const SERVICE_ID = 'service_portfolio'; // Replace with your EmailJS service ID
const TEMPLATE_ID = 'template_portfolio'; // Replace with your EmailJS template ID
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key
```

With your actual values:
```javascript
const SERVICE_ID = 'service_abc123'; // Your actual service ID
const TEMPLATE_ID = 'template_xyz789'; // Your actual template ID
const PUBLIC_KEY = 'your_actual_public_key_here'; // Your actual public key
```

## Testing
1. Fill out the contact form on your portfolio
2. Submit the form
3. Check your email (prathviksankaliya@gmail.com) for the message
4. The sender will see a success message

## Features
- ✅ Form validation (all fields required)
- ✅ Success/Error messages with animations
- ✅ Loading state while sending
- ✅ Auto-clears form after successful submission
- ✅ Falls back to mailto if EmailJS not configured
- ✅ Sends directly to prathviksankaliya@gmail.com

## Troubleshooting
- **Emails not sending?** Check EmailJS dashboard for logs
- **Getting errors?** Verify your Service ID, Template ID, and Public Key
- **Gmail blocking?** Make sure to authorize EmailJS in Gmail settings

## Alternative: Using Your Own Backend
If you prefer not to use EmailJS, you can:
1. Create a backend API endpoint (Node.js, Python, etc.)
2. Use Nodemailer (Node.js) or similar to send emails
3. Update the `handleSubmit` function to call your API

## Current Fallback
Without EmailJS configuration, the form will:
1. Open the user's default email client
2. Pre-fill the email with the form data
3. User needs to click "Send" in their email client