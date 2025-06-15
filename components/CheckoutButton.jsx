// components/CheckoutButton.jsx
'use client';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutButton = ({ cartItems }) => {

  const handleCheckout = async () => {
  console.log("🛒 Cart Items:", cartItems); // 👈 Check this

  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: cartItems }),
  });

  const data = await res.json();
  console.log("🔗 Stripe URL:", data.url); // 👈 Yeh zaroor aana chahiye

  if (data.url) {
    window.location.href = data.url;
  } else {
    alert("❌ Stripe session URL not received");
  }
};


  return <button onClick={handleCheckout}>Pay Now</button>;
};

export default CheckoutButton;
