/**
 * Utility functions for Stripe integration
 */

/**
 * Creates a Stripe checkout session and redirects to checkout
 * 
 * @param {Object} options - Checkout options
 * @param {number} options.amount - Amount in cents
 * @param {string} options.currency - Currency code (e.g., 'usd')
 * @param {string} options.productName - Name of the product being purchased
 * @param {string} options.productDescription - Description of the product
 * @param {string} options.userId - Optional user ID to associate with the session
 * @returns {Promise<void>} - Redirects to Stripe checkout
 */
export async function redirectToCheckout({
  amount, 
  currency = 'usd', 
  productName, 
  productDescription,
  userId = ''
}: {
  amount: number;
  currency?: string;
  productName: string;
  productDescription: string;
  userId?: string;
}): Promise<void> {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/create-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        productName,
        productDescription,
        successUrl: `${window.location.origin}/checkout-success`,
        cancelUrl: `${window.location.origin}`,
        clientReferenceId: userId,
      }),
    });

    const { url } = await response.json();
    
    if (url) {
      window.location.href = url;
    } else {
      throw new Error('Failed to create checkout session');
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
}