"use client";

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
// import { Context } from "@/context/MyContext"; // ✅ Your custom context
import { useAppContext } from "@/context/AppContext";


const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  //   const { user, mode } = useContext(Context); // ✅ Authenticated user and dark/light mode
  const { user, mode } = useAppContext(); // ✅ Authenticated user and dark/light mode



  useEffect(() => {
    const fetchOrders = async () => {
      const storedUser = localStorage.getItem("user");
      const userEmail = storedUser ? JSON.parse(storedUser).email : null;
  
      if (!userEmail) {
        console.error("User email missing");
        return;
      }
  
      try {
        const response = await axios.post("/api/myorders", { email: userEmail });
        setOrders(response.data.orderdata);  // ✅ Now matches MERN response structure
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  }, []);
  

  return (
    <Container sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>




{orders.length > 0 ? (
  orders.map((order, index) => (
    order?.orders_data?.length > 0 && (
      <Card key={order._id || index} sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6">Order #{index + 1}</Typography>
          <Typography variant="subtitle2">Email: {order.email}</Typography>
          <Typography variant="subtitle2">
            Date: {new Date(order.order_date).toLocaleDateString()}
          </Typography>

          <Typography variant="h6" mt={2}>Items:</Typography>
          <Grid container spacing={2}>
            {order.orders_data.map((item, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <CardMedia
                  component="img"
                  width="200"
                  height="120"
                  image={item.image}
                  alt={item.title}
                />
                <Typography><strong>{item.title}</strong></Typography>
                <Typography>Rs. {item.price}</Typography>
                <Typography>Qty: {item.quantity}</Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    )
  ))
) : (
  <Typography>No orders found.</Typography>
)}



    </Container>
  );
};

export default MyOrders;
