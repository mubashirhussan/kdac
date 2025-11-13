# Request for Quote Feature - Setup Guide

This guide explains how to use the Request for Quote feature in your Shopify Horizon theme.

## Overview

The Request for Quote feature allows you to hide the "Add to Cart" button and price on specific products and show a quote request form instead. This is useful for:
- Custom or made-to-order products
- Bulk order inquiries
- Products requiring price negotiation
- B2B products
- Products with variable pricing

## Quick Start

### 1. Tag Products That Need Quotes

To enable the quote form on a product:

1. Go to **Shopify Admin** → **Products**
2. Select the product you want to require quotes for
3. Add one of these tags to the product:
   - `request-quote`
   - `quote-required`
   - `request_quote`

**That's it!** The product will now show a quote request form instead of the Add to Cart button.

### 2. Verify Your Store Email (That's It!)

Quote requests automatically go to your store's email:

1. Go to **Shopify Admin** → **Settings** → **General**
2. Check **Store contact email** - this is where quotes will be sent
3. Done! No additional configuration needed ✅

### 3. Optional: Customize Form Messages

1. Go to **Shopify Admin** → **Online Store** → **Themes**
2. Click **Customize** → **Theme Settings** (bottom left)
3. Scroll to **Request for Quote** section
4. Customize button text, messages, etc.

### 4. Advanced: Set Up Multiple Email Recipients (Optional)

**By default, quotes go to your store email - no setup needed!**

If you need quotes sent to multiple email addresses, you have several options:

##### Option 1: Using Email Forwarding (Simplest)
1. Set up email forwarding from your primary quote email to your secondary email
2. Configure this in your email provider's settings (Gmail, Outlook, etc.)

##### Option 2: Using Shopify Email Notifications
1. Go to **Shopify Admin** → **Settings** → **Notifications**
2. Find **Customer notifications** → **Contact form**
3. Click **Edit code**
4. Modify the notification to include multiple recipients (requires HTML/email template knowledge)

##### Option 3: Using Shopify Flow (Shopify Plus Only)
1. Create a Flow that triggers on contact form submissions
2. Add conditions to detect quote requests
3. Add email actions to send to multiple addresses

##### Option 4: Using Third-Party Apps
Consider these Shopify apps:
- **Email Notifications** by Apps on Demand
- **Advanced Form Builder** by Hulkapps
- **Zapier** - Connect to any email service or CRM

## How It Works

### For Customers

1. Customer searches or browses products
2. **Prices are hidden everywhere** - no pricing shown in search results, collections, or product cards
3. Customer clicks on quote product to view details
4. On product page: **Price is hidden** and instead of "Add to Cart," they see a quote request form
5. Customer fills out:
   - Name (required)
   - Email (required)
   - Phone
   - Company
   - Quantity (required)
   - Selected variant (if applicable)
   - Additional message
4. Customer clicks "Request Quote"
5. Customer receives a success message
6. Form is reset for new submissions

### For Store Owners

1. Quote requests arrive via Shopify contact form
2. Email contains all customer and product details
3. Email includes:
   - Product name and URL
   - Selected variant
   - Requested quantity
   - Customer contact information
   - Custom message
   - Product and variant IDs
   - Submission timestamp

## Customization

### Customize Form Messages

All form text can be customized in:
**Theme Settings** → **Request for Quote**

Available customizations:
- Information message (shown above the form)
- Submit button text
- Success message
- Error message

### Styling

The quote form inherits your theme's styling. To customize:

1. The form uses standard theme CSS variables
2. Look for styles in `snippets/request-quote-form.liquid` (CSS at bottom)
3. Colors, spacing, and fonts match your theme automatically

### Add/Remove Form Fields

To modify form fields:

1. Edit `snippets/request-quote-form.liquid`
2. Add or remove field blocks following the existing pattern
3. Update `assets/request-quote.js` if you need custom handling

## Testing

### Test the Quote Form

1. Add the `request-quote` tag to a test product
2. View the product on your storefront
3. Verify the Add to Cart button is hidden
4. Fill out and submit the quote form
5. Check your email for the quote request

### Test Email Delivery

1. Submit a test quote with your own email
2. Verify you receive the notification
3. Check that all product and customer details are included
4. If using multiple emails, verify both recipients receive it

## Troubleshooting

### Add to Cart Still Showing

**Problem**: The Add to Cart button still appears even after adding the tag.

**Solutions**:
1. Verify the product has one of these exact tags: `request-quote`, `quote-required`, or `request_quote`
2. Clear your browser cache
3. Try viewing in an incognito/private browser window
4. Check that the theme files were properly uploaded

### Form Doesn't Submit

**Problem**: Clicking "Request Quote" does nothing or shows an error.

**Solutions**:
1. Check browser console for JavaScript errors (F12 → Console)
2. Verify `assets/request-quote.js` was uploaded correctly
3. Ensure your theme's JavaScript is loading properly
4. Try disabling browser extensions that might block forms

### Email Not Received

**Problem**: Quote submissions succeed but no email arrives.

**Solutions**:
1. Check your spam/junk folder
2. Verify your store's email address in **Settings** → **General** → **Store contact email**
3. Test Shopify's contact form separately to verify email delivery
4. Allow up to 5 minutes for email delivery
5. Check Shopify's notification settings are enabled

### Multiple Products Need Quotes

**Problem**: You have many products that need quotes.

**Solution**:
1. Use Shopify's bulk editor:
   - Go to **Products** → Select multiple products
   - Click **Bulk edit** → **Add tags**
   - Add `request-quote` to all selected products

## Files Added/Modified

This feature adds and modifies the following files:

**New Files:**
1. `snippets/request-quote-form.liquid` - The quote form HTML and styles
2. `assets/request-quote.js` - Form submission handler

**Modified Files:**
3. `blocks/buy-buttons.liquid` - Shows form when product has quote tag
4. `blocks/price.liquid` - Hides price on product detail pages
5. `snippets/price.liquid` - Hides price in product cards, search, collections
6. `config/settings_schema.json` - Adds theme settings
7. `locales/en.default.json` - Adds translation keys

## Removing the Feature

To remove this feature:

1. Remove or replace the modified `blocks/buy-buttons.liquid` with your original
2. Delete `snippets/request-quote-form.liquid`
3. Delete `assets/request-quote.js`
4. Remove the "Request for Quote" section from `config/settings_schema.json`

## Support

For questions or issues:

1. Check this documentation
2. Review Shopify's theme documentation
3. Contact your theme developer
4. Check browser console for errors

## Advanced: Email Template Customization

To customize the email format:

1. Edit `assets/request-quote.js`
2. Find the `buildEmailBody` function
3. Modify the email text format as needed
4. Test thoroughly after changes

Example customization:
```javascript
buildEmailBody(data) {
  let body = `NEW QUOTE REQUEST\n\n`;
  body += `Product: ${data.product_title}\n`;
  // Add your custom fields here
  return body;
}
```

## Future Enhancements

Possible improvements you might consider:

1. Integration with CRM systems (Salesforce, HubSpot)
2. Automatic quote generation with pricing
3. Customer quote history tracking
4. Admin notification dashboard
5. Quote expiration dates
6. PDF quote generation
7. Quote acceptance workflow

---

**Last Updated**: {{ "now" | date: "%B %d, %Y" }}
**Version**: 1.0
**Compatible With**: Shopify Horizon Theme 2.x

