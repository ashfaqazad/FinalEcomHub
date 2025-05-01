"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  useMediaQuery,
  Box,
} from "@mui/material";

const LoginPage = () => {
  const [activeButton, setActiveButton] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { dispatch } = useAppContext();
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width:768px)");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = activeButton === "register" ? "/api/register" : "/api/login";

    try {
      const res = await axios.post(url, formData, {
        withCredentials: true,
      });

      alert(res.data.message);

      const userData = {
        id: res.data.id,
        username: res.data.username,
        email: res.data.email,
      };

      if (activeButton === "register") {
        setFormData({ username: "", email: "", password: "" });
        setActiveButton("login");
        return;
      }

      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch({ type: "LOGIN_SUCCESS", payload: userData });
        setFormData({ username: "", email: "", password: "" });
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        // display: "flex",
        // flexDirection: isMobile ? "column" : "row",
        // alignItems: "center",
        // justifyContent: "center",
        // minHeight: "100vh",
        py: 4,
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          width: "100%",
          px: 2,
        }}
      >
        <Card sx={{ width: "100%", maxWidth: 480, p: 2 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Welcome to FastFood
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Sign in or create an account to order
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 2,
                backgroundColor: "#E0E0E0",
                p: 1,
                borderRadius: "4px",
              }}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={() => setActiveButton("login")}
                sx={{
                  backgroundColor:
                    activeButton === "login" ? "white" : "transparent",
                  color: "black",
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                Login
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => setActiveButton("register")}
                sx={{
                  backgroundColor:
                    activeButton === "register" ? "white" : "transparent",
                  color: "black",
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                Register
              </Button>
            </Box>

            {error && (
              <Typography color="error" mt={2}>
                {error}
              </Typography>
            )}

            <Box component="form" onSubmit={handleSubmit} mt={2}>
              {activeButton === "register" && (
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={formData.username}
                  required
                />
              )}
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                value={formData.email}
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                value={formData.password}
                required
              />

              <Button
                fullWidth
                variant="contained"
                color="error"
                type="submit"
                sx={{ mt: 3 }}
              >
                {activeButton === "login" ? "Login" : "Register"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Optional Image Side for Desktop View */}
      {!isMobile && (
        <Box
          flex={1}
          sx={{
            height: "100%",
            backgroundImage: "url('/login-banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
    </Container>
  );
};

export default LoginPage;















// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useAppContext } from "@/context/AppContext";
// import {
//   Container,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   TextField,
//   useMediaQuery,
// } from "@mui/material";

// const LoginPage = () => {
//   const [activeButton, setActiveButton] = useState("login");
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const { dispatch } = useAppContext();
//   const router = useRouter();

//   const isMobile = useMediaQuery("(max-width:768px)");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const url = activeButton === "register" ? "/api/register" : "/api/login";

//     try {
//       const res = await axios.post(url, formData, {
//         withCredentials: true,
//       });

//       alert(res.data.message);

//       const userData = {
//         id: res.data.id,
//         username: res.data.username,
//         email: res.data.email,
//       };

//       if (activeButton === "register") {
//         setFormData({
//           username: "",
//           email: "",
//           password: "",
//         });
//         setActiveButton("login");
//         return;
//       }

//       if (res.data.token) {
//         localStorage.setItem("authToken", res.data.token);
//         localStorage.setItem("user", JSON.stringify(userData));
//         dispatch({ type: "LOGIN_SUCCESS", payload: userData });

//         setFormData({
//           username: "",
//           email: "",
//           password: "",
//         });

//         router.push("/");
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <Container
//       sx={{
//         display: "flex",
//         flexDirection: isMobile ? "column" : "row",
//         width: "100vw",
//         height: "100vh",
//         padding: 0,
//         margin: 0,
//       }}
//     >
//       <div
//         style={{
//           flex: 1,
//           width: "1000px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "20px",
//           margin: "0 auto", // Add this line

//         }}
//       >
//         <Card sx={{ width: "100%", maxWidth: 500, padding: 2 }}>
//           <CardContent>
//             <Typography variant="h5" fontWeight="bold">
//               Welcome to FastFood
//             </Typography>
//             <Typography variant="body2" color="textSecondary">
//               Sign in or create an account to order
//             </Typography>

//             <div
//               style={{
//                 display: "flex",
//                 gap: "10px",
//                 marginTop: "20px",
//                 backgroundColor: "#E0E0E0",
//                 padding: "5px",
//               }}
//             >
//               <Button
//                 fullWidth
//                 variant="contained"
//                 onClick={() => setActiveButton("login")}
//                 style={{
//                   backgroundColor:
//                     activeButton === "login" ? "white" : "transparent",
//                   color: "black",
//                 }}
//               >
//                 Login
//               </Button>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 onClick={() => setActiveButton("register")}
//                 style={{
//                   backgroundColor:
//                     activeButton === "register" ? "white" : "transparent",
//                   color: "black",
//                 }}
//               >
//                 Register
//               </Button>
//             </div>

//             {error && (
//               <Typography color="error" style={{ marginTop: "10px" }}>
//                 {error}
//               </Typography>
//             )}

//             <form onSubmit={handleSubmit}>
//               {activeButton === "register" && (
//                 <>
//                   <TextField
//                     fullWidth
//                     label="Username"
//                     name="username"
//                     margin="normal"
//                     variant="outlined"
//                     onChange={handleChange}
//                     value={formData.username}
//                     required
//                   />
//                   <TextField
//                     fullWidth
//                     label="Email"
//                     name="email"
//                     type="email"
//                     margin="normal"
//                     variant="outlined"
//                     onChange={handleChange}
//                     value={formData.email}
//                     required
//                   />
//                   <TextField
//                     fullWidth
//                     label="Password"
//                     name="password"
//                     type="password"
//                     margin="normal"
//                     variant="outlined"
//                     onChange={handleChange}
//                     value={formData.password}
//                     required
//                   />
//                 </>
//               )}

//               {activeButton === "login" && (
//                 <>
//                   <TextField
//                     fullWidth
//                     label="Email"
//                     name="email"
//                     type="email"
//                     margin="normal"
//                     variant="outlined"
//                     onChange={handleChange}
//                     value={formData.email}
//                     required
//                   />
//                   <TextField
//                     fullWidth
//                     label="Password"
//                     name="password"
//                     type="password"
//                     margin="normal"
//                     variant="outlined"
//                     onChange={handleChange}
//                     value={formData.password}
//                     required
//                   />
//                 </>
//               )}

//               <Button
//                 fullWidth
//                 variant="contained"
//                 color="error"
//                 style={{ marginTop: "20px" }}
//                 type="submit"
//               >
//                 {activeButton === "login" ? "Login" : "Register"}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Image Only on Desktop View */}
//       {!isMobile && (
//         <>
        
//         </>
//       )}
//     </Container>
//   );
// };

// export default LoginPage;




