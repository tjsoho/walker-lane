# EmailJS Setup Guide

This guide will help you set up EmailJS to send form submissions to your email address.

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. **Save your Service ID** - you'll need this later

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Choose a template or start from scratch
4. In the template editor, use these variables:

   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{phone}}` - Sender's phone number
   - `{{message}}` - Message content
   - `{{to_email}}` - Recipient email (optional)

5. Example template:

   ```
   Subject: New Contact Form Submission from {{from_name}}

   You have received a new message from your website contact form.

   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{phone}}

   Message:
   {{message}}
   ```

6. **Save your Template ID** - you'll need this later

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (also called API Key)
3. **Copy this key** - you'll need this later

## Step 5: Configure Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Copy the contents from `.env.example`
3. Fill in your values:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RECIPIENT_EMAIL=your-email@example.com
```

4. Replace the placeholder values with your actual IDs and keys from EmailJS

## Step 6: Restart Your Development Server

After adding the environment variables, restart your Next.js dev server:

```bash
npm run dev
```

## Testing

1. Fill out the contact form on your website
2. Submit the form
3. Check your email inbox for the form submission
4. You should see a success toast notification on the website

## Troubleshooting

- **"EmailJS configuration is missing"**: Make sure all environment variables are set in `.env.local`
- **Emails not sending**: Check that your email service is properly connected in EmailJS dashboard
- **Template variables not working**: Make sure variable names in your template match exactly: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{message}}`

## Free Tier Limits

- 200 emails per month
- Perfect for small to medium websites
- Upgrade available if you need more

## Security Note

The `.env.local` file is already in `.gitignore` and won't be committed to your repository. Never commit your API keys or secrets to version control.
