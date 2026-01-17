import Client from 'shopify-buy';

const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

let client = null;

if (domain && storefrontAccessToken && !domain.includes('your-store')) {
    client = Client.buildClient({
        domain,
        storefrontAccessToken
    });
}

export const shopifyClient = client;

// Helper to check if Shopify is configured
export const isShopifyConfigured = () => {
    return client !== null;
};

// Fetch all products
export const fetchAllProducts = async () => {
    if (!client) return [];
    return await client.product.fetchAll();
};

// Fetch single product
export const fetchProduct = async (id) => {
    if (!client) return null;
    return await client.product.fetch(id);
};
