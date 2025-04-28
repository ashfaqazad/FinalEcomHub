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
  const [searchQuery, setSearchQuery] = useState("");

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
          height: "90vh",
          overflow: "hidden",
        }}
      >
        <img
          src="/Images/Eimage.avif"
          alt="eCommerce"
          style={{
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
        <Grid container spacing={4} justifyContent="center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <ProductItem
                  id={item._id}
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

// import { useEffect, useState } from "react";
// import Cards from "@/components/Cards";
// import ImageSlider from "@/components/ImageSlider";

// export default function Home() {
//   const [foodItems, setFoodItems] = useState([]);
//   const [foodCategory, setFoodCategory] = useState([]);

//   const fetchData = async () => {
//     try {
//       const res = await fetch("/api/foodData");
//       const data = await res.json();

//       setFoodItems(data.foodItems || []);
//       setFoodCategory(data.foodCategory || []);
//     } catch (err) {
//       console.error("❌ Error fetching data:", err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//     <div className="p-4">
//       {foodCategory.map((category) => (
//         <div key={category._id}>
//           <h2 className="text-xl font-bold my-4">{category.CategoryName}</h2>
//           <Cards
//             foodItems={foodItems}
//             categoryName={category.CategoryName}
//           />
//         </div>
//       ))}
//     </div>
//     </div>
//   );
// }


