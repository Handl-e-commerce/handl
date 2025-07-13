import { fetchWrapper } from "../utils/fetch-wrapper";

export async function redirectToStripeCheckout(): Promise<void> {
    try {
        const response = await fetchWrapper('/billing/subscribe', 'POST', {
            hostname: window.location.origin,
        });
        const data = await response.json();
        window.location.href = data.url; // Redirect to the Stripe checkout URL
    } catch (error) {
        console.error("Error redirecting to Stripe checkout:", error);
    };
};