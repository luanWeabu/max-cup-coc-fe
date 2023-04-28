import {
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Paper,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CoffeeIcon from "@mui/icons-material/Coffee";
import Dashboard from "../Dashboard";
import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
} from "react-router-dom";
import propTypes from "prop-types";
import React from "react";

const drawerWidth = 170;
const icons = [<DashboardIcon />, <PeopleIcon />, <CoffeeIcon />];

function Router(props) {
  const { children } = props;
  if (typeof window === "undefined") {
    return <StaticRouter location="dashboard">{children}</StaticRouter>;
  }
  return (
    <MemoryRouter initialEntries={["dashboard"]} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.prototype = {
  children: propTypes.node,
};

const Link = React.forwardRef(function Link(itemProp, ref) {
  return <RouterLink ref={ref} {...itemProp} role={undefined} />;
});

function ListItemLink(props) {
  const { icon, primary, to } = props;

  return (
    <li>
      <ListItem button component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: propTypes.element,
  primary: propTypes.string.isRequired,
  to: propTypes.string.isRequired,
};

function Content() {
  const localtion = useLocation();
  return (
    <Typography variant="body2" sx={{ pb: 2 }} color="text.secondary">
      Current route: {localtion.pathname}
    </Typography>
  );
}

const Sidebar = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Photos
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <Paper>
          <List>
            <ListItemLink
              to="dashboard"
              primary="Dashboard"
              icon={<DashboardIcon />}
            />
            <ListItemLink
              to="product"
              primary="Product"
              icon={<CoffeeIcon />}
            />
            <ListItemLink to="users" primary="Users" icon={<PeopleIcon />} />
          </List>
        </Paper>
      </Drawer>
    </Box>
  );
};
export default Sidebar;
