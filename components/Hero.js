"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext"; // ✅ Add this
import ProductItem from "@/components/ProductItem";
import { Grid, Box, Typography, Container, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";

const Home = () => {
  const { dispatch } = useAppContext(); // ✅ get dispatch
  const [eShop, setEshop] = useState([]);
  const [error, setError] = useState(null);
  // const [searchQuery, setSearchQuery] = useState("");
  const { state } = useAppContext();
  const { searchQuery } = state;


  const loadData = async () => {
    try {
      const response = await fetch("/api/eshop");
      const data = await response.json();

      console.log("API Response:", data);

      if (data && Array.isArray(data.eShop)) {
        setEshop(data.eShop);
      } else {
        throw new Error("Invalid data structure");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch products.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredProducts = eShop.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ handleAddToCart yahan banao
  const handleAddToCart = (product) => {
    dispatch({
      type: "ADD_TO_BASKET",
      payload: { ...product, quantity: 1 }, // ✅ quantity bhi set karenge
    });
  };

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <div>
      {/* Hero Image */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ backgroundColor: "#000" }}>
          {/* Navbar content */}
        </AppBar>
      </Box>


<Box
  sx={{
    position: "relative",
    width: "100%",
    height: {
      xs: 200,   // Mobile
      sm: 300,   // Tablets
      md: "100vh" // Desktop
    },
    overflow: "hidden",
  }}
>
  <Box
    component="img"
    src="/Images/Eimage.avif"
    alt="eCommerce"
    sx={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "top",
      display: "block",
    }}
  />
</Box>


      {/* Products Section */}
      <Container sx={{ my: 5 }}>
        <Grid container spacing={2} alignItems="stretch">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <ProductItem
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  description={item.description}
                  price={item.price}
                  actionType="add"
                  onAddToBasket={handleAddToCart} // ✅ pass function here
                />
              </Grid>
            ))
          ) : (
            <Typography variant="h6">No products found</Typography>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;

























// "use client";

// import React, { useEffect, useState } from "react";
// import ProductItem from "@/components/ProductItem";
// import { Grid, Box, Typography, Container,TextField } from "@mui/material";
// import AppBar from '@mui/material/AppBar';


// const Home = () => {
//   const [eShop, setEshop] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const loadData = async () => {
//     try {
//       const response = await fetch("/api/eshop");
//       const data = await response.json();

//       console.log("API Response:", data);

//       if (data && Array.isArray(data.eShop)) {
//         setEshop(data.eShop);
//       } else {
//         throw new Error("Invalid data structure");
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       setError("Failed to fetch products.");
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const filteredProducts = eShop.filter((item) =>
//     item.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (error) {
//     return <Typography variant="h6" color="error">{error}</Typography>;
//   }



//   return (
//     <div>


// {/* Hero image */}
// <Box sx={{ flexGrow: 1 }}>
//   <AppBar position="fixed" sx={{ backgroundColor: "#000" }}>
//     {/* Navbar content */}
//   </AppBar>
// </Box>

// <Box
//   sx={{
//     position: "relative",
//     width: "100%",
//     height: "90vh",
//     overflow: "hidden",
//   }}
// >
//   {/* Hero Image */}
//   <img 
//     src="/Images/Eimage.avif"
//     alt="eCommerce"
//     style={{
//       width: "100%",
//       height: "100%",
//       objectFit: "cover",
//       objectPosition: "top", // ensure "Welcome" is visible
//       display: "block",
//     }}
//   />

// </Box>

//       {/* Products Section */}
//       <Container sx={{ my: 5 }}>
//         <Grid container spacing={4} justifyContent="center">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((item) => (
//               <Grid item xs={12} sm={6} md={4} key={item._id}>

//                 <ProductItem
//                   id={item._id}
//                   title={item.title}
//                   image={item.image}
//                   description={item.description} // ✅ Yeh hona zaroori hai
//                   price={item.price}
//                   actionType="add"
//                   // onAddToBasket={handleAddToBasket}
//                 />

//               </Grid>
//             ))
//           ) : (
//             <Typography variant="h6">No products found</Typography>
//           )}
//         </Grid>
//       </Container>
//     </div>
//   );
// };

// export default Home;














// 'use client';

// import React, { useEffect, useState } from 'react';
// import ProductItem from '@/components/ProductItem';
// import axios from 'axios';
// import { Grid, Box, Typography } from '@mui/material';

// const Home = () => {
//     const [eShop, setEshop] = useState([]);
//     const [error, setError] = useState(null);
//     const [searchQuery, setSearchQuery] = useState(''); // Optional: set from context or props



//     const loadData = async () => {
//         try {
//           const response = await fetch("/api/eshop");
//           const data = await response.json();
      
//           console.log("API Response:", data); // Debug
      
//           if (data && Array.isArray(data.eShop)) {
//             setEshop(data.eShop);
//           } else {
//             throw new Error("Invalid data structure");
//           }
//         } catch (error) {
//           console.error("Fetch error:", error);
//           setError("Failed to fetch products.");
//         }
//       };
      
//     useEffect(() => {
//         loadData();
//     }, []);


//     const filteredProducts = eShop.filter((item) =>
//         item.title.toLowerCase().includes(searchQuery.toLowerCase())

//     );


//     if (error) {
//         return <Typography variant="h6" color="error">{error}</Typography>;
//     }

//     return (
//         <div>
//             {/* Hero Image */}
//             <Box sx={{ width: '100%' }}>
//                 <img
//                     src="/Images/E-image.webp"
//                     alt="eCommerce"
//                     style={{ width: "100%", height: "400px" }}
//                 />
//             </Box>

//             <Box sx={{ my: 5 }}>
//                 <Grid container spacing={4}>

//                     {filteredProducts.length > 0 ? (
//                         filteredProducts.map((item) => (
//                             <Grid item xs={12} md={6} lg={4} key={item._id}>

//                                 <ProductItem
//                                     id={item._id}
//                                     title={item.title}
//                                     image={item.image}
//                                     rating={item.rating}
//                                     price={item.price}
//                                     actionType="add"
//                                 />

//                             </Grid>
//                         ))
//                     ) : (
//                         <Typography variant="h6">No products found</Typography>
//                     )}
//                 </Grid>
//             </Box>
//         </div>
//     );
// };

// export default Home;
