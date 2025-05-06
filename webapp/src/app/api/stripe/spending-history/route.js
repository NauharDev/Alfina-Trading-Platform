import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('session_id');
    
    if (!sessionId) {
      return new Response('Session ID is required', { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || !session.customer) {
      return new Response('Customer not found for this session', { status: 404 });
    }

    const customerId = session.customer;

    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit: 100,
      expand: ['data.lines'],
    });

    // Create spending history in the format your frontend expects
    const spendingHistory = invoices.data.map((invoice) => ({
      amount: invoice.amount_paid / 100, // Convert cents to dollars
      date: new Date(invoice.created * 1000), // Convert Unix timestamp to JavaScript date
      description: invoice.lines?.data[0]?.description || 'Subscription Payment',
    }));

    console.log('Spending History:', spendingHistory);

    return new Response(JSON.stringify({ 
      spendingHistory,
      dates: spendingHistory.map(item => item.date),
      amounts: spendingHistory.map(item => item.amount)
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching Stripe spending history:', error);
    return new Response(JSON.stringify({
      spendingHistory: [],
      dates: [],
      amounts: []
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}