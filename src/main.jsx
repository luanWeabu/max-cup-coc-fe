import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./error-page";
import ClientCustomer from "./customer/Customer";
import Dashboard from "./admin/Dashboard";
import Login from "./admin/Login";
import Admin from "./admin/admin";
import AuthScreen from "./admin/AuthScreen";
import Product from "./admin/product/Product";
import Users from "./admin/Users";

const router = createBrowserRouter([
  {
    path: "/", // đường dẫn đầu tiên khi vào website
    element: <ClientCustomer />, // Tên Component
    errorElement: <ErrorPage />, // Component Error xảy ra khi gặp vấn đề của trang web
  },
  {
    path: "admin",
    element: <Admin />,
    // children tạo ra một cây đường dẫn cho web của bạn như ở đây có 2 children là login và auth
    // đường dẫn của nó sẽ là admin/login or admin/login
    children: [
      {
        path: "login",
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        path: "auth",
        element: <AuthScreen />,
        errorElement: <ErrorPage />,
        // tương tự như trên đường dẫn sẽ là auth/dashboard auth/user auth/product
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "product",
            element: <Product />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
