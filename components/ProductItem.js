"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  useMediaQuery,
  Box,
} from "@mui/material";

const ProductItem = ({
  id,
  title,
  image,
  description,
  price,
  actionType,
  onAddToBasket,
  imgStyle,
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (

    <Card
  sx={{
    width: "100%",
    maxWidth: isMobile ? "100%" : 345,
    // width: "350",
    height: "100%", // ✅ makes card stretch to full height of Grid item
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    border: "1px solid #1976d2",
    borderRadius: 2,
    boxShadow: 3,
    // m: 0.5,
  }}
>
  <CardMedia
    component="img"
    alt={title}
    image={image}
    sx={{
      width: 350,
      height: 200,
      objectFit: "cover",
      ...imgStyle,
    }}
  />
  <CardContent
    sx={{
      flex: 1, // ✅ fills vertical space
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Typography variant="h6" fontWeight="bold">
      {title}
    </Typography>

    <Typography variant="body1" fontWeight="bold" mt={1}>
      Rs. {price}
    </Typography>

    {description && (
      <Typography
        variant="body2"
        sx={{ my: 1, fontStyle: "italic", color: "text.secondary" }}
      >
        {description}
      </Typography>
    )}

    <Box sx={{ mt: "auto" }}>
      <Button
        variant="contained"
        color="warning"
        fullWidth
        onClick={() =>
          onAddToBasket &&
          onAddToBasket({ id, name: title, image, description, price, imgStyle })
        }
      >
        Add Product
      </Button>
    </Box>
  </CardContent>
</Card>




  );
};

export default ProductItem;























// "use client";

// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
// } from "@mui/material";

// const ProductItem = ({
//   id,
//   title,
//   image,
//   description,
//   price,
//   actionType,
//   onAddToBasket,
//   imgStyle
// }) => {
//   return (


// <Card
// sx={{
//   width: 400,         // full width in container
//   maxWidth: 345,         // max width of each card
//   height: 400,           // fixed height
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-between",
//   border: "1px solid #1976d2",
//   borderRadius: 2,
//   boxShadow: 3,
//   m: 1,
// }}
// >
// <CardMedia
//   component="img"
//   alt={title}
//   image={image}
//   sx={{
//     width: "100%",
//     height: 200,           // ✅ consistent image height
//     objectFit: "cover",
//     ...imgStyle,
//   }}
// />
// <CardContent
//   sx={{
//     flexGrow: 1,
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//   }}
// >
//   <Typography variant="h6" component="h4" sx={{ fontWeight: "bold" }}>
//     {title}
//   </Typography>

//   <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
//     Rs. {price}
//   </Typography>

//   {description && (
//     <Typography
//       variant="body1"
//       sx={{ my: 1, fontStyle: "italic"}}
//     >
//       {description}
//     </Typography>
//   )}

//   <Button
//     variant="contained"
//     color="warning"
//     fullWidth
//     onClick={() =>
//       onAddToBasket &&
//       onAddToBasket({ id, title, image, description, price, imgStyle })
//     }
//     sx={{ mt: "auto" }}
//   >
//     Add Product
//   </Button>
// </CardContent>
// </Card>



//   );
// };

// export default ProductItem;


