# Luma Integration Guide

This guide explains how to integrate Luma events into the Providence Backgammon Club website.

## Quick Start

1. Create your Luma calendar at [lu.ma](https://lu.ma)
2. Create your events
3. Get the embed code
4. Add it to `index.html`

---

## Integration Methods

### Method 1: Full Calendar Embed (Recommended)

This displays all your upcoming events in a calendar view.

**Steps:**
1. Go to your Luma calendar (e.g., `lu.ma/your-calendar-name`)
2. Click on the settings/manage icon
3. Find "Embed Calendar" option
4. Copy the provided iframe code
5. Replace the placeholder in `index.html` (line ~90) with your code

**Example embed code:**
```html
<iframe
  src="https://lu.ma/embed-calendar/cal-abc123/events"
  width="100%"
  height="450"
  frameborder="0"
  style="border: 1px solid #bfcbda88; border-radius: 8px;"
  allowfullscreen=""
  aria-hidden="false"
  tabindex="0">
</iframe>
```

---

### Method 2: Individual Event Buttons

Add specific event registration buttons anywhere on the page.

**Steps:**
1. Go to your event on Luma
2. Click "More" → "Embed Registration Button"
3. Copy the embed code
4. Paste it in your HTML where you want the button

**Example button code:**
```html
<div id="luma-event-button">
  <a href="https://lu.ma/your-event-id"
     class="luma-checkout"
     data-luma-action="checkout"
     data-luma-event-id="evt-abc123">
    Register for Event
  </a>
</div>

<script src="https://embed.lu.ma/checkout-button.js"></script>
```

---

### Method 3: Multiple Events Grid

Show multiple featured events with registration buttons.

**Example implementation:**
```html
<div class="events-grid">
  <div class="event-card">
    <h3>Weekly Backgammon Night</h3>
    <p>Every Thursday at 7 PM</p>
    <a href="https://lu.ma/weekly-night"
       class="luma-checkout btn btn-primary"
       data-luma-action="checkout"
       data-luma-event-id="evt-weekly123">
      Register
    </a>
  </div>

  <div class="event-card">
    <h3>Monthly Tournament</h3>
    <p>First Saturday of each month</p>
    <a href="https://lu.ma/monthly-tournament"
       class="luma-checkout btn btn-primary"
       data-luma-action="checkout"
       data-luma-event-id="evt-tournament456">
      Register
    </a>
  </div>
</div>

<script src="https://embed.lu.ma/checkout-button.js"></script>
```

---

## Styling Luma Embeds

### Calendar Embed Styling

The `.luma-embed-container` class already provides basic styling. You can customize further:

```css
/* In src/styles/main.css */
.luma-embed-container iframe {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
}
```

### Button Styling

Luma buttons inherit styles from `.btn` and `.btn-primary` classes. To customize:

```css
.luma-checkout {
  /* Your custom button styles */
  background-color: var(--color-secondary);
  color: var(--color-text-primary);
  /* ... */
}
```

---

## Advanced: Custom Event Display

If you want more control, you can use Luma's API to fetch events and display them with custom HTML.

**Note:** This requires more technical setup and possibly a backend to keep API keys secure.

**Basic approach:**
1. Get Luma API access
2. Fetch events data via API
3. Render custom HTML with the event data
4. Link to Luma for registration

---

## Testing Your Integration

1. Start the dev server: `npm run dev`
2. Open `http://localhost:5173` in your browser
3. Navigate to the Events section
4. Verify your Luma embed appears correctly
5. Test registration flow (clicks through to Luma)

---

## Common Issues

### Embed not showing
- Check that you copied the complete embed code
- Verify your Luma calendar/event is published
- Check browser console for errors

### Styling looks off
- Luma iframes may override some styles
- Use browser DevTools to inspect and adjust CSS
- Ensure iframe has `width="100%"` for responsive design

### Button not working
- Verify you included the Luma checkout script
- Check that `data-luma-event-id` matches your event
- Ensure the event is published and accepting registrations

---

## Resources

- [Luma Help Center](https://help.lu.ma)
- [Luma Embed Documentation](https://help.luma.com/p/embed-our-checkout-registration-button-on-your-website)
- [Luma Examples on GitHub](https://github.com/luma-team/examples)

---

## Support

For issues with:
- **Luma functionality**: Contact Luma support
- **Website integration**: Check README.md or contact club admins
- **Custom development**: Consider hiring a web developer familiar with Luma

---

**Last Updated:** January 2025
