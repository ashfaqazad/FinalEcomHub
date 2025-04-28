"use client";

import { 
    List, ListItem, Typography, Button, Box, Avatar, IconButton 
} from "@mui/material";
import { useAppContext } from "@/context/AppContext"; // correct path
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useEffect, useState } from "react";

const CartPage = () => {
    const { state, dispatch } = useAppContext();
    const basket = state.basket;
    const [userEmail, setUserEmail] = useState(null);

    const total = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUserEmail(parsed.email);
        }
    }, []);

    const handleCheckout = async () => {
        if (!basket || basket.length === 0) {
            alert("Cart is empty, cannot place order!");
            return;
        }

        if (!userEmail) {
            alert("User email is missing. Please log in.");
            return;
        }

        try {
            const response = await axios.post("/api/orders", {
                email: userEmail,
                orders_data: basket.map(item => ({
                    id: item._id,
                    title: item.name,
                    price: item.price,
                    image: item.imageUrl,
                    quantity: item.quantity || 1,
                    total: item.price * (item.quantity || 1),
                })),
            });

            if (response.status === 200) {
                alert("Order placed successfully!");
                dispatch({ type: "CLEAR_BASKET" });
            } else {
                alert("Failed to place order. Please try again.");
            }
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("An error occurred while placing the order. Please try again.");
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight="bold" mb={3}>
                Your Cart
            </Typography>

            <Box sx={{ flexGrow: 1 }}>
                <List>
                    {basket.length > 0 ? (
                        basket.map((item) => (
                            <ListItem key={item._id} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Avatar src={item.imageUrl} alt={item.name} sx={{ width: 80, height: 80, borderRadius: 2 }} />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1" fontWeight="bold">{item.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ${item.price.toFixed(2)}
                                    </Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                                        <IconButton onClick={() => dispatch({ type: "DECREMENT_QUANTITY", payload: item._id })}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography variant="body1">{item.quantity}</Typography>
                                        <IconButton onClick={() => dispatch({ type: "INCREMENT_QUANTITY", payload: item._id })}>
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton onClick={() => dispatch({ type: "REMOVE_FROM_BASKET", payload: item._id })}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </ListItem>
                        ))
                    ) : (
                        <Typography sx={{ p: 2, textAlign: "center" }}>Cart is empty</Typography>
                    )}
                </List>
            </Box>

            {basket.length > 0 && (
                <Box
                    sx={{
                        mt: 4,
                        borderTop: 1,
                        borderColor: "divider",
                        pt: 2,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography variant="h6" fontWeight="medium">Total</Typography>
                        <Typography variant="h5" fontWeight="bold">${total.toFixed(2)}</Typography>
                    </Box>

                    <Button variant="contained" color="error" fullWidth onClick={handleCheckout}>
                        Checkout
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default CartPage;






















// "use client";

// import { 
//     Drawer, List, ListItem, ListItemText, IconButton, 
//     Typography, Button, Box, Avatar, Paper
//   } from "@mui/material";
//   import { useAppContext } from "../context/AppContext";
//   import AddIcon from "@mui/icons-material/Add";
//   import RemoveIcon from "@mui/icons-material/Remove";
//   import DeleteIcon from "@mui/icons-material/Delete";
//   import axios from "axios";
//   import { useEffect, useState } from "react";
  
//   const CartDrawer = ({ open, onClose }) => {
//     const { state, dispatch } = useAppContext();
//     const basket = state.basket; // Ensuring consistent reference
//     const [userEmail, setUserEmail] = useState(null);
  
//     const total = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
//     console.log("Basket Items in CartDrawer: ", basket);
  
  
  
//     // useEffect(() => {
//     //   const storedUser = localStorage.getItem("userEmail");
    
//     //   if (storedUser) {
//     //     const parsedUser = JSON.parse(storedUser); // ✅ String ko object me convert karo
//     //     console.log("📩 Parsed User Email:", parsedUser.email);
//     //     setUserEmail(parsedUser.email); // ✅ Sirf email ko store karo state me
//     //   }
//     // }, [open]);
  
    
//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
        
//         if (storedUser) {
//           const parsed = JSON.parse(storedUser);
//           setUserEmail(parsed.email);
//         }
//       }, [open]);
      
  
  
//     const handleCheckout = async () => {
//       console.log("Checkout button clicked!");
//       console.log("📦 Basket at checkout:", basket); // ye dekhna zaroori hai

//       if (!basket || basket.length === 0) {
//         alert("Cart is empty, cannot place order!");
//         return;
//       }
    
//       // Fetch user email from localStorage
//       const storedUser = localStorage.getItem("user");  // ✅ Fix: Correct key
//       console.log("📩 LocalStorage Fetched:", storedUser);
  
//       const userEmail = storedUser ? JSON.parse(storedUser).email : null;
//       console.log("📧 Extracted Email:", userEmail);
  
//       if (!userEmail) {
//           alert("User email is missing. Please log in.");
//           return;
//       }
  
  
  
  
//       try {
        

  
//         const response = await axios.post("/api/orders", {
//               email: userEmail,
//               orders_data: basket.map(item => ({
//                   id: item._id,  // `_id` ko `id` mein convert kar diya
//                   title: item.name, // `name` ko `title` mein convert kar diya
//                   price: item.price,
//                   image: item.imageUrl,  // Ensure `image` matches schema
//                   quantity: item.quantity || 1,  // Ensure quantity is set
//                   total: item.price * (item.quantity || 1),
//               })),
//           });
          
  
  
//           if (response.status === 200) {
//               alert("Order placed successfully!");
//               dispatch({ type: "CLEAR_BASKET" });
//               onClose();
//           } else {
//               alert("Failed to place order. Please try again.");
//           }
//       } catch (error) {
//           console.error("Error during checkout:", error);
//           alert("An error occurred while placing the order. Please try again.");
//       }
//   };
  
  
  
//     return (
//         <Drawer anchor="right" open={open} onClose={onClose}>
//             <Box sx={{ width: 300, height: "100%", display: "flex", flexDirection: "column" }}>
                
//                 {/* Cart Heading */}
//                 <Typography variant="h6" sx={{ p: 2 }}>Your Cart</Typography>
  
//                 {/* Cart Items - Scrollable */}
//                 <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
//                     <List>
//                         {basket.length > 0 ? (
//                             basket.map((item) => (
//                                 <ListItem key={item._id} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                                     <Avatar src={item.imageUrl} alt={item.name} sx={{ width: 80, height: 80, borderRadius: 2 }} />
//                                     <Box sx={{ flexGrow: 1 }}>
//                                         <Typography variant="body1" fontWeight="bold">{item.name}</Typography>
//                                         <Typography variant="body2" color="text.secondary">
//                                             ${item.price.toFixed(2)}
//                                         </Typography>
//                                         <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
//                                             <IconButton onClick={() => dispatch({ type: "DECREMENT_QUANTITY", payload: item._id })}>
//                                                 <RemoveIcon />
//                                             </IconButton>
//                                             <Typography variant="body1">{item.quantity}</Typography>
//                                             <IconButton onClick={() => dispatch({ type: "INCREMENT_QUANTITY", payload: item._id })}>
//                                                 <AddIcon />
//                                             </IconButton>
//                                             <IconButton onClick={() => dispatch({ type: "REMOVE_FROM_BASKET", payload: item._id })}>
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </Box>
//                                     </Box>
//                                 </ListItem>
//                             ))
//                         ) : (
//                             <Typography sx={{ p: 2, textAlign: "center" }}>Cart is empty</Typography>
//                         )}
//                     </List>
//                 </Box>
  
//                 {/* Fixed Bottom Section */}
//                 {basket.length > 0 && (
//                     <Box
//                         sx={{
//                             position: "sticky",
//                             bottom: 0,
//                             left: 0,
//                             width: "100%",
//                             p: 2,
//                             borderTop: 1,
//                             borderColor: "divider",
//                             backgroundColor: "white",
//                             zIndex: 10,
//                             boxSizing: "border-box",
//                         }}
//                     >
//                         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//                             <Typography variant="body1" fontWeight="medium">Total</Typography>
//                             <Typography variant="h6" fontWeight="bold">${total.toFixed(2)}</Typography>
//                         </Box>
  
//                         <Button variant="contained" color="error" fullWidth onClick={handleCheckout}>
//                             Checkout
//                         </Button> 
  
  
//                     </Box>
//                 )}
//             </Box>
//         </Drawer>
//     );
//   };
  
//   export default CartDrawer;
  