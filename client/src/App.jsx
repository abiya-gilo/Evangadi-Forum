import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";=
import Register from "./pages/Register";
import PostQuestion from "./pages/PostQuestion";
import Home from "./pages/Home";
import QuestionDetail from "./pages/QuestionDetail";
import HowItWorks from "./pages/HowItWorks";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/post-question" element={<PostQuestion />} />
          <Route path="/questions/:id" element={<QuestionDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
