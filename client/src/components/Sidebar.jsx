import React from 'react'
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material"
import {
    ChevronLeft,
    ChevronRightOutlined,
} from "@mui/icons-material"
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import PhoneIphoneTwoToneIcon from '@mui/icons-material/PhoneIphoneTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';
import PointOfSaleTwoToneIcon from '@mui/icons-material/PointOfSaleTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import PieChartTwoToneIcon from '@mui/icons-material/PieChartTwoTone';

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween'


const navItems = [
    {
        text:"Dashboard",
        icon:<GridViewTwoToneIcon/>
    },
    {
        text:"Sản Phẩm",
        icon:null
    },
    {
        text:"Products",
        icon:<PhoneIphoneTwoToneIcon/>
    },
    {
        text:"Khách Hàng",
        icon:null
    },
    {
        text:"Customers",
        icon:<PeopleAltTwoToneIcon/>
    },
    {
        text:"Giao Dịch",
        icon:null
    },
    {
        text:"Transactions",
        icon:<ReceiptLongTwoToneIcon/>
    },
    {
        text: "Doanh Thu",
        icon: null,
    },
    {
        text:"Overview",
        icon:<PointOfSaleTwoToneIcon/>
    },
    {
        text:"Daily",
        icon:<TodayTwoToneIcon/>
    },
    {
        text:"Monthly",
        icon:<CalendarMonthTwoToneIcon/>
    },{
        text:"Breakdown",
        icon:<PieChartTwoToneIcon/>
    },
]
const Sidebar = ({ 
    user,    
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(()=>{
        setActive(pathname.substring(1))
    }, [pathname])
    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                        color: theme.palette.secondary[200],
                        backgroundColor: theme.palette.background.alt,
                        boxSixing: "border-box",
                        borderWidth: isNonMobile ? 0 : "2px",
                        width: drawerWidth,
                        },
                    }}
                    >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                        <FlexBetween color={theme.palette.secondary.main}>
                            <Box display="flex" alignItems="center" gap="0.5rem">
                            <Typography variant="h1" fontWeight="bold">
                                ADMIN
                            </Typography>
                            </Box>
                            {!isNonMobile && (
                            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                <ChevronLeft />
                            </IconButton>
                            )}
                        </FlexBetween>
                        </Box>
                        <List>
                        {navItems.map(({ text, icon }) => {
                            if (!icon) {
                            return (
                                <Typography key={text} sx={{ m: "1rem 0 1rem 1rem" }}>
                                {text}
                                </Typography>
                            );
                            }
                            const lcText = text.toLowerCase();

                            return (
                            <ListItem key={text} disablePadding>
                                <ListItemButton
                                onClick={() => {
                                    navigate(`/${lcText}`);
                                    setActive(lcText);
                                }}
                                sx={{
                                    backgroundColor:
                                    active === lcText
                                        ? theme.palette.secondary[300]
                                        : "transparent",
                                    color:
                                    active === lcText
                                        ? theme.palette.primary[600]
                                        : theme.palette.secondary[100],
                                }}
                                >
                                <ListItemIcon
                                    sx={{
                                    ml: "2rem",
                                    color:
                                        active === lcText
                                        ? theme.palette.primary[600]
                                        : theme.palette.secondary[200],
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                                {active === lcText && (
                                    <ChevronRightOutlined sx={{ ml: "auto" }} />
                                )}
                                </ListItemButton>
                            </ListItem>
                            );
                        })}
                        </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    )
}

export default Sidebar