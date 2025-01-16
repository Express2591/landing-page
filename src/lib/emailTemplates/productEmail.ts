import { Product } from "../products";

interface EmailSection {
    title?: string;
    content: string;
    type?: 'text' | 'features' | 'cta' | 'quote';
    style?: 'default' | 'highlight' | 'subtle';
  }
  
  export const createProductEmail = (
    product: Product, 
    subscriberEmail: string,
    additionalSections?: EmailSection[]
  ) => {
    const defaultSections: EmailSection[] = [
      {
        content: `Today we're featuring a true "buy it for life" product:`,
        type: 'text',
        style: 'subtle'
      },
      {
        title: product.name,
        content: product.description,
        type: 'text',
        style: 'highlight'
      },
      {
        content: `Why it's great:`,
        type: 'text'
      },
      {
        content: product.features.join('\n'),
        type: 'features'
      },
      {
        content: `See it on Amazon →`,
        type: 'cta'
      }
    ];
  
    const sections = additionalSections 
      ? [...defaultSections, ...additionalSections]
      : defaultSections;
  
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            .container {
              max-width: 600px;
              margin: 0 auto;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              padding: 20px;
              background: white;
            }
            .product-image {
              width: 100%;
              height: auto;
              border-radius: 8px;
              margin: 20px 0;
            }
            .section {
              margin: 20px 0;
            }
            .section-title {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .feature-list {
              padding-left: 20px;
            }
            .highlight {
              background: #f7f7f7;
              padding: 15px;
              border-radius: 8px;
            }
            .subtle {
              color: #666;
              font-size: 0.9em;
            }
            .cta-button {
              display: inline-block;
              background: #22c55e;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              margin: 10px 0;
            }
            .quote {
              font-style: italic;
              border-left: 3px solid #22c55e;
              padding-left: 15px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 0.8em;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img 
              src="${product.imageUrl}" 
              alt="${product.name}" 
              class="product-image"
            />
            
            ${sections.map(section => {
              switch(section.type) {
                case 'features':
                  return `
                    <div class="section">
                      ${section.title ? `<div class="section-title">${section.title}</div>` : ''}
                      <ul class="feature-list">
                        ${section.content.split('\n').map(feature => 
                          `<li>${feature}</li>`
                        ).join('')}
                      </ul>
                    </div>
                  `;
                case 'cta':
                  return `
                    <div class="section">
                      <a href="${product.purchaseUrl}" class="cta-button">
                        ${section.content}
                      </a>
                    </div>
                  `;
                case 'quote':
                  return `
                    <div class="quote">
                      ${section.content}
                    </div>
                  `;
                default:
                  return `
                    <div class="section ${section.style || ''}">
                      ${section.title ? `<div class="section-title">${section.title}</div>` : ''}
                      <p>${section.content}</p>
                    </div>
                  `;
              }
            }).join('')}
            
            <div class="footer">
              <p>You're receiving this because you subscribed to Daily Product Picks.</p>
              <p><a href="https://lastingbuys.com/unsubscribe?email=${subscriberEmail}">Unsubscribe</a></p>
            </div>
          </div>
        </body>
      </html>
    `;
  };