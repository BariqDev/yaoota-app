import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default App;
