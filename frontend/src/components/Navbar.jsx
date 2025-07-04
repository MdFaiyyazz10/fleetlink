import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Badge,
} from "@mui/material"
import {
  LocalShipping,
  Add,
  Search,
  BookOnline,
  Dashboard,
  History,
  Settings,
  AccountCircle,
  Menu as MenuIcon,
  Notifications,
  ExitToApp,
  Help,
} from "@mui/icons-material"

const Navbar = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const navigationItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Add Vehicle", icon: <Add />, path: "/add-vehicle" },
    { text: "Search & Book", icon: <Search />, path: "/search" },
    { text: "My Bookings", icon: <BookOnline />, path: "/bookings" },
    { text: "History", icon: <History />, path: "/history" },
  ]

  const userMenuItems = [
    { text: "Profile", icon: <AccountCircle /> },
    { text: "Settings", icon: <Settings /> },
    { text: "Help", icon: <Help /> },
    { text: "Logout", icon: <ExitToApp /> },
  ]

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <LocalShipping sx={{ fontSize: 32, color: "primary.main" }} />
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>
          FleetLink
        </Typography>
      </Box>
      <Divider />
      <List>
        {navigationItems.map((item) => (
          <ListItem button key={item.text}>
            <ListItemIcon sx={{ color: "primary.main" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {userMenuItems.map((item) => (
          <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

         
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocalShipping sx={{ fontSize: 32 }} />
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                letterSpacing: "0.5px",
                display: { xs: "none", sm: "block" },
              }}
            >
              FleetLink
            </Typography>
            <Typography
              variant="caption"
              sx={{
                backgroundColor: "rgba(255,255,255,0.2)",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                fontSize: "0.7rem",
                display: { xs: "none", md: "block" },
              }}
            >
              LOGISTICS
            </Typography>
          </Box>

          
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  startIcon={item.icon}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

         
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
           
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>

           
            <Tooltip title="Account">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    border: "2px solid rgba(255,255,255,0.3)",
                  }}
                >
                  <AccountCircle />
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box sx={{ px: 2, py: 1, borderBottom: "1px solid #eee" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  John Doe
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  john.doe@fleetlink.com
                </Typography>
              </Box>
              {userMenuItems.map((item) => (
                <MenuItem key={item.text} onClick={handleCloseUserMenu}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {item.icon}
                    <Typography textAlign="center">{item.text}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

     
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}

export default Navbar
