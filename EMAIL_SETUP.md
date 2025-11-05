# Email Forwarding Setup for pvdbackgammon.club

## Option 1: Namecheap Email Forwarding (FREE & Easy)

Namecheap includes free email forwarding with your domain!

### Steps:

1. **Log in to Namecheap**
2. Go to **Domain List** → Click **Manage** next to `pvdbackgammon.club`
3. Go to the **Mail Settings** or **Redirect Email** tab
4. Click **Add Forwarder** or **Add Catch-All**

### Set Up Specific Forwarding:

**For info@pvdbackgammon.club:**
- Mailbox: `info`
- Forward To: `your-personal-email@gmail.com`
- Click **Add Forwarder**

You can add more:
- `contact@pvdbackgammon.club` → your email
- `events@pvdbackgammon.club` → your email
- `admin@pvdbackgammon.club` → your email

### Set Up Catch-All (Optional):

Forward ALL emails to any address @pvdbackgammon.club to your personal email:
- Enable **Catch-All**
- Forward to: `your-personal-email@gmail.com`

This means even if someone emails `random@pvdbackgammon.club`, you'll get it!

---

## Option 2: Gmail (Send AS - For Replies)

If you want to **reply** from info@pvdbackgammon.club (so it looks official):

1. Set up forwarding in Namecheap (above)
2. In **Gmail** → Settings → **Accounts and Import**
3. Under "Send mail as", click **Add another email address**
4. Enter:
   - Name: `Providence Backgammon Club`
   - Email: `info@pvdbackgammon.club`
5. Choose **"Send through Gmail"** (easier) or use SMTP if you have it
6. Verify the email (you'll get a code forwarded to you)

Now when you reply in Gmail, you can choose to send FROM info@pvdbackgammon.club!

---

## Option 3: Professional Email (Paid - Optional)

If you want actual mailboxes (not just forwarding):

### Google Workspace (~$6/month per user)
- Real Gmail inbox for info@pvdbackgammon.club
- 30GB storage
- Professional looking
- Setup: workspace.google.com

### Namecheap Private Email (~$1.88/month)
- Much cheaper
- 3 mailboxes included
- Basic but functional
- Setup through Namecheap dashboard

---

## Recommended Setup (FREE):

For a small club, I recommend:

1. **Namecheap Email Forwarding** (free)
   - Forward info@pvdbackgammon.club → your personal email
   - Set up catch-all so you never miss emails

2. **Gmail "Send As"** (free)
   - Reply from info@pvdbackgammon.club
   - Looks professional
   - All emails in one place (your Gmail)

**Total cost: $0/month** ✨

---

## DNS Records Needed

Namecheap usually sets these automatically when you enable email forwarding, but if needed:

```
Type: MX Record
Host: @
Value: mx1.privateemail.com (or Namecheap's MX servers)
Priority: 10
```

Namecheap will show you the exact MX records to use.

---

## Testing

After setup (can take 30 mins for DNS):

1. Send a test email TO info@pvdbackgammon.club from another account
2. Check if it arrives at your personal email
3. Reply to test "Send As" feature
4. Verify the recipient sees it came from info@pvdbackgammon.club

---

## Quick Start (Right Now):

1. Log into Namecheap
2. Domain → Manage → **Redirect Email** tab
3. Add forwarder: `info` → `your-email@gmail.com`
4. Save

Done! You'll receive emails at info@pvdbackgammon.club within 30 minutes!
