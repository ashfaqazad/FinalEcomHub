"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const ProductItem = ({
  id,
  title,
  image,
  description,
  price,
  actionType,
  onAddToBasket,
  imgStyle
}) => {
  return (


<Card
sx={{
  width: 400,         // full width in container
  maxWidth: 345,         // max width of each card
  height: 400,           // fixed height
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  border: "1px solid #1976d2",
  borderRadius: 2,
  boxShadow: 3,
  m: 1,
}}
>
<CardMedia
  component="img"
  alt={title}
  image={image}
  sx={{
    width: "100%",
    height: 200,           // ✅ consistent image height
    objectFit: "cover",
    ...imgStyle,
  }}
/>
<CardContent
  sx={{
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }}
>
  <Typography variant="h6" component="h4" sx={{ fontWeight: "bold" }}>
    {title}
  </Typography>

  <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
    Rs. {price}
  </Typography>

  {description && (
    <Typography
      variant="body1"
      sx={{ my: 1, fontStyle: "italic"}}
    >
      {description}
    </Typography>
  )}

  <Button
    variant="contained"
    color="warning"
    fullWidth
    onClick={() =>
      onAddToBasket &&
      onAddToBasket({ id, title, image, description, price, imgStyle })
    }
    sx={{ mt: "auto" }}
  >
    Add Product
  </Button>
</CardContent>
</Card>



  );
};

export default ProductItem;


