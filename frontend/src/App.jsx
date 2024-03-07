import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { Post } from "./pages/Post";
import PrivateRoutes from "./utils/PrivatesRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Use the element prop directly on the Route component */}
        <Route path="/dashboard/*" element={<PrivateRoutes/>}>
          <Route index element={<Dashboard />} />
          <Route path="post" element={<Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
