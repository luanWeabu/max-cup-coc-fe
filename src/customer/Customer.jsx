import { Outlet } from "react-router-dom";

function clientCustomer() {
  return (
    <div>
      <h1>Welcome to Website of Customer</h1>
      <Outlet />
    </div>
  );
}

export default clientCustomer;
