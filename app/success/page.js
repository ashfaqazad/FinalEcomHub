"use client"; // ✅ Force it to run on client

import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const orderData = localStorage.getItem("cart");
    const user = localStorage.getItem("user");

    if (orderData && user) {
      const email = JSON.parse(user).email;

      axios
        .post("/api/placeOrder", {
          email,
          order_data: JSON.parse(orderData),
        })
        .then(() => {
          console.log("✅ Order saved after payment");
          localStorage.removeItem("cart"); // Clear cart after save
        })
        .catch((err) => {
          console.error("❌ Error saving order:", err);
        });
    }
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>🎉 Payment Successful!</h2>
      <p>Thank you for your order.</p>
      <button onClick={() => router.push("/")}>Go back to Home</button>
    </div>
  );
}





















// // app/success/page.jsx
// "use client";
// import { useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// const SuccessPage = () => {
//   const router = useRouter();

//   // useEffect(() => {
//   //   const orderData = localStorage.getItem("cart");
//   //   const email = localStorage.getItem("userEmail");

//   //   if (orderData && email) {
//   //     axios.post("/api/placeOrder", {
//   //       email,
//   //       order_data: JSON.parse(orderData),
//   //     }).then(() => {
//   //       localStorage.removeItem("cart"); // clear cart after placing order
//   //       router.push("/my-orders"); // redirect to order history
//   //     }).catch((err) => {
//   //       console.error("Order placement failed:", err);
//   //     });
//   //   }
//   // }, []);

//   useEffect(() => {
//   console.log("Success page loaded");

//   const orderData = localStorage.getItem("cart");
//   const email = localStorage.getItem("userEmail");

//   if (orderData && email) {
//     axios.post("/api/placeOrder", {
//       email,
//       order_data: JSON.parse(orderData),
//     }).then(() => {
//       localStorage.removeItem("cart");
//       router.push("/myorders");
//     });
//   }
// }, []);


//   return (
//     <div style={{ padding: "2rem", textAlign: "center" }}>
//       <h1>🎉 Payment Successful!</h1>
//       <p>Placing your order...</p>
//     </div>
//   );
// };

// export default SuccessPage;
