import type { Product } from '../types';

export function createEmailTemplate(product: Product, subscriberId: string) {
  const trackingPixel = `https://lastingbuys.com/api/track/open?sid=${subscriberId}&pid=${product.id}`;
  const trackingUrl = `https://lastingbuys.com/api/track/click?sid=${subscriberId}&pid=${product.id}&url=${encodeURIComponent(product.purchaseUrl)}`;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9fafb;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px;">
          <h1 style="color: #111827; font-size: 24px; margin-bottom: 16px;">
            ${product.name} - $${product.price}
          </h1>
          
          <img src="${product.imageUrl}" 
               alt="${product.name}" 
               style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 16px;">
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
            ${product.description}
          </p>
          
          <ul style="color: #4b5563; font-size: 16px; line-height: 1.5;">
            ${product.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
          
          <a href="${trackingUrl}" 
             style="display: inline-block; background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 16px;">
            Check it out
          </a>
          
          <p style="color: #6b7280; font-size: 12px; margin-top: 32px;">
            <a href="https://lastingbuys.com/unsubscribe?id=${subscriberId}" style="color: #6b7280;">
              Unsubscribe
            </a> from daily product picks.
          </p>
        </div>
        <img src="${trackingPixel}" width="1" height="1" />
      </body>
    </html>
  `;
}