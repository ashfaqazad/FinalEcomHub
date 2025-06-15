// app/cancel/page.jsx (or pages/cancel.js)
export default function CancelPage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>❌ Payment Cancelled</h2>
      <p>Your payment was not completed. You can try again.</p>
      <a href="/">Back to Home</a>
    </div>
  );
}
