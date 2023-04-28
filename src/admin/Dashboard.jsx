import { Outlet } from "react-router-dom";
import { Box, Toolbar, Typography } from "@mui/material";

function Dashboard() {
  return (
    <Box>
      <Toolbar />
      <h2>Hello</h2>
      <Typography paragraph>Welcome to dashboard</Typography>
    </Box>
  );
}

export default Dashboard;
