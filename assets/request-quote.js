/**
 * Request Quote Component
 * Handles the submission of quote request forms and sends data to Shopify contact form
 */

import { Component } from './component.js';

export class RequestQuoteComponent extends Component {
  static get observedAttributes() {
    return ['data-product-id', 'data-product-title', 'data-product-url', 'data-variant-id'];
  }

  constructor() {
    super();
    this.form = this.querySelector('[data-quote-form]');
    this.submitButton = this.querySelector('[data-submit-button]');
    this.buttonText = this.querySelector('[data-button-text]');
    this.buttonLoading = this.querySelector('[data-button-loading]');
    this.successMessage = this.querySelector('[data-success-message]');
    this.errorMessage = this.querySelector('[data-error-message]');
    this.errorText = this.querySelector('[data-error-text]');
  }

  connectedCallback() {
    super.connectedCallback();
    
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    // Hide any previous messages
    this.hideMessages();

    // Disable submit button and show loading state
    this.setLoadingState(true);

    try {
      // Build the formatted email body and add it to the form
      const formData = new FormData(this.form);
      const data = {};
      
      for (const [key, value] of formData.entries()) {
        const cleanKey = key.replace('contact[', '').replace(']', '');
        data[cleanKey] = value;
      }

      // Build email body
      const emailBody = this.buildEmailBody(data);
      
      // Add the body to the form - Shopify will handle everything else
      let bodyField = this.form.querySelector('[name="contact[body]"]');
      if (!bodyField) {
        bodyField = document.createElement('textarea');
        bodyField.name = 'contact[body]';
        bodyField.style.display = 'none';
        this.form.appendChild(bodyField);
      }
      bodyField.value = emailBody;

      // Submit the form normally - Shopify handles CAPTCHA, tokens, etc.
      this.form.submit();
      
      // Show success message (form will redirect, but show it briefly first)
      this.showSuccess();
    } catch (error) {
      console.error('Quote request error:', error);
      this.showError(error.message);
      this.setLoadingState(false);
    }
  }

  prepareFormData(formData) {
    const data = {};
    
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    // Build the email body
    const emailBody = this.buildEmailBody(data);
    
    // Create new FormData with Shopify's expected format
    const shopifyFormData = new FormData();
    shopifyFormData.append('contact[name]', data.name);
    shopifyFormData.append('contact[email]', data.email);
    if (data.phone) {
      shopifyFormData.append('contact[phone]', data.phone);
    }
    shopifyFormData.append('contact[body]', emailBody);
    shopifyFormData.append('form_type', 'contact');
    
    return shopifyFormData;
  }

  buildEmailBody(data) {
    let body = `QUOTE REQUEST\n\n`;
    body += `Product: ${data.product_title}\n`;
    body += `Product URL: ${data.product_url}\n`;
    body += `Quantity: ${data.quantity}\n`;
    
    if (data.variant && data.variant !== 'Default Title') {
      body += `Variant: ${data.variant}\n`;
    }
    
    body += `\nCUSTOMER INFORMATION\n`;
    body += `Name: ${data.name}\n`;
    body += `Email: ${data.email}\n`;
    
    if (data.phone) {
      body += `Phone: ${data.phone}\n`;
    }
    
    if (data.company) {
      body += `Company: ${data.company}\n`;
    }
    
    if (data.message) {
      body += `\nMESSAGE\n${data.message}\n`;
    }
    
    body += `\n---\n`;
    body += `Product ID: ${data.product_id}\n`;
    body += `Variant ID: ${data.variant_id}\n`;
    body += `Submitted: ${new Date().toLocaleString()}\n`;
    
    return body;
  }

  async sendQuoteRequest(formData) {
    // Submit the actual Shopify form instead of using fetch
    // This allows Shopify to handle CAPTCHA and other security features
    const form = this.form;
    
    // Instead of fetch, we'll submit the form directly
    // But first, let's update the contact[body] field with our formatted email
    const bodyField = form.querySelector('textarea[name="contact[body]"]');
    if (!bodyField) {
      // Create the body field if it doesn't exist
      const hiddenBody = document.createElement('textarea');
      hiddenBody.name = 'contact[body]';
      hiddenBody.style.display = 'none';
      form.appendChild(hiddenBody);
    }
    
    // The form will submit normally and Shopify will handle it
    // We'll just return a success response since the form submission will redirect
    return { ok: true, redirected: true };
  }

  setLoadingState(isLoading) {
    if (this.submitButton) {
      this.submitButton.disabled = isLoading;
    }

    if (this.buttonText) {
      this.buttonText.classList.toggle('hidden', isLoading);
    }

    if (this.buttonLoading) {
      this.buttonLoading.classList.toggle('hidden', !isLoading);
    }
  }

  showSuccess() {
    if (this.successMessage) {
      this.successMessage.classList.remove('hidden');
      
      // Scroll to success message
      this.successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Auto-hide after 10 seconds
      setTimeout(() => {
        this.successMessage.classList.add('hidden');
      }, 10000);
    }
  }

  showError(message = null) {
    if (this.errorMessage) {
      this.errorMessage.classList.remove('hidden');
      
      if (message && this.errorText) {
        this.errorText.textContent = message;
      }

      // Scroll to error message
      this.errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  hideMessages() {
    if (this.successMessage) {
      this.successMessage.classList.add('hidden');
    }
    
    if (this.errorMessage) {
      this.errorMessage.classList.add('hidden');
    }
  }
}

// Register the custom element
if (!customElements.get('request-quote-component')) {
  customElements.define('request-quote-component', RequestQuoteComponent);
}

