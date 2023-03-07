import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store";
import Home from "./pages/Home";
import PostDetails from "./component/PostDetails/PostDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home>Hello world!</Home>,
  },
  {
    path: "post/:id",
    element: <PostDetails></PostDetails>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        {" "}
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
