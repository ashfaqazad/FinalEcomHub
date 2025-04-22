// Navbar.js (Next.js version)
// import React, { useState } from 'react';
'use client';
// import { useRouter } from 'next/router'; // Replacing react-router-dom with next/router
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
// import { useAppContext } from '../context/AppContext';
// import AppBar from '@mui/material/AppBar';
// import { useAppContext } from '../context/AppContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Drawer, List, ListItem, ListItemText, TextField } from '@mui/material';
import { useState } from 'react';

const Navbar = ({ onSearch }) => {
    // const { state, dispatch } = useAppContext();
    // const basketLength = state.basket ? state.basket.length : 0; 
    const router = useRouter();  // Using Next.js useRouter instead of useNavigate
    const authToken = Cookies.get('token');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };

    const handleDrawerNavigation = (path) => {
        router.push(path);  // Replacing navigate() with router.push()
        setDrawerOpen(false);
    };

    const handleLogout = () => {
        Cookies.remove('token');
        dispatch({ type: 'LOGOUT' });
        router.push('/');  // Redirect to home page after logout
    };

    const handleSearchChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#000' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            cursor: 'pointer',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                        }}
                        onClick={() => router.push('/')}  // Home navigation
                    >
                        eSHOP
                    </Typography>

                    {/* Desktop Links */}
                    <Box sx={{
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                color="inherit"
                                onClick={() => router.push('/')} // Home navigation
                                sx={{ fontWeight: 'bold', fontStyle: 'italic' }}
                            >
                                Home
                            </Button>
                            {authToken && (
                                <Button
                                    color="inherit"
                                    onClick={() => router.push('/my-orders')} // My Orders page navigation
                                    sx={{ fontWeight: 'bold', fontStyle: 'italic' }}
                                >
                                    My Orders
                                </Button>
                            )}
                        </Box>

                        {/* Search Bar */}
                        <Box sx={{ flexGrow: 1, mx: 2 }}>
                            <TextField
                                fullWidth
                                placeholder="Search here..."
                                variant="outlined"
                                size="small"
                                onChange={handleSearchChange}
                                sx={{ backgroundColor: 'white', borderRadius: '4px' }}
                            />
                        </Box>

                        {/* Right Section */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {authToken ? (
                                <>
                                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                                    <IconButton color="inherit" onClick={() => router.push('/cart')}>
                                        <Badge badgeContent={basketLength} color="secondary">
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <Button color="inherit" onClick={() => router.push('/login')}>Login</Button>
                                    <Button color="inherit" onClick={() => router.push('/signup')}>Signup</Button>
                                </>
                            )}
                        </Box>
                    </Box>

                    {/* Mobile Menu Icon */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ display: { xs: 'flex', md: 'none' } }}
                        onClick={() => toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer Menu */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
            >
                <List>
                    <ListItem button onClick={() => handleDrawerNavigation('/')}>
                        <ListItemText primary="Home" />
                    </ListItem>
                    {authToken && (
                        <ListItem button onClick={() => handleDrawerNavigation('/my-orders')}>
                            <ListItemText primary="My Orders" />
                        </ListItem>
                    )}
                    {authToken ? (
                        <>
                            <ListItem button onClick={handleLogout}>
                                <ListItemText primary="Logout" />
                            </ListItem>
                            <ListItem button onClick={() => handleDrawerNavigation('/cart')}>
                                <ListItemText primary={`Cart (${basketLength})`} />
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem button onClick={() => handleDrawerNavigation('/login')}>
                                <ListItemText primary="Login" />
                            </ListItem>
                            <ListItem button onClick={() => handleDrawerNavigation('/signup')}>
                                <ListItemText primary="Signup" />
                            </ListItem>
                        </>
                    )}
                </List>
            </Drawer>
        </Box>
    );
};

export default Navbar;
