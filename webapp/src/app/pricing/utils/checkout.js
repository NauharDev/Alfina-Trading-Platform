export const createCheckoutSession = async (priceId) => {
    const response = await fetch('/api/stripe/create-subscription', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
    });

    const session = await response.json();
    if (session.url) {
        window.location.href = session.url; // Redirect to Stripe Checkout session
    } else {
        alert('Failed to create checkout session');
    }
};