import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url); // Get query parameters from the request URL
    const session_id = searchParams.get('session_id'); // Retrieve session_id from the query string

    if (!session_id) {
      return new Response(
        JSON.stringify({ error: 'No session ID provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session.subscription) {
      return new Response(
        JSON.stringify({ error: 'No subscription found for the session' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Cancel the subscription
    const subscription = await stripe.subscriptions.update(session.subscription, {
      cancel_at_period_end: true, // Cancel at the end of the current period
    });

    return new Response(
      JSON.stringify({ success: true, subscription }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error canceling subscription:', error);

    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
