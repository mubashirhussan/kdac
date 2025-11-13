# Request for Quote - Quick Start Guide

## ✅ What Was Implemented

Your Shopify Horizon theme now has a complete "Request for Quote" feature that:

- ✅ Hides the "Add to Cart" button on specified products
- ✅ **Hides the product price everywhere** for quote products (product page, search results, collections, product cards)
- ✅ Shows a professional quote request form instead
- ✅ Collects customer information (name, email, phone, company, quantity, message)
- ✅ Sends quote requests via Shopify's contact form system
- ✅ Fully customizable through Theme Settings
- ✅ Mobile responsive and matches your theme styling
- ✅ No third-party apps required

## 🚀 How to Use (2 Simple Steps)

### Step 1: Tag a Product
1. Go to **Shopify Admin** → **Products**
2. Open any product you want to require quotes for
3. Add the tag: `request-quote`
4. Save the product

**That's it!** The product will now hide the price and show a quote form instead of Add to Cart.

### Step 2: Test It! (Optional - Customize Messages Later)

Quote requests automatically go to your **store's default email** (the one in Settings → General).

**Want to customize the form text?**
1. Go to **Shopify Admin** → **Online Store** → **Themes**
2. Click **Customize** → **Theme Settings** (bottom left)
3. Scroll to **Request for Quote** section
4. Customize messages, button text, etc.

## 📧 Where Do Quote Requests Go?

**Default Setup (Ready Now):**
- All quote requests automatically go to your **store's email address**
- This is the email in **Shopify Admin** → **Settings** → **General** → **Store contact email**
- No setup required! ✅

**Need quotes sent to multiple people?**
See `REQUEST_QUOTE_SETUP.md` for advanced email configuration options including:
- Email forwarding (easiest)
- Shopify notification customization
- Third-party integrations

## 📝 Files Added to Your Theme

```
snippets/request-quote-form.liquid    - The quote form and styling
assets/request-quote.js                - Form submission handler
blocks/buy-buttons.liquid              - Modified to show quote form
blocks/price.liquid                    - Modified to hide price on product pages
snippets/price.liquid                  - Modified to hide price everywhere else
config/settings_schema.json            - Modified to add settings
locales/en.default.json                - Modified to add translations
REQUEST_QUOTE_SETUP.md                 - Detailed documentation
QUICK_START_GUIDE.md                   - This file
```

## 🧪 Test It Now

1. Add tag `request-quote` to a test product
2. **Search for the product** - price should be hidden in search results ✅
3. **View in collections** - price should be hidden in product cards ✅
4. **Open product page** - price hidden, quote form shows instead of Add to Cart ✅
5. Fill out and submit the quote form
6. Check your email for the quote request

## 📋 What the Email Contains

When a customer requests a quote, you'll receive an email with:

- Product name and direct URL
- Selected variant (if applicable)
- Requested quantity
- Customer name
- Customer email
- Customer phone (if provided)
- Company name (if provided)
- Additional message (if provided)
- Product and variant IDs
- Submission timestamp

## 🎨 Customization Tips

### Change Form Colors
The form automatically inherits your theme colors. If you want custom colors:
1. Edit `snippets/request-quote-form.liquid`
2. Find the `{% stylesheet %}` section at the bottom
3. Modify the color values in the CSS

### Add/Remove Form Fields
1. Edit `snippets/request-quote-form.liquid`
2. Find the `<div class="request-quote-form__fields">` section
3. Add or remove field blocks following the existing pattern

### Change Which Tags Trigger the Form
1. Edit `blocks/buy-buttons.liquid`
2. Find line 11 with the tag check
3. Add or remove tags: `or product.tags contains 'your-custom-tag'`

## ⚠️ Important Notes

### Product Tags
The form will appear when a product has ANY of these tags:
- `request-quote`
- `quote-required`
- `request_quote`

Tag names are case-sensitive!

### Email Delivery
- Emails may take 1-5 minutes to arrive
- Check spam/junk folders
- Verify your store's email in **Settings** → **General**
- Test with a personal email first

### Browser Compatibility
- Works in all modern browsers
- Requires JavaScript enabled
- Mobile responsive

## 🐛 Troubleshooting

**Problem**: Add to Cart still showing
- **Solution**: Verify exact tag spelling: `request-quote` (with hyphen)
- Clear browser cache or try incognito mode

**Problem**: Form doesn't submit
- **Solution**: Check browser console (F12) for errors
- Verify `request-quote.js` is loading

**Problem**: Email not received
- **Solution**: Check spam folder
- Verify store email in Settings → General
- Allow 5 minutes for delivery

**Problem**: Need quotes for many products
- **Solution**: Use Shopify's bulk editor:
  1. Products → Select multiple → Bulk edit
  2. Add `request-quote` tag to all at once

## 📖 Need More Help?

See the detailed `REQUEST_QUOTE_SETUP.md` file for:
- Advanced customization options
- Email setup methods
- Zapier integration
- Shopify Flow setup (Plus only)
- Troubleshooting guide
- Technical details

## 🎯 Next Steps

1. ✅ Tag your first product with `request-quote`
2. ✅ Test the form submission (quotes go to your store email automatically)
3. ✅ Verify your store email in **Settings** → **General**
4. ✅ Customize the form messages to match your brand (optional)
5. ✅ Tag all products that need quotes
6. ✅ Set up email forwarding if needed (see advanced docs)

## 💡 Pro Tips

- Use the bulk editor to tag multiple products at once
- Customize the success message to set expectations (e.g., "We'll respond within 24 hours")
- Add your phone number to the success message for urgent requests
- Consider adding product-specific instructions in the info message
- Test with different devices (mobile, tablet, desktop)

---

**Ready to go!** Your Request for Quote feature is fully functional. Just tag your first product to see it in action.

For detailed documentation, see `REQUEST_QUOTE_SETUP.md`

