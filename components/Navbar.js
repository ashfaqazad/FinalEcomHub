"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Badge,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    TextField,
    Box
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
    WbSunny as SunIcon,
    DarkMode as MoonIcon,
    Menu as MenuIcon,
} from "@mui/icons-material";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
// import { useRouter } from "next/navigation"; // 👈 import
// import { Menu as MenuIcon } from "@mui/icons-material";
import { useAppContext } from "@/context/AppContext";
// import CartDrawer from "@/components/CartDrawer";
// import CartPage from "@/components/CartPage";

import axios from "axios";

const Navbar = () => {

    
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { state, dispatch, mode, toggleTheme } = useAppContext();
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width:768px)");

    useEffect(() => {
        const token = Cookies.get("token") || localStorage.getItem("authToken");
        const user = localStorage.getItem("user");

        if (token && user) {
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: JSON.parse(user),
            });
        }
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post("/api/logout");
            Cookies.remove("token");
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");

            dispatch({ type: "LOGOUT" });
            router.push("/login");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };


    const handleSearchChange = (event) => {
        onSearch(event.target.value);
    };


    const totalCartItems = state.basket.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const drawerLinks = (
        <List>
            <ListItem button component={Link} href="/menu">
                <ListItemText primary="Menu" />
            </ListItem>
            <ListItem button component={Link} href="/cartpage">
                <ListItemText primary="CartPage" />
            </ListItem>

            {/* <ListItem button onClick={() => setIsCartOpen(true)}>
                <ListItemText primary="CartPage" />
            </ListItem> */}

            <ListItem button component={Link} href="/myorders">
                <ListItemText primary="MyOrders" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
            </ListItem>
        </List>
    );

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    padding: "10px 20px",
                    backgroundColor: mode === "dark" ? "#1e1e1e" : "#ffffff",
                    color: mode === "dark" ? "#ffffff" : "#000000",
                }}
            >


                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    {/* 🔹 Logo */}
                    <Typography
                        variant="h6"
                        component={Link}
                        href="/"
                        sx={{ textDecoration: "none", color: "inherit", fontStyle: "italic" }}
                    >
                        eShop
                    </Typography>



                    {/* Search Bar */}
                    <Box sx={{ flexGrow: 1, mx: 2 }}>
                        <TextField
                            fullWidth
                            placeholder="Search here..."
                            variant="outlined"
                            size="small"
                            onChange={handleSearchChange}

                            // onChange={(e) => setSearch(e.target.value)} // Passing the query to parent component (Home)
                            // InputProps={{
                            // //   startAdornment: (
                            // //     // <InputAdornment position="start">
                            // //     //   <SearchIcon />
                            // //     // </InputAdornment>
                            // //   ),
                            // }}
                            sx={{ backgroundColor: 'white', borderRadius: '4px' }}
                        />
                    </Box>


                    {/* 🔹 If NOT Logged In */}
                    {!state.user ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

                            {/* 🔆 Dark/Light Toggle (always visible for guest) */}
                            <IconButton color="inherit" onClick={toggleTheme}>
                                {mode === "dark" ? <SunIcon /> : <MoonIcon />}
                            </IconButton>

                            <Button
                                component={Link}
                                href="/login"
                                variant="contained"
                                color="error"
                            >
                                Login
                            </Button>




                        </div>
                    ) : isMobile ? (
                        <>
                            {/* 🔹 Mobile Menu Button */}
                            <IconButton
                                color="inherit"
                                edge="end"
                                onClick={() => setIsDrawerOpen(true)}
                            >
                                <MenuIcon />
                            </IconButton>

                            {/* 🔹 Drawer Menu on Mobile */}
                            <Drawer
                                anchor="left"
                                open={isDrawerOpen}
                                onClose={() => setIsDrawerOpen(false)}
                            >
                                <List>
                                    <ListItem button component={Link} href="/menu">
                                        <ListItemText primary="Menu" />
                                    </ListItem>
                                    <ListItem button component={Link} href="/cartpage">
                                        <ListItemText primary="CartPage" />
                                    </ListItem>

                                    {/* <ListItem button onClick={() => setIsCartOpen(true)}>
                                        <ListItemText primary="Cart" />
                                    </ListItem> */}

                                    <ListItem button component={Link} href="/myorders">
                                        <ListItemText primary="MyOrders" />
                                    </ListItem>
                                    <ListItem button onClick={handleLogout}>
                                        <ListItemText primary="Logout" />
                                    </ListItem>

                                    {/* 🔆 Dark/Light Toggle - Last in mobile */}
                                    <ListItem button onClick={toggleTheme}>
                                        <ListItemText
                                            primary={mode === "dark" ? "Light Mode" : "Dark Mode"}
                                        />
                                    </ListItem>
                                </List>
                            </Drawer>
                        </>
                    ) : (
                        // 🔹 Logged In - Desktop View
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            {/* 🔆 Dark/Light Toggle - First in desktop */}
                            <IconButton color="inherit" onClick={toggleTheme}>
                                {mode === "dark" ? <SunIcon /> : <MoonIcon />}
                            </IconButton>





                            <Link href="/menu" passHref>
                                <Button
                                    component="a"
                                    variant="text"
                                    color="inherit"
                                    sx={{
                                        fontSize: "1rem",
                                        display: "flex",
                                        alignItems: "center",
                                        fontStyle: "italic",
                                        padding: "4px 12px",
                                    }}
                                    startIcon={
                                        <LocalMallOutlinedIcon sx={{ fontSize: "10px", marginRight: "-5px" }} />
                                    }
                                >
                                    Shop
                                </Button>
                            </Link>




                            {/* <Button component={Link} href="/menu" variant="contained">
                                Menu
                            </Button>
 */}



                            <IconButton color="inherit" onClick={() => router.push('/cartpage')}>
                                <Badge badgeContent={totalCartItems} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>

                            <IconButton color="inherit" component={Link} href="/MyOrders">
                                <AccountCircleOutlinedIcon />
                            </IconButton>

                            {/* <Button onClick={handleLogout} variant="contained" color="error">
                                Logout
                            </Button> */}

                            {/* 🔹 Logout Button */}
                            <Button
                                onClick={handleLogout}
                                variant="text" // No background, only text/icon
                                color="inherit" // Default black color
                                startIcon={<LogoutIcon />} // Icon ko button ke start mein lagane ka best practice
                            >

                            </Button>

                        </div>
                    )}
                </Toolbar>



            </AppBar >

            {/* <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} /> */}
        </>
    );
};

export default Navbar;






















// // Navbar.js (Next.js version)
// // import React, { useState } from 'react';
// 'use client';
// // import { useRouter } from 'next/router'; // Replacing react-router-dom with next/router
// import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';
// // import { useAppContext } from '../context/AppContext';
// // import AppBar from '@mui/material/AppBar';
// // import { useAppContext } from '../context/AppContext';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import Button from '@mui/material/Button';
// import Badge from '@mui/material/Badge';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { Drawer, List, ListItem, ListItemText, TextField } from '@mui/material';
// import { useState } from 'react';

// const Navbar = () => {
//     // const { state, dispatch } = useAppContext();
//     // const basketLength = state.basket ? state.basket.length : 0;
//     const router = useRouter();  // Using Next.js useRouter instead of useNavigate
//     const authToken = Cookies.get('token');
//     const [drawerOpen, setDrawerOpen] = useState(false);

//     const toggleDrawer = (open) => {
//         setDrawerOpen(open);
//     };

//     const handleDrawerNavigation = (path) => {
//         router.push(path);  // Replacing navigate() with router.push()
//         setDrawerOpen(false);
//     };

//     const handleLogout = () => {
//         Cookies.remove('token');
//         dispatch({ type: 'LOGOUT' });
//         router.push('/');  // Redirect to home page after logout
//     };

//     // const handleSearchChange = (event) => {
//     //     onSearch(event.target.value);
//     // };

//     return (
//         <Box sx={{ flexGrow: 1 }}>
//             <AppBar position="fixed" sx={{ backgroundColor: '#000' }}>
//                 <Toolbar>
//                     <Typography
//                         variant="h6"
//                         component="div"
//                         sx={{
//                             flexGrow: 1,
//                             cursor: 'pointer',
//                             fontSize: '2rem',
//                             fontWeight: 'bold',
//                             fontStyle: 'italic',
//                         }}
//                         onClick={() => router.push('/')}  // Home navigation
//                     >
//                         eSHOP
//                     </Typography>

//                     {/* Desktop Links */}
//                     <Box sx={{
//                         display: { xs: 'none', md: 'flex' },
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         width: '100%',
//                     }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             <Button
//                                 color="inherit"
//                                 onClick={() => router.push('/')} // Home navigation
//                                 sx={{ fontWeight: 'bold', fontStyle: 'italic' }}
//                             >
//                                 Home
//                             </Button>
//                             {authToken && (
//                                 <Button
//                                     color="inherit"
//                                     onClick={() => router.push('/my-orders')} // My Orders page navigation
//                                     sx={{ fontWeight: 'bold', fontStyle: 'italic' }}
//                                 >
//                                     My Orders
//                                 </Button>
//                             )}
//                         </Box>

//                         {/* Search Bar */}
//                         {/* <Box sx={{ flexGrow: 1, mx: 2 }}>
//                             <TextField
//                                 fullWidth
//                                 placeholder="Search here..."
//                                 variant="outlined"
//                                 size="small"
//                                 onChange={handleSearchChange}
//                                 sx={{ backgroundColor: 'white', borderRadius: '4px' }}
//                             />
//                         </Box> */}

//                         {/* Right Section */}
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             {authToken ? (
//                                 <>
//                                     <Button color="inherit" onClick={handleLogout}>Logout</Button>
//                                     <IconButton color="inherit" onClick={() => router.push('/cart')}>
//                                         <Badge badgeContent={basketLength} color="secondary">
//                                             <ShoppingCartIcon />
//                                         </Badge>
//                                     </IconButton>
//                                 </>
//                             ) : (
//                                 <>
//                                     <Button color="inherit" onClick={() => router.push('/login')}>Login</Button>
//                                     <Button color="inherit" onClick={() => router.push('/signup')}>Signup</Button>
//                                 </>
//                             )}
//                         </Box>
//                     </Box>

//                     {/* Mobile Menu Icon */}
//                     <IconButton
//                         edge="start"
//                         color="inherit"
//                         aria-label="menu"
//                         sx={{ display: { xs: 'flex', md: 'none' } }}
//                         onClick={() => toggleDrawer(true)}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                 </Toolbar>
//             </AppBar>

//             {/* Mobile Drawer Menu */}
//             <Drawer
//                 anchor="left"
//                 open={drawerOpen}
//                 onClose={() => toggleDrawer(false)}
//             >
//                 <List>
//                     <ListItem button onClick={() => handleDrawerNavigation('/')}>
//                         <ListItemText primary="Home" />
//                     </ListItem>
//                     {authToken && (
//                         <ListItem button onClick={() => handleDrawerNavigation('/my-orders')}>
//                             <ListItemText primary="My Orders" />
//                         </ListItem>
//                     )}
//                     {authToken ? (
//                         <>
//                             <ListItem button onClick={handleLogout}>
//                                 <ListItemText primary="Logout" />
//                             </ListItem>
//                             <ListItem button onClick={() => handleDrawerNavigation('/cart')}>
//                                 <ListItemText primary={`Cart (${basketLength})`} />
//                             </ListItem>
//                         </>
//                     ) : (
//                         <>
//                             <ListItem button onClick={() => handleDrawerNavigation('/login')}>
//                                 <ListItemText primary="Login" />
//                             </ListItem>
//                             <ListItem button onClick={() => handleDrawerNavigation('/signup')}>
//                                 <ListItemText primary="Signup" />
//                             </ListItem>
//                         </>
//                     )}
//                 </List>
//             </Drawer>
//         </Box>
//     );
// };

// export default Navbar;
