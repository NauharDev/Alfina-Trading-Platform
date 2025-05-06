import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get('session_id');

    if (!session_id) {
      return new Response(JSON.stringify({ error: 'No session ID provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Retrieve the checkout session with expanded line items and price
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items.data.price', 'line_items.data.price.product']
    });

    // Retrieve the subscription with expanded items
    const subscription = await stripe.subscriptions.retrieve(session.subscription, {
      expand: ['items.data.price', 'items.data.price.product']
    });

    // Get product and price details
    const lineItem = subscription.items.data[0];
    const product = lineItem.price?.product;
    const price = lineItem.price;

    return new Response(
      JSON.stringify({
        plan_name: product.name || product.id || 'Unknown Plan',
        amount: price?.unit_amount ? price.unit_amount / 100 : 0,
        currency: price?.currency || 'usd'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Detailed Stripe session error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : null
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}