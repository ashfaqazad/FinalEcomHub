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
}) => {
  return (

//     <Card
//   sx={{
//     width: 360,
//     height: 400,
//     display: "flex",
//     flexDirection: "column",
//     borderRadius: 2,
//     boxShadow: 3,
//     border: "1px solid #1976d2",
//     overflow: "hidden",
//     backgroundColor: "#fff",

//   }}
// >
//   <CardMedia
//     component="img"
//     image={image}
//     alt={title}
//     sx={{
//       width: "100%",
//       height: 180,
//       objectFit: "cover",
//     }}
//   />

//   <CardContent
//     sx={{
//       flexGrow: 1,
//       px: 2,
//       py: 2,
//       display: "flex",
//       flexDirection: "column",
//       gap: 1, // ✅ consistent spacing
//       color: "black"
//     }}
//   >
//     <Typography variant="h6" fontWeight="bold">
//       {title}
//     </Typography>

//     <Typography
//       variant="body2"
//       color="text.secondary"
//       sx={{
//         fontSize: "0.875rem",
//         lineHeight: 1.4,
//       }}
//     >
//       {description?.length > 80
//         ? description.slice(0, 80) + "..."
//         : description}
//     </Typography>

//     <Typography variant="body1" fontWeight="bold">
//       Rs. {price}
//     </Typography>

//     <Button
//       variant="contained"
//       color="warning"
//       fullWidth
//       onClick={() =>
//         onAddToBasket &&
//         onAddToBasket({ id, title, image, description, price })
//       }
//       sx={{ mt: "auto" }} // ✅ push to bottom safely
//     >
//       Add Product
//     </Button>
//   </CardContent>
// </Card>



<Card
sx={{
  width: "100%",         // full width in container
  maxWidth: 345,         // max width of each card
  height: 300,           // fixed height
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
      variant="body2"
      sx={{ my: 1, fontStyle: "italic", color: "text.secondary" }}
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
//   imgStyle,
//   actionType,
//   onAddToBasket,
// }) => {
//   console.log("DESCRIPTION: ", description);

//   return (
    // <Card
    //   sx={{
    //     width: "100%",         // full width in container
    //     maxWidth: 345,         // max width of each card
    //     height: 300,           // fixed height
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "space-between",
    //     border: "1px solid #1976d2",
    //     borderRadius: 2,
    //     boxShadow: 3,
    //     m: 1,
    //   }}
    // >
    //   <CardMedia
    //     component="img"
    //     alt={title}
    //     image={image}
    //     sx={{
    //       width: "100%",
    //       height: 200,           // ✅ consistent image height
    //       objectFit: "cover",
    //       ...imgStyle,
    //     }}
    //   />
    //   <CardContent
    //     sx={{
    //       flexGrow: 1,
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "space-between",
    //     }}
    //   >
    //     <Typography variant="h6" component="h4" sx={{ fontWeight: "bold" }}>
    //       {title}
    //     </Typography>

    //     <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
    //       Rs. {price}
    //     </Typography>

    //     {description && (
    //       <Typography
    //         variant="body2"
    //         sx={{ my: 1, fontStyle: "italic", color: "text.secondary" }}
    //       >
    //         {description}
    //       </Typography>
    //     )}

    //     <Button
    //       variant="contained"
    //       color="warning"
    //       fullWidth
    //       onClick={() =>
    //         onAddToBasket &&
    //         onAddToBasket({ id, title, image, description, price, imgStyle })
    //       }
    //       sx={{ mt: "auto" }}
    //     >
    //       Add Product
    //     </Button>
    //   </CardContent>
    // </Card>
//   );
// };

// export default ProductItem;











// "use client";

// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
//   Box,
// } from "@mui/material";

// const ProductItem = ({
//   id,
//   title,
//   image,
//   description,
//   price,
//   imgStyle,
//   actionType,
//   onAddToBasket,
//   onRemoveFromBasket,
// }) => {
//   return (
//     <Card
//       sx={{
//         width: 345,
//         height: 600,
//         boxShadow: 3,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: 2,
//       }}
//     >
//       <CardMedia
//         component="img"
//         alt={title}
//         image={image}
//         sx={{
//           width: "100%",
//           height: { xs: "500px", sm: "350px" },
//           objectFit: "cover",
//           ...imgStyle,
//         }}
//       />
//       <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
//         <Typography variant="h6" component="h4" sx={{ fontWeight: "bold" }}>
//           {title}
//         </Typography>
//         <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//           Rs. {price}
//         </Typography>
//         <Typography variant="body2" sx={{ my: 1, fontStyle: "italic" }}>
//           {description}
//         </Typography>

//         {actionType === "add" ? (
//           <Button
//             variant="contained"
//             color="warning"
//             fullWidth
//             onClick={() =>
//               onAddToBasket &&
//               onAddToBasket({ id, title, image, description, price, imgStyle })
//             }
//             sx={{ mt: 1 }}
//           >
//             Add Product
//           </Button>
//         ) : (
//           <Button
//             variant="contained"
//             color="error"
//             fullWidth
//             onClick={() => onRemoveFromBasket && onRemoveFromBasket({ id })}
//             sx={{ mt: 1 }}
//           >
//             Remove Product
//           </Button>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductItem;













// "use client";

// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
//   Box,
// } from "@mui/material";

// const ProductItem = ({
//   id,
//   title,
//   image,
//   description,
//   price,
//   imgStyle,
//   actionType,
//   onAddToBasket,
//   onRemoveFromBasket,
// }) => {
//   return (
//     <Card
//       sx={{
//         width: 345,
//         height: 600,
//         boxShadow: 3,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: 2,
//       }}
//     >
//       <CardMedia
//         component="img"
//         alt={title}
//         image={image}
//         sx={{
//           width: "100%",
//           height: { xs: "500px", sm: "350px" },
//           objectFit: "cover",
//           ...imgStyle,
//         }}
//       />
//       <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
//         <Typography variant="h6" component="h4" sx={{ fontWeight: "bold" }}>
//           {title}
//         </Typography>
//         <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//           Rs. {price}
//         </Typography>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             my: 1,
//             flexWrap: "wrap",
//           }}
//         >
//           {Array(rating)
//             .fill()
//             .map((_, i) => (
//               <span key={i}>⭐</span>
//             ))}
//         </Box>

//         {actionType === "add" ? (
//           <Button
//             variant="contained"
//             color="warning"
//             fullWidth
//             onClick={() =>
//               onAddToBasket &&
//               onAddToBasket({ id, title, image, description, price, imgStyle })
//             }
//             sx={{ mt: 1 }}
//           >
//             Add Product
//           </Button>
//         ) : (
//           <Button
//             variant="contained"
//             color="error"
//             fullWidth
//             onClick={() => onRemoveFromBasket && onRemoveFromBasket({ id })}
//             sx={{ mt: 1 }}
//           >
//             Remove Product
//           </Button>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductItem;
